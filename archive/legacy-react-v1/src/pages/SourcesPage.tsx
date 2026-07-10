export function SourcesPage() {
  return (
    <section className="page-section page-stack">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Sources</p>
          <h1>Source Handling Guidance</h1>
        </div>
      </div>
      <p className="section-description">
        Use this route to explain where public records originate, how often they are refreshed, and
        what transformations happen before they are shown to readers.
      </p>
      <div className="detail-card">
        <ul className="link-list">
          <li>Document the upstream agencies, websites, or filings you scrape.</li>
          <li>Explain the refresh cadence for generated JSON snapshots.</li>
          <li>Link back to canonical primary records when possible.</li>
          <li>Clarify what is normalized, summarized, or deduplicated in your pipeline.</li>
        </ul>
      </div>
    </section>
  );
}
