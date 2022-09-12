const Dropdown = ({
  items,
  btnClass,
  dropdownMenuId,
  textProperty,
  valueProperty,
  selectedItem,
  sortColumn,
  onSort,
  onItemSelect,
}) => {
  const lastWord = (name) => {
    const n = name.lastIndexOf(" ");
    return name.substring(n + 1);
  };

  const raiseSort = (name) => {
    const path = lastWord(name);
    const sortColumnCopy = sortColumn;
    if (sortColumnCopy.path === path)
      sortColumnCopy.order = sortColumnCopy.order === "asc" ? "desc" : "asc";
    else {
      sortColumnCopy.path = path;
      sortColumnCopy.order = "asc";
    }
    onSort(sortColumnCopy);
  };

  const renderSortIcon = (name) => {
    const path = lastWord(name);
    if (path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

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
            onClick={
              onSort
                ? () => {
                    onItemSelect(item);
                    raiseSort(item[textProperty]);
                  }
                : () => onItemSelect(item)
            }
          >
            {item[textProperty]}
            {onSort && renderSortIcon(item[textProperty])}
          </li>
        ))}
      </ul>
    </div>
  );
};

Dropdown.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
  sortColumn: {},
  onSort: null,
  selectedItem: {},
  onItemSelect: null,
  btnClass: "dropdown-toggle myDropdownBtn",
  dropdownMenuId: "myDropdownMenu",
};

export default Dropdown;
