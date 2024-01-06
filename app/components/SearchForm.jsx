import React from 'react';

const SearchForm = ({
  onSearch,
  searchText,
  searchCategory,
  onSearchTextChange,
  onSearchCategoryChange,
}) => {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Ensure that onSearch is a function before calling it
    if (typeof onSearch === 'function') {
      onSearch({ searchText, searchCategory });
    }
  };

  return (
    <div className="search">
      <form onChange={handleSearchSubmit}>
        <div className="input-group" style={{ width: '80%' }}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            value={searchText}
            onChange={onSearchTextChange}
          />
        </div>
        <span>in</span>
        <div className="input-group">
          <select
            name="category"
            id="category"
            value={searchCategory}
            onChange={onSearchCategoryChange}
          >
            <option value="Any">Any</option>
            <option value="Name">Name</option>
            <option value="Main Agency">Main Agency</option>
            <option value="Executing Agency">Executing Agency</option>
            <option value="Execution Type">Execution Type</option>
            <option value="Locations">Locations</option>
          </select>
        </div>
        {/* <button type="submit">Search</button> */}
      </form>
    </div>
  );
};

export default SearchForm;
