# ISC2 NJ Chapter — Cybersecurity Mentoring Toolkit

A local-first web application for cybersecurity mentoring programs.
Built for the ISC2 New Jersey Chapter.

## Features
- Mentee goal-setting worksheet with SMART goal framework
- Session log and progress tracker (4-session program)
- Role-specific resource library (5 career tracks)
- Email templates for mentor outreach
- Mentor and mentee session guides with conversation starters
- All data stored locally — nothing sent to any server
- Export to PDF and JSON for easy sharing

## Privacy
All data is stored in your browser's localStorage only.
No accounts, no backend, no tracking.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack
React · Vite · Tailwind CSS · localStorage · jsPDF

## For Other ISC2 Chapters
This project is designed to be reused. To adapt it for your chapter:
1. Replace logo files in `public/assets/`
2. Update chapter name and links in `src/data/config.js`
3. Deploy to GitHub Pages (see Deployment below)

## Deployment

```bash
npm run build
```

Deploy the `dist/` folder to GitHub Pages, Netlify, or Vercel.

### GitHub Pages

```bash
npm run deploy
```

The live app will be at:
`https://YOUR_USERNAME.github.io/isc2nj-mentoring-toolkit/`

## License
MIT — free to use and adapt for any ISC2 chapter or mentoring program.
