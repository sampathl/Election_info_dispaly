import type { Category } from '@/types/content';

interface FilterPanelProps {
  categories: Category[];
  onCategoryChange: (value: string) => void;
  selectedCategoryId: string;
}

export function FilterPanel({
  categories,
  onCategoryChange,
  selectedCategoryId,
}: FilterPanelProps) {
  return (
    <aside className="filter-panel">
      <label className="filter-panel__label" htmlFor="category-filter">
        Filter by category
      </label>
      <select
        className="filter-panel__select"
        id="category-filter"
        onChange={(event) => onCategoryChange(event.target.value)}
        value={selectedCategoryId}
      >
        <option value="all">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </aside>
  );
}
