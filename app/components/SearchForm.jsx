import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [searchCategory, setSearchCategory] = useState('Any');

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Pass the search criteria to the parent component
    onSearch({ searchText, searchCategory });
  };

  return (
    <div className="search">
      <form onSubmit={handleSearchSubmit}>
        <div className="input-group" style={{ width: '80%' }}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchTextChange}
          />
        </div>
        <span>in</span>
        <div className="input-group">
          <select
            name="category"
            id="category"
            value={searchCategory}
            onChange={handleSearchCategoryChange}
          >
            <option value="Any">Any</option>
            <option value="Name">Name</option>
            <option value="Main Agency">Main Agency</option>
            <option value="Executing Agency">Executing Agency</option>
            <option value="Execution Type">Execution Type</option>
            <option value="Locations">Locations</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
