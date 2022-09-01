import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { getCurrentUser } from "../services/authService";
import Videoplayer from "./common/videoPlayer";

import views_icon from "../icons/views_icon.png";
import upvotes_icon from "../icons/upvotes_icon.png";
import add_disable from "../icons/add_disable.png";
import add_enable from "../icons/add_enable.png";
import ticket_icon from "../icons/ticket_icon.png";
import chill_icon from "../icons/chill_icon.png";

const VideoModal = ({ isOpen, onClose, movie }) => {
  let title, ytId, imdbId, contentType;
  const user = getCurrentUser();
  const [upvotes, setUpvotes] = useState();
  const [views, setViews] = useState();
  const [more, setMore] = useState(false);
  const [plotOutline, setPlotOutline] = useState();
  const [plotSummary, setPlotSummary] = useState();
  const [releaseDate, setReleaseDate] = useState();

  const navigate = useNavigate();

  const handleStats = async () => {
    const { data } = await axios.get(
      `/.netlify/functions/fetchYoutubeStats?id=${ytId}`
    );
    const { likeCount, viewCount } = data.items[0].statistics;
    setUpvotes(likeCount);
    setViews(viewCount);
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

  const handleAdddMovie = () => {
    toast.success("Movie added to rentals 😃");
  };

  try {
    title = movie.title;
    contentType = movie.contentType;
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
              className="modal-title myModal"
              style={{ color: "#6e00ff", marginRight: "5px" }}
              id="staticBackdropLabel"
            >
              {title} : {contentType}
            </h6>
            <div className="myModal myModalFlex">
              <img src={chill_icon} alt="chill" className="myImg" />
              <h6
                className="modal-title "
                style={{ color: "#6e00ff", marginLeft: "4px" }}
              >
                Enjoy add-free content
              </h6>
            </div>
            <div className="divider"></div>
            <button
              type="button"
              className="btn-close m-2"
              onClick={() => {
                onClose();
                setMore(false);
              }}
              aria-label="Close"
            />
          </div>
          <div className="my-modal-body">
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
            <div className="m-2">
              {user ? (
                <img
                  src={add_enable}
                  alt="enabled"
                  className="myImg"
                  onClick={() => handleAdddMovie()}
                />
              ) : (
                <img
                  src={add_disable}
                  alt="disabled"
                  className="myImg"
                  onClick={() => navigate("/login", { replace: true })}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
