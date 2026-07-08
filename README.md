# Election Info Display Starter

Static-first React starter for a low-cost public data site. The app is designed for Cloudflare Pages, with public JSON and optimized images served directly from Cloudflare R2 or a custom domain mapped to R2.

Version 1 intentionally does not include a backend, database, authentication, or SSR. The browser fetches static JSON at runtime so large datasets stay out of the frontend bundle.

## Stack

- React 19
- TypeScript
- Vite
- React Router
- Cloudflare Pages
- Cloudflare R2
- Vitest + React Testing Library
- ESLint + Prettier
- GitHub Actions

## Architecture Overview

```text
Browser
  -> React SPA on Cloudflare Pages
  -> fetch() JSON from public /data origin
  -> request images from public /images origin

Cloudflare Pages
  -> hosts compiled frontend assets
  -> handles SPA fallback via public/_redirects

Cloudflare R2
  -> serves generated JSON files
  -> serves optimized entity images
  -> can sit behind a public bucket URL or custom domain
```

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment defaults:

   ```bash
   cp .env.example .env.local
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

The default env values target the mock data under `public/mock-data`, so the app runs without any external services.

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `VITE_DATA_BASE_URL` | Base URL for static JSON files, such as `https://data.example.com/data` |
| `VITE_IMAGE_BASE_URL` | Base URL for public images, such as `https://images.example.com` |
| `VITE_SITE_NAME` | Site name shown in the UI |

## Folder Structure

```text
.
|-- .github/workflows
|-- docs
|-- public
|   `-- mock-data
|       |-- data
|       `-- images
|-- scripts
`-- src
    |-- app
    |-- components
    |-- data
    |-- hooks
    |-- lib
    |-- pages
    |-- styles
    |-- test
    `-- types
```

## Available Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` type-checks referenced configs and builds the production bundle
- `npm run preview` previews the built app locally
- `npm run test` runs the Vitest suite once
- `npm run test:watch` runs tests in watch mode
- `npm run lint` runs ESLint
- `npm run format` formats the repo with Prettier
- `npm run typecheck` runs the app TypeScript check

## Deployment

1. Push the repo to GitHub.
2. Create a Cloudflare Pages project connected to the repo.
3. Set the build command to `npm run build`.
4. Set the output directory to `dist`.
5. Configure `VITE_DATA_BASE_URL`, `VITE_IMAGE_BASE_URL`, and `VITE_SITE_NAME` for preview and production.
6. Point `VITE_DATA_BASE_URL` and `VITE_IMAGE_BASE_URL` to public R2-backed URLs or custom domains.

More detail:

- [Architecture](./docs/architecture.md)
- [Cloudflare Pages](./docs/cloudflare-pages.md)
- [Cloudflare R2](./docs/cloudflare-r2.md)
- [Testing](./docs/testing.md)
- [Future Extensions](./docs/future-extensions.md)
- [Deploy Notes](./docs/deploy-notes.md)

## Testing

The starter includes sample tests for:

- `EntityCard` rendering
- `ImageWithFallback` fallback behavior
- data client URL construction
- route rendering smoke coverage

Run them with:

```bash
npm run test
```

## What To Customize First

1. Replace the sample JSON in `public/mock-data/data`.
2. Point the env vars at your real R2-backed public URLs.
3. Update site copy, categories, and navigation labels.
4. Swap the sample SVG image placeholders for your generated assets.

## Future Extension Points

- Cloudflare Workers for API-style joins or edge caching rules
- richer search service
- analytics and observability
- admin tooling
- scheduled scraping and publishing pipeline
- sitemap and SEO automation

See [docs/future-extensions.md](./docs/future-extensions.md) for the expanded roadmap.
