import chill_icon from "../../icons/chill_icon.png";

const Header = ({ id = null }) => {
  return (
    <div className="myModal myModalFlex" id={id}>
      <img src={chill_icon} alt="chill" className="myImg" />
      <h6
        className="modal-title "
        style={{ color: "#6e00ff", marginLeft: "4px" }}
      >
        Enjoy add-free content
      </h6>
    </div>
  );
};

export default Header;
