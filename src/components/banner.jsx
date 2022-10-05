import InfoModal from "./common/infoModal";

import bannerPV_icon from "../icons/bannerPV_icon.png";
import chill_icon from "../icons/chill_icon.png";

const Banner = () => {
  const bannerData = (
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
      </p>
      <p id="bannerFinePrintText">
        * This project uses youtubeDataApi to play movies or trailers. For more
        details about code , project and developer aka myself check out the
        footer below.
      </p>
    </div>
  );

  return <InfoModal data={bannerData} />;
};

export default Banner;
