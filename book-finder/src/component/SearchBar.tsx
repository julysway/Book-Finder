import React from 'react';
import { FaSearch } from 'react-icons/fa';
import '../styles/searchBar.css';

interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  return (
    <div className="search-section">
      <div className="search-container">
        <form>
          <div className="form-container">
            <input
              type="text"
              placeholder="Search for books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)} 
            />
            <button type="submit"  className="search-button">
              <FaSearch />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;


