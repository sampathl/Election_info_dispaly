# Deploy Notes

Cloudflare Pages can auto-deploy directly from GitHub. In this starter, GitHub Actions is primarily used for validation:

- linting
- type-checking
- tests
- production build verification

That separation keeps deployment simple:

- GitHub Actions answers "is this branch healthy?"
- Cloudflare Pages answers "publish the frontend when the branch is merged"

Once you install dependencies locally, consider committing the generated `package-lock.json` and switching CI from `npm install` to `npm ci` for more reproducible installs.
