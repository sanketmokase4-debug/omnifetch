# OmniFetch — All-in-One Social Media Downloader

React + Vite frontend with an Express API server.

## Run locally

Prerequisites: Node.js 20+

```bash
npm install
npm run dev
```

The development frontend runs on `http://localhost:3000` and uses the Vite API middleware in `vite.config.ts`.

## Production deployment

This project is **not a GitHub Pages-only app** because `server.ts` provides the API routes. Use GitHub as the source repository and deploy the Node/Express app to a host that supports a long-running Node.js process.

Build command:

```bash
npm run build
```

Start command:

```bash
npm start
```

The production server reads the hosting provider's `PORT` environment variable and serves the Vite `dist/` directory plus `/api/*` routes.

### Environment variables

Copy `.env.example` to `.env` for local use. In a hosted deployment, set variables in the hosting provider's environment/secrets UI instead of committing `.env`.

- `NODE_ENV=production` — enables production static-file serving.
- `PORT` — normally supplied automatically by the hosting provider.
- `APP_URL` — optional deployed site URL; when set, it is used for the API CORS origin.
- `GEMINI_API_KEY` — optional and only needed if Gemini backend features are added.

## Important: downloader behavior

The current API contains **demo download responses** for testing the UI. `/api/proxy-download` currently redirects to sample public media rather than extracting or downloading media from arbitrary social-media URLs.

Do not treat the demo endpoint as a production media extractor. For a production downloader, integrate an appropriate provider/API that you are authorized to use and comply with each platform's terms, copyright rules, privacy requirements, and applicable law.

## GitHub

Push the repository to GitHub, then connect that repository to your Node-compatible hosting provider. GitHub itself can store the code, but GitHub Pages cannot run `server.ts`.
