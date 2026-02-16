# ISC2 NJ Chapter — Cybersecurity Mentoring Toolkit

A local-first web application for cybersecurity mentoring programs.
Built for the ISC2 New Jersey Chapter.

<img width="703" height="255" alt="Screenshot 2026-02-16 at 5 06 43 PM" src="https://github.com/user-attachments/assets/0142d5a5-519d-4c85-9685-97eb1ef7e62a" />


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

Open the app using this link https://thecyberleader.github.io/isc2nj-mentoring-toolkit/

## Tech Stack
React · Vite · Tailwind CSS · localStorage · jsPDF

## For Other ISC2 Chapters

This project is designed to be reused. To create your own branded version:

1. **Fork this repository** to your GitHub account
2. **Rename the repository** (e.g., `isc2boston-mentoring-toolkit` or `isc2texas-mentoring-toolkit`)
3. **Replace logo files** in `public/assets/` with your chapter's logos
4. **Update chapter info** in `src/data/config.js` (chapter name, URLs, colors)
5. **Update `vite.config.js`** — change the `base` path to match your new repo name:
```javascript
   base: '/YOUR-NEW-REPO-NAME/'
```
6. **Deploy to your own GitHub Pages** (see Deployment below)

The ISC2 NJ version will remain live at:  
https://thecyberleader.github.io/isc2nj-mentoring-toolkit/

Your chapter's version will be at:  
`https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## Deployment

### GitHub Pages (Recommended - Free)

After making your customizations:
```bash
npm install
npm run deploy
```

Your live app will be at:  
`https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

### Other Hosting Options

Build the app:
```bash
npm run build
```

Then deploy the `dist/` folder to:
- **Netlify** — drag and drop the `dist/` folder
- **Vercel** — connect your GitHub repo
- **Any static host** — upload the `dist/` folder contents

## License

MIT — free to use and adapt for any ISC2 chapter or mentoring program.
