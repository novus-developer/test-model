# Nora — Login demo

A responsive Albanian login interface built with Next.js, React, TypeScript, and Tailwind CSS.

## Run locally

Use Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:3000. In Windows PowerShell, use `npm.cmd` if the execution policy blocks `npm.ps1`.

## Demo account

- Email: `demo@nora.app`
- Password: `Nora2026!`

Select **Përdor llogarinë demo** to fill the form, then **Hyr në llogari**. The app checks email format, required fields, and the demo credentials. It includes a password visibility toggle, an account welcome screen, and logout.

This is a frontend demonstration, not production authentication. Credentials are intentionally public, no password is stored or sent to a server, and the demo session is held only in React state. Refreshing the page ends the session. Connect a server-side authentication provider before handling real accounts or private data.

## Files

- `src/components/login-app.tsx`: login form, demo interaction, and workspace illustration
- `src/app/page.tsx`: main page
- `src/app/globals.css`: Tailwind import
- `src/app/login-design.css`: responsive design, loaded as a separate native stylesheet
- `src/app/layout.tsx`: metadata and Albanian document language

## Checks and production build

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

The app uses system fonts and local SVG/CSS artwork, with no runtime font or image downloads.
