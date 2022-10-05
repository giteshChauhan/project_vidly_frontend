import Marquee from "react-fast-marquee";
import chill_icon from "../../icons/chill_icon.png";

const Header = ({ id = null }) => {
  return (
    <div className="myModalFlex" id={id}>
      <Marquee direction="right" speed={40} gradient={false}>
        <img src={chill_icon} alt="chill" className="myImg" />
        <h6
          className="modal-title "
          style={{ color: "#6e00ff", fontSize: "17px" }}
        >
          Enjoy ad-free content
        </h6>
      </Marquee>
    </div>
  );
};

export default Header;
