# Cloudflare R2

## Suggested Bucket Structure

```text
bucket-root/
|-- data/
|   |-- site-metadata.json
|   |-- navigation.json
|   |-- categories.json
|   |-- listing/
|   |-- entities/
|   `-- search/
`-- images/
    `-- entities/
```

## Public Delivery Model

Recommended options:

1. Public R2 bucket URL for quick setup
2. Custom domains such as `data.example.com` and `images.example.com` for cleaner URLs and cache control

## CORS Notes

Allow read access from your frontend origins:

- methods: `GET`, `HEAD`
- headers: keep simple unless you add signed access later
- origins: preview and production Pages domains, plus any custom frontend domain

## Caching Notes

- JSON: use moderate cache TTLs and purge or version when publishing updates
- Images: use long-lived immutable caching if filenames change when content changes
- Consider content hashes or publish directories if you need strong cache busting

## Upload Strategy

- Generate data and optimized images outside the frontend repo
- Upload JSON to the `/data` prefix
- Upload images to the `/images` prefix
- Publish the frontend independently after verifying the new asset set

The included placeholder upload script documents a safe flow without embedding real credentials.
