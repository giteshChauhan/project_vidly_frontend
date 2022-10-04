import sort_icon from "../../icons/sort_icon.png";

const Dropdown = ({
  items,
  btnClass,
  btnId,
  dropdownMenuId,
  textProperty,
  valueProperty,
  selectedItem,
  sortColumn,
  onSort,
  onItemSelect,
  isSortIcon,
  areImages,
}) => {
  let dropdownId = dropdownMenuId;

  if (!dropdownMenuId) {
    if (items.length > 4) dropdownId = "myDropdownMenuScrollable";
    else dropdownId = "myDropdownMenu";
  }

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
        id={btnId}
        style={{
          backgroundColor: "#181818",
          border: "none",
        }}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {isSortIcon && (
          <img
            src={sort_icon}
            alt="Sort"
            style={{ height: "24px", marginRight: "5px" }}
          />
        )}
        {selectedItem.name}
      </button>
      <ul className="dropdown-menu" id={dropdownId}>
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
            {areImages && (
              <img
                src={item.imgSrc}
                alt="*"
                style={{ height: "24px", marginRight: "5px" }}
              />
            )}
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
  btnId: null,
  isSortIcon: false,
  areImages: false,
};

export default Dropdown;
