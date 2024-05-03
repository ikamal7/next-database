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
      <form onSubmit={handleSearchSubmit}>
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
            <option defaultChecked value="name">Name</option>
            <option value="main_agency">Main Agency</option>
            <option value="executing_agency">Executing Agency</option>
            <option value="execution_type">Execution Type</option>
            <option value="location">Locations</option>
          </select>
        </div>
        {/* <button type="submit">Search</button> */}
      </form>
    </div>
  );
};

export default SearchForm;
