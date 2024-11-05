import React, { useState } from 'react';
import MovieGrid from './components/MovieGrid';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    setShowSearch(true); // Open the search bar
  };

  const handleBackClick = () => {
    setShowSearch(false); // Close the search bar
    setSearchTerm('');    // Clear the search term
  };

  return (
    <div className="App">
      <header className="App-header">
      {showSearch && (
        <button className="back-button" onClick={handleBackClick}>
          <i className="fas fa-arrow-left"></i>
        </button>
      )}
        <h1>Romantic Comedy</h1>
        <button className="search-button" onClick={handleSearchClick}>
          <i className="fas fa-search"></i>
        </button>
      </header>
      {showSearch && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
      )}
      <MovieGrid searchTerm={searchTerm} />
    </div>
  );
};

export default App;
