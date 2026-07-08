import { Link } from 'react-router-dom';

import { getCategories, getSiteMetadata } from '@/data/client';
import { useAsyncData } from '@/hooks/useAsyncData';
import { formatDisplayDate } from '@/lib/format';
import type { Category, SiteMetadata } from '@/types/content';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingState } from '@/components/ui/LoadingState';

interface HomePageData {
  categories: Category[];
  metadata: SiteMetadata;
}

export function HomePage() {
  const { data, error, isLoading, reload } = useAsyncData<HomePageData>(async () => {
    const [metadata, categories] = await Promise.all([getSiteMetadata(), getCategories()]);
    return { categories, metadata };
  }, []);

  if (isLoading) {
    return <LoadingState text="Loading site metadata and featured categories..." />;
  }

  if (error || !data) {
    return <ErrorState message={error ?? 'Missing home page data.'} onRetry={reload} />;
  }

  return (
    <section className="page-stack">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Static frontend starter</p>
          <h1>{data.metadata.siteName}</h1>
          <p className="hero-panel__lede">{data.metadata.tagline}</p>
          <p>{data.metadata.description}</p>
        </div>
        <dl className="metric-grid">
          <div>
            <dt>Total entities</dt>
            <dd>{data.metadata.totalEntities}</dd>
          </div>
          <div>
            <dt>Categories</dt>
            <dd>{data.categories.length}</dd>
          </div>
          <div>
            <dt>Last updated</dt>
            <dd>{formatDisplayDate(data.metadata.lastUpdated)}</dd>
          </div>
        </dl>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Browse</p>
            <h2>Category entry points</h2>
          </div>
          <Link className="button" to="/search">
            Open search
          </Link>
        </div>
        <div className="category-grid">
          {data.categories.map((category) => (
            <article className="category-card" key={category.id}>
              <div className="category-card__header">
                <h3>{category.name}</h3>
                <span>{category.entityCount} records</span>
              </div>
              <p>{category.description}</p>
              <Link to={`/category/${category.id}`}>View {category.name}</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section page-section--muted">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Architecture</p>
            <h2>Why this starter stays cheap</h2>
          </div>
        </div>
        <div className="callout-grid">
          <article>
            <h3>Static JSON over a public origin</h3>
            <p>Large generated payloads stay outside the app bundle and can be published independently.</p>
          </article>
          <article>
            <h3>No backend in version 1</h3>
            <p>Cloudflare Pages serves the app, and the browser fetches read-only data at runtime.</p>
          </article>
          <article>
            <h3>Easy to grow later</h3>
            <p>Workers, search infrastructure, or a database can be added once the static model starts to strain.</p>
          </article>
        </div>
      </section>
    </section>
  );
}
