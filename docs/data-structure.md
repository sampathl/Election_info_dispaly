# Data Structure

This starter assumes a public static layout like the following:

```text
/data/site-metadata.json
/data/navigation.json
/data/categories.json
/data/listing/{categoryId}/page-{pageNumber}.json
/data/entities/{entityId}.json
/data/search/index-lite.json

/images/entities/{entityId}/thumb.webp
/images/entities/{entityId}/main.webp
/images/entities/{entityId}/gallery-1.webp
```

## File Roles

- `site-metadata.json`: global site copy, counts, and freshness information
- `navigation.json`: top-level navigation labels if you want content-managed nav
- `categories.json`: category catalog used by home, filters, and category pages
- `listing/{categoryId}/page-{pageNumber}.json`: paginated category listings
- `entities/{entityId}.json`: full detail payload for one entity
- `search/index-lite.json`: lightweight client-side search index

## Design Notes

- Keep listing pages small enough for quick browser fetches.
- Do not store the entire universe of entity detail inside list responses.
- Use stable entity IDs in every file so joins stay simple.
- Prefer generated, normalized structures over ad hoc payload shapes.

## Local Mock Data

The repo ships with mock data under `public/mock-data/data` and mock images under `public/mock-data/images`. The local env defaults mirror the production shape so switching to R2 is mostly an env change.
