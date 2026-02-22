# ISC2 NJ Chapter — Cybersecurity Mentoring Toolkit

A local-first web application for structured cybersecurity mentoring programs.
Built for the ISC2 New Jersey Chapter's Cyber Pathways Mentoring Program.

<img width="703" height="255" alt="Screenshot" src="https://github.com/user-attachments/assets/0142d5a5-519d-4c85-9685-97eb1ef7e62a" />

**Live app:** https://thecyberleader.github.io/isc2nj-mentoring-toolkit/

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

## Quick Start

```bash
git clone https://github.com/TheCyberLeader/isc2nj-mentoring-toolkit.git
cd isc2nj-mentoring-toolkit
npm install
npm run dev
```

Open http://localhost:5173/isc2nj-mentoring-toolkit/ in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Build and deploy to GitHub Pages |
| `npm run lint` | Run ESLint |
| `npm run check-links` | Check all external URLs in data files for dead links |

## Deploy to GitHub Pages

```bash
npm run deploy
```

This builds the app and publishes the `dist/` folder via the `gh-pages` branch.
Your app will be live at `https://<username>.github.io/<repo-name>/`.

For other hosting (Netlify, Vercel, etc.), run `npm run build` and deploy the
`dist/` folder.

## Project Structure

```
src/
├── components/          Shared UI components
│   ├── DeleteConfirm    Generic delete confirmation modal
│   ├── ImportPreview    JSON import preview modal
│   ├── MilestoneSection Self-contained milestone CRUD
│   ├── Navbar           Top navigation with mobile menu
│   ├── PrivacyBanner    Dismissable local-storage privacy notice
│   ├── RequireProfile   Route guard — redirects to setup if no profile
│   └── SessionModal     Add/edit session modal form
├── data/                Static content (no user data)
│   ├── config.js        Chapter branding, program settings
│   ├── emailTemplates.js Email templates with token placeholders
│   ├── mentorGuide.js   Mentor + mentee guide content
│   └── roles.js         5 career tracks with certs, platforms, communities
├── pages/               Route-level page components
│   ├── Home             Dashboard, role selection, clear data
│   ├── Setup            Profile form
│   ├── Goals            Goal-setting worksheet with auto-save
│   ├── Sessions         Session log, export/import, milestones
│   ├── Resources        Tabbed resource library by career track
│   ├── EmailTemplates   Editable email templates with copy/fill
│   └── Guide            Mentor and mentee program guides
├── utils/               Utility modules
│   ├── localStorage.js  Namespaced localStorage wrapper
│   ├── exportPDF.js     PDF generation via jsPDF
│   └── exportJSON.js    JSON export, import, and validation
├── App.jsx              Router and layout
├── main.jsx             Entry point
└── index.css            Tailwind config and theme colors
scripts/
└── check-links.mjs      URL health checker for data file links
```

## Tech Stack

React 19 · Vite 7 · Tailwind CSS 4 · jsPDF · localStorage

## Security & Privacy

This app has **no backend, no API, no authentication, and no external data
transmission**. It is a fully static site — once loaded, it runs entirely in
your browser.

- **All data stays on your device.** Profile information, goals, session logs,
  and milestones are stored in your browser's `localStorage`. Nothing is ever
  sent to a server.
- **No accounts or logins.** There is nothing to hack, no passwords to leak,
  and no user database.
- **No analytics or tracking.** No cookies, no telemetry, no third-party
  scripts.
- **Clearing your browser data deletes everything.** Since localStorage is the
  only storage mechanism, clearing site data or switching browsers means
  starting fresh. Use the JSON export feature to back up your data regularly.
- **Shared devices.** If multiple people use the same browser on the same
  device, they will see each other's data. Use the "Start Fresh" option on
  the home page or export and clear between users.

The only network requests the app makes are to load its own static assets
(HTML, CSS, JS, images) from GitHub Pages. After the initial page load,
everything runs offline.

**A note on JSON import:** The import feature validates file structure and
shape but does not sanitize content. The app is safe in practice because React
escapes all rendered output by default, preventing script injection. That said,
only import JSON files from sources you trust.

## For Other ISC2 Chapters

See [WHITELABEL.md](./WHITELABEL.md) for a step-by-step guide to forking and
customizing this toolkit for your own chapter.

## License

MIT — free to use and adapt for any ISC2 chapter or mentoring program.
