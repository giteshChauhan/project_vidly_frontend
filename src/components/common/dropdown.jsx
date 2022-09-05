const Dropdown = ({
  items,
  btnClass,
  dropdownMenuId,
  textProperty,
  valueProperty,
  onItemSelect,
  selectedItem,
}) => {
  return (
    <div className="dropdown">
      <button
        className={btnClass}
        style={{ backgroundColor: "#181818", border: "none" }}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedItem.name}
      </button>
      <ul className="dropdown-menu" id={dropdownMenuId}>
        {items.map((item) => (
          <li
            key={item[valueProperty]}
            className="dropdown-item"
            id="myListItem"
            style={item === selectedItem ? { color: "#6e00ff" } : null}
            onClick={() => {
              onItemSelect(item);
            }}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
};

Dropdown.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
  btnClass: "dropdown-toggle myDropdownBtn",
  dropdownMenuId: "myDropdownMenu",
};

export default Dropdown;
