const SearchBox = ({ value, onChange }) => {
  return (
    <input
      className="form-control"
      id="mySearchBox"
      name="query"
      type="text"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      style={{ marginBottom: 10 }}
      placeholder="Search..."
    />
  );
};

export default SearchBox;
