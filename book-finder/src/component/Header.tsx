import React from 'react';
import '../styles/header.css';
import SearchBar from './SearchBar';


interface HeaderProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ query, setQuery }) => {
  return (
    <div className="header-section">
      <div className="header-container">
        <h2>Book Finder</h2>
        <SearchBar query={query} setQuery={setQuery} />
      </div>
    </div>
  );
};

export default Header;

