import bannerPV_icon from "../icons/bannerPV_icon.png";
import chill_icon from "../icons/chill_icon.png";

const Banner = () => {
  return (
    <div className="myBanner">
      <img src={bannerPV_icon} alt="bannerIcon" className="myBannerIcon" />
      <h1 className="myBannerTitle">Project_Vidly</h1>
      <p className="myBannerText">
        Watch over 250+ top tier movies.
        <img
          src={chill_icon}
          alt="Chill"
          className="myImg"
          style={{ marginRight: "2px" }}
        />
        Enjoy public movies ads-free.
        <br className="myBr" />
        Click about button for more details.
      </p>
    </div>
  );
};

export default Banner;
