const SearchBox = ({ value, id, onChange }) => {
  return (
    <input
      className="form-control mySearchBox"
      id={id}
      name="query"
      type="text"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder="Search..."
    />
  );
};

SearchBox.defaultProps = {
  id: null,
};

export default SearchBox;
