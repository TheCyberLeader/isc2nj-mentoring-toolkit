#!/usr/bin/env node

/**
 * URL Health Check — scans src/data/*.js for external URLs and reports
 * which are live, redirected, or dead.
 *
 * Usage:  node scripts/check-links.mjs
 *         npm run check-links
 *
 * Requires Node 18+ (built-in fetch).
 */

import { readdir, readFile } from "node:fs/promises";
import { join, basename } from "node:path";

const DATA_DIR = new URL("../src/data", import.meta.url).pathname;
const URL_RE = /https?:\/\/[^\s"'`,)}\]]+/g;
const CONCURRENCY = 5;
const TIMEOUT_MS = 10_000;

// ANSI colors
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

// ── Scan ────────────────────────────────────────────────────────────

async function extractURLs() {
  const files = (await readdir(DATA_DIR)).filter((f) => f.endsWith(".js"));
  const urlsByFile = new Map();

  for (const file of files) {
    const content = await readFile(join(DATA_DIR, file), "utf-8");
    const matches = [...content.matchAll(URL_RE)].map((m) => m[0]);
    if (matches.length > 0) {
      urlsByFile.set(file, [...new Set(matches)]);
    }
  }

  return urlsByFile;
}

// ── Check ───────────────────────────────────────────────────────────

async function checkURL(url) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(url, {
      method: "HEAD",
      redirect: "manual",
      signal: controller.signal,
      headers: { "User-Agent": "isc2nj-link-checker/1.0" },
    });

    clearTimeout(timer);

    const status = res.status;

    if (status >= 200 && status < 300) {
      return { url, status: "live", code: status };
    }

    if (status >= 300 && status < 400) {
      const location = res.headers.get("location") || "unknown";
      return { url, status: "redirect", code: status, location };
    }

    // Some servers reject HEAD — retry with GET
    if (status === 405 || status === 403) {
      return await checkWithGet(url);
    }

    return { url, status: "dead", code: status };
  } catch (err) {
    // Retry with GET for servers that block HEAD entirely
    if (err.name !== "AbortError") {
      return await checkWithGet(url);
    }
    return { url, status: "dead", code: err.message };
  }
}

async function checkWithGet(url) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(url, {
      method: "GET",
      redirect: "manual",
      signal: controller.signal,
      headers: { "User-Agent": "isc2nj-link-checker/1.0" },
    });

    clearTimeout(timer);

    const status = res.status;

    if (status >= 200 && status < 300) {
      return { url, status: "live", code: status };
    }
    if (status >= 300 && status < 400) {
      const location = res.headers.get("location") || "unknown";
      return { url, status: "redirect", code: status, location };
    }
    return { url, status: "dead", code: status };
  } catch (err) {
    return { url, status: "dead", code: err.message };
  }
}

// ── Concurrency helper ──────────────────────────────────────────────

async function checkAll(urls) {
  const results = new Map();
  const unique = [...new Set(urls)];

  for (let i = 0; i < unique.length; i += CONCURRENCY) {
    const batch = unique.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map(checkURL));
    for (const result of batchResults) {
      results.set(result.url, result);
    }
    // Progress indicator
    const done = Math.min(i + CONCURRENCY, unique.length);
    process.stdout.write(`\r  Checked ${done}/${unique.length} URLs...`);
  }
  process.stdout.write("\r" + " ".repeat(40) + "\r");

  return results;
}

// ── Report ──────────────────────────────────────────────────────────

function formatResult(r) {
  switch (r.status) {
    case "live":
      return `  ${green("✓")} ${dim(`[${r.code}]`)} ${r.url}`;
    case "redirect":
      return `  ${yellow("→")} ${dim(`[${r.code}]`)} ${r.url}\n         ${yellow("→")} ${r.location}`;
    case "dead":
      return `  ${red("✗")} ${dim(`[${r.code}]`)} ${r.url}`;
  }
}

// ── Main ────────────────────────────────────────────────────────────

async function main() {
  console.log(bold("\nURL Health Check — src/data/\n"));

  const urlsByFile = await extractURLs();
  const allURLs = [...urlsByFile.values()].flat();

  if (allURLs.length === 0) {
    console.log("  No URLs found.\n");
    return;
  }

  console.log(`  Found ${allURLs.length} URLs across ${urlsByFile.size} files\n`);

  const results = await checkAll(allURLs);

  // Print grouped by file
  let totalLive = 0;
  let totalRedirect = 0;
  let totalDead = 0;

  for (const [file, urls] of urlsByFile) {
    console.log(bold(`── ${basename(file)} ──`));
    for (const url of urls) {
      const r = results.get(url);
      console.log(formatResult(r));
      if (r.status === "live") totalLive++;
      else if (r.status === "redirect") totalRedirect++;
      else totalDead++;
    }
    console.log();
  }

  // Summary
  console.log(bold("── Summary ──"));
  console.log(`  ${green(`${totalLive} live`)}  ${yellow(`${totalRedirect} redirected`)}  ${red(`${totalDead} dead`)}  (${allURLs.length} total)\n`);

  if (totalDead > 0) process.exit(1);
}

main();
