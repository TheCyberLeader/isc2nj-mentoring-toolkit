# ISC2 NJ Chapter Cybersecurity Mentoring Toolkit

A local-first web application for structured cybersecurity mentoring programs. Built for the ISC2 New Jersey Chapter's Cyber Pathways Mentoring Program.

![Screenshot](public/assets/screenshot.png)

## 🚀 Use the App

**No installation needed. Just click and go:**

👉 **[Open the Mentoring Toolkit](https://thecyberleader.github.io/isc2nj-mentoring-toolkit/)**

The app runs entirely in your browser. Nothing is installed, nothing is uploaded, and no account is required.

---

## Who Is This For?

This toolkit is designed for **mentor and mentee pairs** in the ISC2 NJ Chapter's Cyber Pathways Mentoring Program. It helps you:

- Set up your mentor or mentee profile
- Define SMART goals for the program
- Log and track your sessions
- Track milestones like certifications, interviews, and wins
- Access career resources by cybersecurity track
- Generate and send email templates
- Export your data as PDF or JSON for your records

---

## Features

- Role selection (mentor / mentee) with profile setup
- Goal-setting worksheet with SMART goal framework
- Session log and progress tracker (4-session program)
- Milestone tracker for certifications, interviews, and wins
- Role-specific resource library (5 cybersecurity career tracks)
- Email templates with auto-fill from profile data
- Mentor and mentee guides with conversation starters
- PDF and JSON export/import for sharing and backup
- All data stored locally in the browser — no server, no accounts, no tracking

---

## Security & Privacy

This app has **no backend, no API, no authentication, and no external data transmission**. It is a fully static site — once loaded, it runs entirely in your browser.

- **All data stays on your device.** Profile information, goals, session logs, and milestones are stored in your browser's `localStorage`. Nothing is ever sent to a server.
- **No accounts or logins.** There is nothing to hack, no passwords to leak, and no user database.
- **No analytics or tracking.** No cookies, no telemetry, no third-party scripts.
- **Clearing your browser data deletes everything.** Use the JSON export feature to back up your data regularly.
- **Shared devices.** If multiple people use the same browser on the same device, they will see each other's data. Use the "Start Fresh" option on the home page or export and clear between users.

The only network requests the app makes are to load its own static assets from GitHub Pages. After the initial page load, everything runs offline.

**A note on JSON import:** The import feature validates file structure and shape but does not sanitize content. The app is safe in practice because React escapes all rendered output by default. That said, only import JSON files from sources you trust.

---

## For Other ISC2 Chapters

See [WHITELABEL.md](WHITELABEL.md) for a step-by-step guide to forking and customizing this toolkit for your own chapter.

---

## Local Development

> This section is for developers who want to run or modify the code locally.
```bash
git clone https://github.com/TheCyberLeader/isc2nj-mentoring-toolkit.git
cd isc2nj-mentoring-toolkit
npm install
npm run dev
```

Open http://localhost:5173/isc2nj-mentoring-toolkit/ in your browser.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Build and deploy to GitHub Pages |
| `npm run lint` | Run ESLint |
| `npm run check-links` | Check all external URLs in data files for dead links |

### Project Structure
```
src/
├── components/          Shared UI components
├── data/                Static content (no user data)
├── pages/               Route-level page components
├── utils/               Utility modules
├── App.jsx              Router and layout
├── main.jsx             Entry point
└── index.css            Tailwind config and theme colors
scripts/
└── check-links.mjs      URL health checker for data file links
```

### Tech Stack

React 19 · Vite 7 · Tailwind CSS 4 · jsPDF · localStorage

### Deploy to GitHub Pages
```bash
npm run deploy
```

This builds the app and publishes the `dist/` folder via the `gh-pages` branch.

---

## License

MIT — free to use and adapt for any ISC2 chapter or mentoring program.
