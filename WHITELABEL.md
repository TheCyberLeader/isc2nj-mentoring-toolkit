# White-Label Guide

This toolkit is designed to be forked and customized by any ISC2 chapter (or
any mentoring program). This guide walks through everything you need to change.

## 1. Fork and Rename

1. Fork this repository on GitHub
2. Rename it to match your chapter (e.g., `isc2boston-mentoring-toolkit`)
3. Clone your fork locally

## 2. Update `vite.config.js`

Change the `base` path to match your new repository name:

```js
export default defineConfig({
  base: '/your-new-repo-name/',
  plugins: [react(), tailwindcss()],
})
```

This ensures all asset paths work correctly on GitHub Pages.

## 3. Update `src/data/config.js`

This is the primary customization file. Every field explained:

```js
export const config = {
  // Your chapter's display name — appears in the navbar, footer, PDFs
  chapterName: "ISC2 New Jersey Chapter",

  // Your chapter's website — linked in the footer
  chapterUrl: "https://newjersey.isc2chapters.isc2.org",

  // Your chapter's LinkedIn — not currently displayed, available for future use
  chapterLinkedIn: "https://www.linkedin.com/company/isc2chapternj",

  // Your mentoring program's name — used in email templates and the home page
  programName: "Cyber Pathways Mentoring Program",

  // Paths to your logo files in public/assets/
  // Horizontal: used in the navbar and PDF headers (~40x12mm at export)
  // Vertical: used on the home page hero
  logoHorizontal: `${base}assets/isc2nj-logo-horizontal.png`,
  logoVertical: `${base}assets/isc2nj-logo-vertical.png`,

  // Brand colors — referenced in config but the actual theme colors
  // used by Tailwind are defined in src/index.css (see step 5)
  accentColor: "#6DBE45",
  secondaryColor: "#4A6FA5",

  // Program structure — controls session limits and milestone caps
  maxSessions: 4,
  maxMilestones: 4,
};
```

## 4. Replace Logo Files

Replace these files in `public/assets/`:

| File | Usage | Recommended size |
|------|-------|-----------------|
| `isc2nj-logo-horizontal.png` | Navbar, PDF headers | 400x120px, transparent PNG |
| `isc2nj-logo-vertical.png` | Home page hero | 300x300px, transparent PNG |

You can rename the files — just update the paths in `config.js` to match.

## 5. Update Theme Colors (Optional)

The Tailwind theme colors are defined in `src/index.css`:

```css
@theme {
  --color-navy: #1B3A6B;
  --color-teal: #0D7377;
  --color-light-blue: #D6EAF8;
  --color-light-gray: #F2F3F4;
  --color-accent: #17A589;
  --color-dark: #222222;
  --color-isc2-green: #6DBE45;
  --color-isc2-blue: #4A6FA5;
}
```

Change these to match your chapter's brand. The most impactful are:
- `--color-navy` — primary dark color (navbar active state, headings)
- `--color-accent` — primary action color (buttons, progress bars)
- `--color-teal` — secondary accent (labels, section highlights)

The PDF export colors are hardcoded in `src/utils/exportPDF.js` as RGB arrays
at the top of the file. Update these to match if you change the theme.

## 6. Customize Career Tracks (Optional)

The resource library is driven by `src/data/roles.js`. Each role has:

```js
"role-slug": {
  label: "Display Name",
  overview: "Description paragraph",
  certifications: [{ name, url, note? }],
  platforms: [{ name, url, note? }],
  communities: [{ name, url, note? }],
}
```

You can add, remove, or reorder roles. The slug is used as the key — it must
be unique and URL-safe.

## 7. Customize Email Templates (Optional)

Edit `src/data/emailTemplates.js`. Each template uses token placeholders like
`[MENTOR_NAME]`, `[MENTEE_NAME]`, `[TARGET_ROLE]`, and `[PROGRAM_NAME]`.

These are auto-filled from the user's profile. You can add custom tokens —
just update the `buildTokenMap` function in `src/pages/EmailTemplates.jsx`.

## 8. Customize Guide Content (Optional)

Edit `src/data/mentorGuide.js` to update:
- Session structure and timing
- Mentor responsibilities
- Conversation starters
- Career changer tips
- Mentee preparation guides

## 9. Adjust Program Length (Optional)

If your program is longer or shorter than 4 sessions:

1. Change `maxSessions` in `config.js`
2. Update the `menteeFourSessions` array in `mentorGuide.js` to match
3. Update conversation starter labels in `mentorGuide.js` if needed
4. Review email template text for hardcoded "4 weeks" references

## 10. Deploy

```bash
npm install
npm run deploy
```

Your app will be live at `https://<username>.github.io/<repo-name>/`.

## Checking for Dead Links

Run the link checker periodically to catch stale URLs:

```bash
npm run check-links
```

This scans all files in `src/data/` and reports live, redirected, and dead URLs.
