export function AboutPage() {
  return (
    <section className="page-section page-stack">
      <div className="section-heading">
        <div>
          <p className="eyebrow">About</p>
          <h1>About This Starter</h1>
        </div>
      </div>
      <p className="section-description">
        This repository is designed for frontend-heavy public data sites that can stay static in
        version 1. The browser loads JSON and image assets directly from public storage rather than
        relying on a dedicated application server.
      </p>
      <div className="callout-grid">
        <article>
          <h2>What it includes</h2>
          <p>Routing, data fetching, reusable UI, mock data, tests, linting, formatting, and deploy docs.</p>
        </article>
        <article>
          <h2>What it avoids</h2>
          <p>Authentication, write flows, databases, and server-rendering complexity before it is needed.</p>
        </article>
        <article>
          <h2>How it grows</h2>
          <p>Workers, search infrastructure, analytics, and richer publishing automation can be layered in later.</p>
        </article>
      </div>
    </section>
  );
}
