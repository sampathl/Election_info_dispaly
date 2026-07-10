# Design System Guide For The React App

## What The React App Uses Today

The React app does **not** currently consume `public/design-system.html` directly.

The active styling chain is:

- `src/main.tsx` imports `src/styles/index.css`
- `src/styles/index.css` imports `src/styles/tokens.css`

So the app-side source of truth today is:

- `src/styles/tokens.css` for tokens
- `src/styles/index.css` for pattern and component classes

The standalone reference file is still useful:

- `public/design-system.html`

Use it as the visual and conceptual reference until the app tokens are migrated fully.

---

## How To Think About The System

Use the system in this order:

1. Pick an existing layout or component pattern first
2. Use existing utility or component class names where possible
3. Reach for tokens only when defining or extending a class
4. Avoid inline styles unless the value is truly dynamic

The main rule is simple:

- React components should express **structure**
- CSS classes should express **presentation**
- Token files should express **design decisions**

---

## Files To Touch

### When you want to change colors, spacing, radius, typography, or shadows

Edit:

- `src/styles/tokens.css`

Examples already in use there:

- `--text-default`
- `--text-heading`
- `--surface-default`
- `--surface-muted`
- `--color-brand-400`
- `--radius-lg`
- `--space-18`

### When you want to change component or page styling

Edit:

- `src/styles/index.css`

Examples already in use there:

- `.hero-panel`
- `.page-section`
- `.entity-card`
- `.state-card`
- `.button`
- `.chip`

### When you want to change markup structure

Edit the React component itself in `src/components/**` or `src/pages/**`.

Examples:

- `src/components/layout/Header.tsx`
- `src/components/ui/EntityCard.tsx`
- `src/components/ui/ErrorState.tsx`

---

## How To Use Tokens In CSS

Define visual values with CSS variables from `tokens.css`, not hardcoded values.

Good:

```css
.results-summary {
  padding: var(--space-18);
  border: var(--border-default);
  border-radius: var(--radius-lg);
  background: var(--surface-default);
  color: var(--text-default);
  box-shadow: var(--shadow-panel);
}
```

Avoid:

```css
.results-summary {
  padding: 24px;
  border: 1px solid #d8d8d8;
  border-radius: 18px;
  background: white;
  color: #222;
}
```

### Token categories already present

- Typography: `--font-family-*`, `--font-size-*`, `--line-height-*`
- Color: `--text-*`, `--surface-*`, `--color-brand-*`, `--error`
- Spacing: `--space-*`
- Radius: `--radius-*`
- Borders and shadows: `--border-*`, `--shadow-*`
- Layout: `--layout-*`, `--size-*`

---

## How To Use The System In React Components

### 1. Compose existing classes first

Example from the current app:

```tsx
export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="state-card state-card--error" role="alert">
      <h2>Unable to load this view</h2>
      <p>{message}</p>
      {onRetry ? (
        <button className="button button--secondary" onClick={onRetry} type="button">
          Try again
        </button>
      ) : null}
    </div>
  );
}
```

Why this is correct:

- markup is semantic
- styling is delegated to class names
- button variant is reused instead of restyled locally

### 2. Prefer semantic wrappers over generic div piles

Good:

```tsx
<section className="page-section">
  <div className="section-heading">
    <div>
      <p className="eyebrow">Search</p>
      <h2>Explore entities</h2>
    </div>
  </div>
</section>
```

This matches the patterns already used in `HomePage.tsx`, `SearchPage.tsx`, and other pages.

### 3. Keep component APIs about content, not visual trivia

Good:

```tsx
interface StatCardProps {
  label: string;
  value: string;
  detail?: string;
}
```

Avoid props like:

```tsx
interface BadProps {
  padding?: string;
  bgColor?: string;
  textColor?: string;
}
```

If the component needs a variant, use a controlled variant prop:

```tsx
interface BannerProps {
  tone?: 'default' | 'success' | 'warning' | 'error';
}
```

Then map that prop to class names.

---

## Current Pattern Library In The App

These are the main reusable patterns already established in `index.css`.

### Page shells

- `.app-shell`
- `.content-shell`
- `.page-stack`
- `.page-section`
- `.hero-panel`
- `.detail-layout`

Use these for page-level composition before inventing new wrappers.

### Content cards

- `.entity-card`
- `.category-card`
- `.detail-card`
- `.state-card`

Use these as the base mental model for cards in new features.

### Section framing

- `.section-heading`
- `.section-heading--compact`
- `.section-description`
- `.eyebrow`

Use these to keep hierarchy consistent across routes.

### Inputs and controls

- `.search-box`
- `.search-box__input`
- `.filter-panel`
- `.filter-panel__select`
- `.button`
- `.button--secondary`
- `.pagination__page`

### Metadata and tagging

- `.chip`
- `.tag-list`
- `.inline-meta`
- `.entity-card__meta`

---

## Example: Add A New Feature Card

### React

```tsx
interface SourceStatusCardProps {
  title: string;
  status: string;
  summary: string;
}

export function SourceStatusCard({ title, status, summary }: SourceStatusCardProps) {
  return (
    <article className="detail-card source-status-card">
      <div className="entity-card__meta">
        <span className="chip">{status}</span>
      </div>
      <h2>{title}</h2>
      <p className="section-description">{summary}</p>
      <button className="button" type="button">
        Open source
      </button>
    </article>
  );
}
```

### CSS

```css
.source-status-card {
  display: grid;
  gap: var(--space-12);
}
```

Why this is the right shape:

- reuses `detail-card`
- reuses `chip`
- reuses `button`
- only adds the minimum new class needed

---

## Example: Add A New State Variant

### React

```tsx
interface SyncStateProps {
  title: string;
  message: string;
}

export function SyncState({ title, message }: SyncStateProps) {
  return (
    <div className="state-card state-card--sync">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
```

### CSS

```css
.state-card--sync {
  border: var(--border-default);
  background: var(--surface-section-muted);
}
```

If a tone needs a new color treatment, define the color relationship in `tokens.css` first, then consume it here.

---

## When To Add A New Token

Add a token when:

- the value is a design decision you expect to reuse
- the value appears in more than one component
- the value represents a system role like brand, surface, text, spacing, radius, or motion

Do not add a token when:

- the value is one-off and local to a single component
- the value is structural rather than visual
- the value is just a renamed duplicate of an existing token

Good token additions:

- `--surface-critical-soft`
- `--text-emphasis`
- `--space-22`

Bad token additions:

- `--card-padding-special`
- `--search-page-left-gap`
- `--blue-button-color`

---

## How To Use The Standalone Design System Reference

Use `public/design-system.html` for:

- validating palette direction
- comparing theme behavior
- checking hierarchy decisions
- previewing patterns before migrating them into React

Do not treat it as the app’s live source of truth yet.

If you want to bring something from the standalone file into the app, do it in this order:

1. Move the token into `src/styles/tokens.css`
2. Add or adjust the class pattern in `src/styles/index.css`
3. Update the React component markup to use the class
4. Verify the pattern on the page, not only in isolation

---

## Recommended Workflow For New UI

When building a new feature:

1. Start from the closest existing component or page pattern
2. Reuse existing layout classes if possible
3. Add one new component-specific class only when needed
4. Use tokens for all visual values
5. Keep semantic HTML intact
6. Only after reuse fails, introduce a new pattern

This keeps the app from turning into a pile of one-off page styling.

---

## Short Rules

- Use `tokens.css` for design decisions
- Use `index.css` for reusable presentation rules
- Use React components for structure and semantics
- Prefer class composition over inline styles
- Prefer variant classes over custom per-instance styling
- Reuse page and card shells before inventing new ones
- Migrate from `public/design-system.html` into app CSS deliberately, not by copy-pasting random blocks

