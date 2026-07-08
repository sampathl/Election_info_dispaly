# Future Extensions

## Cloudflare Workers API

Add a Worker when you need lightweight server-side joins, signed URLs, or edge caching rules without adopting a full backend.

## Search Backend

Move from `index-lite.json` to a dedicated search service if the in-browser index grows too large or query relevance needs ranking, faceting, or typo tolerance.

## Analytics

Add privacy-conscious analytics to understand what categories, searches, and entities are actually being used.

## Admin Dashboard

Create an internal tool for previewing staged datasets, validating entity records, and approving publish jobs.

## Scheduled Scraping Pipeline

Run scraping, normalization, validation, and R2 publishing on a schedule with clear failure reporting.

## Image Optimization Pipeline

Automate `webp` or `avif` generation, variant sizing, and metadata extraction before upload.

## Sitemap Generation

Publish sitemaps from the same build artifacts so public detail pages are easier for search engines to discover.

## SEO Improvements

Add prerendering, structured data, route metadata, and richer social previews when public discoverability becomes a priority.

## Accessibility Improvements

Add audit-driven improvements, keyboard flow tests, color contrast checks, and content review for public trust.

## Performance Monitoring

Track Web Vitals, cache hit rates, dataset sizes, and route-level fetch timings.

## Move From Static JSON To Database

If the data model or query requirements outgrow static assets, introduce a backend gradually:

- start with a read-only API in front of the existing exports
- move heavy search and joins first
- keep the current frontend contract stable while the storage layer changes
