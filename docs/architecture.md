# Architecture

## Goals

- Keep version 1 frontend-heavy and inexpensive to run
- Avoid putting large generated datasets inside the app bundle
- Make deployment simple enough for Cloudflare Pages + R2
- Keep the codebase approachable for someone relearning React and TypeScript

## Request Flow

```text
User visits Cloudflare Pages site
  -> frontend JS loads
  -> React Router renders current route
  -> page-level data client fetches JSON from VITE_DATA_BASE_URL
  -> image components build URLs from VITE_IMAGE_BASE_URL
  -> browser caches static JSON and images aggressively
```

## Frontend Layers

- `src/app`: router and shell wiring
- `src/pages`: route-level screens
- `src/components/layout`: global layout pieces
- `src/components/ui`: reusable display and interaction components
- `src/data`: fetch layer for static JSON
- `src/lib`: environment, formatting, and image helpers
- `src/types`: shared TypeScript models

## Why Static JSON

Static JSON keeps infrastructure simple:

- no app server to maintain
- no database required for read-only browsing
- easy edge caching through Cloudflare
- data can be regenerated offline and uploaded independently from the frontend

## Tradeoffs

- cross-file joins happen in the browser
- search is limited unless you add a dedicated search service or worker
- very large indexes may need sharding or a backend later

## Suggested Production Setup

```text
Frontend origin: https://www.example.com
Data origin:     https://data.example.com/data
Image origin:    https://images.example.com
```

Using separate origins allows more aggressive caching and independent deployment of static assets.
