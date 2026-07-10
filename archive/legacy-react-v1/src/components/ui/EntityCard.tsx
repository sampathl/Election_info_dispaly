import { Link } from 'react-router-dom';

import { formatDisplayDate, titleizeSlug } from '@/lib/format';
import { buildEntityImageUrl, getEntityImageDimensions } from '@/lib/image';
import type { EntitySummary } from '@/types/content';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface EntityCardProps {
  entity: EntitySummary;
}

export function EntityCard({ entity }: EntityCardProps) {
  const imageDimensions = getEntityImageDimensions('thumb');

  return (
    <article className="entity-card">
      <ImageWithFallback
        alt={entity.imageAlt}
        className="entity-card__image"
        height={imageDimensions.height}
        loading="lazy"
        src={buildEntityImageUrl(entity.id, 'thumb', entity.imageExtension)}
        width={imageDimensions.width}
      />
      <div className="entity-card__body">
        <div className="entity-card__meta">
          <span className="chip">{titleizeSlug(entity.categoryId)}</span>
          <span>{entity.location}</span>
        </div>
        <h2 className="entity-card__title">{entity.name}</h2>
        <p className="entity-card__summary">{entity.summary}</p>
        <ul className="tag-list" aria-label={`${entity.name} tags`}>
          {entity.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="entity-card__footer">
          <span>Updated {formatDisplayDate(entity.updatedAt)}</span>
          <Link aria-label={`View profile for ${entity.name}`} to={`/entity/${entity.id}`}>
            View profile
          </Link>
        </div>
      </div>
    </article>
  );
}
