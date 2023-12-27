// SearchForm.jsx

const SearchForm = () => {
  return (
    <div className="search">
      <form action="">
        <div className="input-group" style={{ width: '80%' }}>
          <input type="text" name="search" id="search" placeholder="Search" />
        </div>
        <span>in</span>
        <div className="input-group">
          <select name="category" id="category">
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
