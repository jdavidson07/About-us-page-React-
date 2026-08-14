import { useSearch } from "./SearchContext";

export default function SearchBar() {
  const { setSearchTerm } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.searchInput.value.trim();
    setSearchTerm(value);
  };

 return ( //search bar code 
 <li className="navbar__search"> 
    <form  onSubmit={handleSubmit}>
        <input
        type="text"
        name="searchInput"
        placeholder="Search..."
        className="search-input"
        />
        <button type="submit" className="search-btn"></button>
        <i className="fas fa-search"></i>
    </form>
    </li>   
  );
}
