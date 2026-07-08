import { startTransition, useDeferredValue, useState } from 'react';

import { getCategories, getSearchIndex } from '@/data/client';
import { useAsyncData } from '@/hooks/useAsyncData';
import type { Category, SearchIndexItem } from '@/types/content';
import { EntityCard } from '@/components/ui/EntityCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { FilterPanel } from '@/components/ui/FilterPanel';
import { LoadingState } from '@/components/ui/LoadingState';
import { SearchBox } from '@/components/ui/SearchBox';

interface SearchPageData {
  categories: Category[];
  items: SearchIndexItem[];
}

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const deferredQuery = useDeferredValue(query);

  const { data, error, isLoading, reload } = useAsyncData<SearchPageData>(async () => {
    const [categories, items] = await Promise.all([getCategories(), getSearchIndex()]);
    return { categories, items };
  }, []);

  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const filteredItems =
    data?.items.filter((item) => {
      const matchesCategory =
        selectedCategoryId === 'all' || item.categoryId === selectedCategoryId;
      const haystack = [
        item.name,
        item.summary,
        item.location,
        ...item.tags,
        ...item.keywords,
      ]
        .join(' ')
        .toLowerCase();

      return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
    }) ?? [];

  if (isLoading) {
    return <LoadingState text="Loading the search index..." />;
  }

  if (error || !data) {
    return <ErrorState message={error ?? 'Missing search data.'} onRetry={reload} />;
  }

  return (
    <section className="page-stack">
      <section className="page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Search</p>
            <h1>Find records across the static index</h1>
          </div>
        </div>
        <div className="search-toolbar">
          <SearchBox
            onQueryChange={(value) => {
              startTransition(() => setQuery(value));
            }}
            query={query}
          />
          <FilterPanel
            categories={data.categories}
            onCategoryChange={setSelectedCategoryId}
            selectedCategoryId={selectedCategoryId}
          />
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading section-heading--compact">
          <h2>{filteredItems.length} matching results</h2>
        </div>
        {filteredItems.length === 0 ? (
          <EmptyState
            message="Try a broader query or remove category filters."
            title="No matching entities"
          />
        ) : (
          <div className="entity-grid">
            {filteredItems.map((item) => (
              <EntityCard entity={item} key={item.id} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
