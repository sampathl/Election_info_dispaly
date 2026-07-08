export function DisclaimerPage() {
  return (
    <section className="page-section page-stack">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Disclaimer</p>
          <h1>Important Public Data Disclaimer</h1>
        </div>
      </div>
      <p className="section-description">
        Public-interest data sites should be direct about limitations. This starter includes a
        dedicated route so readers can see freshness, sourcing, and correction policies clearly.
      </p>
      <div className="callout-grid">
        <article>
          <h2>No official endorsement</h2>
          <p>Make it clear that your presentation layer is separate from the original government or source systems.</p>
        </article>
        <article>
          <h2>Potential lag</h2>
          <p>Generated datasets can drift behind the primary source between scrape and publish runs.</p>
        </article>
        <article>
          <h2>Correction process</h2>
          <p>Document how users can report broken records, stale files, or incorrectly linked assets.</p>
        </article>
      </div>
    </section>
  );
}
