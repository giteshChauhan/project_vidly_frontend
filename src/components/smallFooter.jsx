import { Link } from "react-router-dom";
import CopyRight from "./common/copyright";

const SmallFooter = () => {
  return (
    <div
      className="myModalFlex"
      style={{
        justifyContent: "center",
        borderTop: "1px solid #6e00ff",
        borderRadius: "10px",
        padding: "2rem 0 ",
      }}
    >
      <Link className="a-design" to={"/login"} style={{ marginRight: "15px" }}>
        Terms
      </Link>
      <Link className="a-design" to={"/login"} style={{ marginRight: "15px" }}>
        Privacy
      </Link>
      <Link className="a-design" to={"/login"} style={{ marginRight: "30px" }}>
        Feedback
      </Link>
      <CopyRight showVersion={false} />
    </div>
  );
};

export default SmallFooter;
