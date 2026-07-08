interface SearchBoxProps {
  onQueryChange: (value: string) => void;
  placeholder?: string;
  query: string;
}

export function SearchBox({
  onQueryChange,
  placeholder = 'Search people, places, or keywords',
  query,
}: SearchBoxProps) {
  return (
    <form className="search-box" onSubmit={(event) => event.preventDefault()}>
      <label className="search-box__label" htmlFor="search-query">
        Search
      </label>
      <input
        className="search-box__input"
        id="search-query"
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder={placeholder}
        type="search"
        value={query}
      />
    </form>
  );
}
