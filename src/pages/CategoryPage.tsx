import { useParams } from 'react-router-dom';

import { getCategories, getListingPage } from '@/data/client';
import { useAsyncData } from '@/hooks/useAsyncData';
import type { Category, ListingPageResponse } from '@/types/content';
import { EntityCard } from '@/components/ui/EntityCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingState } from '@/components/ui/LoadingState';
import { Pagination } from '@/components/ui/Pagination';

interface CategoryPageData {
  category: Category;
  listing: ListingPageResponse;
}

export function CategoryPage() {
  const { categoryId, pageNumber } = useParams();
  const currentPage = Number.parseInt(pageNumber ?? '1', 10);
  const safePageNumber = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;

  const { data, error, isLoading, reload } = useAsyncData<CategoryPageData>(async () => {
    if (!categoryId) {
      throw new Error('Missing category id.');
    }

    const [categories, listing] = await Promise.all([
      getCategories(),
      getListingPage(categoryId, safePageNumber),
    ]);

    const category = categories.find((item) => item.id === categoryId);

    if (!category) {
      throw new Error(`Unknown category: ${categoryId}`);
    }

    return { category, listing };
  }, [categoryId, safePageNumber]);

  if (isLoading) {
    return <LoadingState text="Loading category listing..." />;
  }

  if (error || !data) {
    return <ErrorState message={error ?? 'Missing category data.'} onRetry={reload} />;
  }

  return (
    <section className="page-stack">
      <section className="page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Category</p>
            <h1>{data.category.name}</h1>
          </div>
          <span className="section-heading__meta">
            Page {data.listing.pageNumber} of {data.listing.totalPages}
          </span>
        </div>
        <p className="section-description">{data.category.description}</p>
      </section>

      <section className="page-section">
        {data.listing.items.length === 0 ? (
          <EmptyState
            message="Publish a listing file to this category route when your scraper output is ready."
            title="No entities in this page"
          />
        ) : (
          <div className="entity-grid">
            {data.listing.items.map((entity) => (
              <EntityCard entity={entity} key={entity.id} />
            ))}
          </div>
        )}
      </section>

      <Pagination
        buildPageHref={(page) => (page === 1 ? `/category/${data.category.id}` : `/category/${data.category.id}/page/${page}`)}
        currentPage={data.listing.pageNumber}
        totalPages={data.listing.totalPages}
      />
    </section>
  );
}
