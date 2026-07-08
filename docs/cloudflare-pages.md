# Cloudflare Pages

## Build Settings

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root

## Environment Variables

Set these in both Preview and Production unless you intentionally want different origins:

- `VITE_DATA_BASE_URL`
- `VITE_IMAGE_BASE_URL`
- `VITE_SITE_NAME`

Recommended pattern:

- Preview:
  - `VITE_DATA_BASE_URL=https://preview-data.example.com/data`
  - `VITE_IMAGE_BASE_URL=https://preview-images.example.com`
- Production:
  - `VITE_DATA_BASE_URL=https://data.example.com/data`
  - `VITE_IMAGE_BASE_URL=https://images.example.com`

## SPA Routing

The `public/_redirects` file includes:

```text
/* /index.html 200
```

That ensures deep links like `/entity/alice-smith` resolve correctly on Cloudflare Pages.

## Custom Domain Notes

- Attach the frontend site to a stable public domain such as `www.example.com`.
- Keep data and image domains separate if you want independent cache policies.
- Update any CORS allowlists on the R2 side to include both preview and production frontend domains.

## Preview vs Production

- Preview deploys are useful for validating new JSON snapshots and image assets before publishing them broadly.
- If preview uses a different R2 bucket or custom domain, keep the env vars isolated so test data never leaks into production.
