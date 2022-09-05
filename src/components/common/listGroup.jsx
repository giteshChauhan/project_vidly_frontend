// listGroup

const ListGroup = (props) => {
  const { items, textProperty, valueProperty, onItemSelect, selectedItem } =
    props;

  return (
    <ul className="list-group mb-3">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className="list-group-item"
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
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
