import { useState } from "react";

import moment from "moment/moment";
import VideoModal from "../videoModal";

import delete_icon from "../../icons/delete.png";

const Card = ({ body, movie, bodyText, onClose, onRemoveWatchLater }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { title, thumbnailUrl: url } = movie;
  const { addedOn } = body;

  const handleVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const handleClose = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <>
      <div className="myModal" style={{ marginTop: "15px", width: "85%" }}>
        <div className="myModalFlex" style={{ justifyContent: "space-around" }}>
          <div
            className="crop-container"
            onClick={() => handleVideoModal()}
            id="card-crop-container"
          >
            <img
              src={url}
              alt={title}
              className="card-img-top"
              id="card-card-img-top"
            />
          </div>
          <div style={{ marginLeft: "15px" }}>
            <span
              className="myTitle"
              style={{ fontSize: "22px" }}
              onClick={() => handleVideoModal()}
            >
              {title}
            </span>
            <br />
            {bodyText} :{" "}
            {moment(addedOn).format("dddd, MMMM Do YYYY, h:mm:ss a")}
          </div>
          <div className="divider"></div>
          {onClose && (
            <button
              type="button"
              style={{ height: "0%" }}
              className="myCloseBtn m-2"
              onClick={() => {
                onClose(body);
                if (onRemoveWatchLater) onRemoveWatchLater();
              }}
            >
              <img
                src={delete_icon}
                alt="remove"
                style={{
                  height: "19px",
                  marginBottom: "3px",
                  marginRight: "2px",
                }}
              />
              Remove
            </button>
          )}
        </div>
      </div>
      <VideoModal
        movie={movie}
        onClose={handleClose}
        isOpen={isVideoModalOpen}
      />
    </>
  );
};

Card.defaultProps = {
  onClose: null,
  onRemoveWatchLater: null,
};

export default Card;
