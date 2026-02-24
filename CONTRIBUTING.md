# Maintenance Guide - ISC2 NJ Mentoring Toolkit

This is a personal project maintained solely by Marie Wang. This guide documents the workflow and conventions I follow when making updates — for my own reference and consistency.

---

## Development Workflow

### 1. Issue Tracking

All changes should have a corresponding GitHub Issue created **before** work begins — bug fixes, features, refactors, and documentation updates all count.

Reference the issue number in every commit message:
```
fix: dead links in data files (#12)
feat: add session export to CSV (#15)
docs: update whitelabel guide (#18)
refactor: typescript-migration (#21)
```

---

### 2. Committing to Main

Small, low-risk changes can be committed directly to `main` with a clear commit message:

- Content updates and copy fixes
- Documentation updates
- Minor CSS or style tweaks
- Bug fixes that touch one or two files

---

### 3. Feature Branches and Pull Requests

Large or risky changes **must** use a feature branch and go through a Pull Request before merging to `main`:

- New features or pages
- Major refactors touching multiple files
- TypeScript migration
- Changes to data structures or export/import logic

---

### 4. Branch Naming Conventions

| Prefix | Use for |
|---|---|
| `feature/` | New functionality |
| `fix/` | Bug fixes |
| `docs/` | Documentation changes |
| `refactor/` | Code restructuring without behavior changes |

**Examples:** `feature/csv-export`, `fix/navbar-mobile`, `docs/readme-update`, `refactor/typescript-migration`

---

### 5. TypeScript Migration

Before starting a TypeScript migration, always create a branch called `refactor/typescript-migration`. This is a large, cross-cutting change that must go through a Pull Request.

---

### 6. JSON Import Security

The JSON import feature validates file structure and shape but does not sanitize content. Any future changes to import handling should include a content sanitization review.

---

### 7. Pre-Release Checks

Before any release, run the link checker to catch dead external URLs:
```bash
npm run check-links
```

---

### 8. AI-Assisted Development

When using Claude Code (or any AI tool) on this project, the tool must always:

- Show new files **before** creating them
- Show replacements **before** applying them
- Show the plan **before** executing it
- Convert or refactor **one file at a time**, showing each before applying
- **Never apply multiple changes in bulk** without review
- Create GitHub Issues for all changes
- Use branches for large changes
- Run `npm run check-links` before any release

**No change should be applied to the codebase without the developer reviewing and explicitly approving it first.** This applies to all operations — creates, edits, deletes, and refactors.

---

*Built for the ISC2 New Jersey Chapter — Cyber Pathways Mentoring Program*
