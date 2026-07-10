import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="page-section page-stack">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Not found</p>
          <h1>This route does not exist</h1>
        </div>
      </div>
      <p className="section-description">
        Cloudflare Pages will still serve the SPA shell because of the redirect rule, but the app
        needs a matching route to render useful content.
      </p>
      <Link className="button" to="/">
        Return home
      </Link>
    </section>
  );
}
