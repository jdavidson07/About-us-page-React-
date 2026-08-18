import { useSearch } from "./SearchContext";

export default function SearchBar() {
  const { setSearchTerm } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.searchInput.value.trim();
    setSearchTerm(value);
  };

  return (
    <li className="navbar__search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchInput"
          placeholder="Search..."
          className="search__input"
        />
        <button type="submit" className="search__btn">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </li>
  );
}