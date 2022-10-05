import { useState, useEffect } from "react";
import axios from "axios";

import Videoplayer from "./common/videoPlayer";
import Header from "./common/header";

import { addHistory } from "../services/historyService";

import views_icon from "../icons/views_icon.png";
import upvotes_icon from "../icons/upvotes_icon.png";
import add_enable from "../icons/add_enable.png";
import ticket_icon from "../icons/ticket_icon.png";

const VideoModal = ({ isOpen, onClose, movie, onAdd }) => {
  let title, ytId, imdbId, contentType;
  const [upvotes, setUpvotes] = useState();
  const [views, setViews] = useState();
  const [more, setMore] = useState(false);
  const [plotOutline, setPlotOutline] = useState();
  const [plotSummary, setPlotSummary] = useState();
  const [releaseDate, setReleaseDate] = useState();

  const handleStats = async () => {
    const { data } = await axios.get(
      `/.netlify/functions/fetchYoutubeStats?id=${ytId}`
    );
    const { likeCount, viewCount } = data.items[0].statistics;
    setUpvotes(likeCount);
    setViews(viewCount);
    await addHistory({ movieId: movie._id });
  };

  const handleOverview = async () => {
    const { data } = await axios.get(
      `/.netlify/functions/fetchMovieOverview?id=${imdbId}`
    );
    const { plotOutline, plotSummary, releaseDate } = data;
    const outline = plotOutline.text;
    const summary = plotSummary.text;
    setPlotOutline(outline);
    setPlotSummary(summary);
    setReleaseDate(releaseDate);
  };

  try {
    title = movie.title;
    contentType = movie.contentType.name;
    ytId = movie.yt_id;
    imdbId = movie.imdb_id;
  } catch (e) {
    title = "";
    contentType = "";
    ytId = "";
    imdbId = "";
  }

  useEffect(() => {
    if (isOpen && ytId !== "") handleStats();
    if (isOpen && imdbId !== "") handleOverview();
  }, [isOpen, ytId, imdbId]);

  return (
    <div style={isOpen ? null : { display: "none" }} className="modalContainer">
      <div className="modal-dialog modal-xl myModal">
        <div className="modal-content">
          <div className="myModalFlex">
            <h6
              className="modal-title"
              style={{ color: "#6e00ff", marginRight: "5px", fontSize: "20px" }}
              id="staticBackdropLabel"
            >
              {title} : {contentType}
            </h6>
            <div className="divider"></div>
            <button
              type="button"
              className="myCloseBtnMinimal"
              onClick={() => {
                onClose();
                setMore(false);
              }}
            >
              X
            </button>
          </div>

          <div className="my-modal-body">
            <Header id={"videoModalHeader"} />
            <div className="videoPlayerModal">
              {ytId !== "" && <Videoplayer videoId={ytId} />}
            </div>
            <div className="myModal" style={{ margin: "5px 8px" }}>
              {imdbId !== "" &&
                (more ? (
                  <p className="myPlot">
                    <b style={{ color: "#6e00ff" }}>PlotSummary : </b>{" "}
                    {plotSummary}....
                    <span className="myTitle" onClick={() => setMore(false)}>
                      less
                    </span>
                  </p>
                ) : (
                  <p className="myPlot">
                    <b style={{ color: "#6e00ff" }}>PlotOutline : </b>
                    {plotOutline}.....
                    <span className="myTitle" onClick={() => setMore(true)}>
                      more
                    </span>
                  </p>
                ))}
            </div>
          </div>
          <div className="myModalFlex">
            <div className="myModal m-1">
              <img src={views_icon} alt="views" className="myImg" />
              {views}
            </div>
            <div className="myModal m-1">
              <img src={upvotes_icon} alt="upvotes" className="myImg" />
              {upvotes}
            </div>
            <div className="myModal m-1">
              <img src={ticket_icon} alt="inCinema" className="myImg" />
              {releaseDate}
            </div>
            <div className="divider"></div>
            {onAdd && (
              <img
                src={add_enable}
                alt="enabled"
                className="myImg m-2 hiddenImg"
                onClick={() => onAdd(movie)}
              />
            )}
          </div>

          {onAdd && (
            <button
              className="btn btn-primary watchLaterBtn"
              id="videoModalWatchLaterBtn"
              onClick={() => onAdd(movie)}
            >
              Watch Later
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

VideoModal.defaultProps = {
  onAdd: null,
};

export default VideoModal;
