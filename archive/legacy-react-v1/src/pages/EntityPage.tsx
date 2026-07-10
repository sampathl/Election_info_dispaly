import { useParams } from 'react-router-dom';

import { getEntityDetail } from '@/data/client';
import { useAsyncData } from '@/hooks/useAsyncData';
import { formatDisplayDate, titleizeSlug } from '@/lib/format';
import { buildEntityImageUrl, getEntityImageDimensions } from '@/lib/image';
import { ErrorState } from '@/components/ui/ErrorState';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { LoadingState } from '@/components/ui/LoadingState';

export function EntityPage() {
  const { entityId } = useParams();

  const { data, error, isLoading, reload } = useAsyncData(async () => {
    if (!entityId) {
      throw new Error('Missing entity id.');
    }

    return getEntityDetail(entityId);
  }, [entityId]);

  if (isLoading) {
    return <LoadingState text="Loading entity detail..." />;
  }

  if (error || !data) {
    return <ErrorState message={error ?? 'Missing entity data.'} onRetry={reload} />;
  }

  const mainImage = getEntityImageDimensions('main');
  const galleryImage = getEntityImageDimensions('gallery-1');

  return (
    <section className="page-stack">
      <section className="hero-panel hero-panel--entity">
        <div>
          <p className="eyebrow">{titleizeSlug(data.categoryId)}</p>
          <h1>{data.name}</h1>
          <p className="hero-panel__lede">{data.summary}</p>
          <p>{data.description}</p>
          <div className="inline-meta">
            <span>{data.location}</span>
            <span>Updated {formatDisplayDate(data.updatedAt)}</span>
          </div>
        </div>
        <ImageWithFallback
          alt={data.imageAlt}
          className="entity-page__hero-image"
          height={mainImage.height}
          loading="lazy"
          src={buildEntityImageUrl(data.id, 'main', data.imageExtension)}
          width={mainImage.width}
        />
      </section>

      <section className="detail-layout">
        <article className="detail-card">
          <h2>Structured details</h2>
          <dl className="detail-list">
            {data.details.map((detail) => (
              <div key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>{detail.value}</dd>
              </div>
            ))}
          </dl>
        </article>

        <article className="detail-card">
          <h2>Source links</h2>
          <ul className="link-list">
            {data.sourceUrls.map((source) => (
              <li key={source.url}>
                <a href={source.url} rel="noreferrer" target="_blank">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {data.galleryCount > 0 ? (
        <section className="page-section">
          <div className="section-heading section-heading--compact">
            <h2>Gallery placeholder</h2>
          </div>
          <ImageWithFallback
            alt={`${data.name} gallery preview`}
            className="entity-page__gallery-image"
            height={galleryImage.height}
            loading="lazy"
            src={buildEntityImageUrl(data.id, 'gallery-1', data.imageExtension)}
            width={galleryImage.width}
          />
        </section>
      ) : null}
    </section>
  );
}
