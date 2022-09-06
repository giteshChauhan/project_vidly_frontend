const Video = ({ data, onVideoSelected }) => {
  return data.map(({ snippet, id }) => {
    return (
      <div
        className="card"
        style={{
          width: "18rem",
          margin: "3px",
          boxShadow: "0 0  1px 1px #6e00ff",
          backgroundColor: "#181818",
        }}
        key={id.videoId}
        onClick={() => onVideoSelected(id.videoId)}
      >
        <div className="crop-container">
          <img
            src={snippet.thumbnails.high.url}
            alt={snippet.channelTitle}
            className="card-img-top"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{snippet.channelTitle}</h5>
          <p className="card-text">{id.videoId}</p>
          <p className="card-text">{snippet.thumbnails.high.url}</p>
        </div>
      </div>
    );
  });
};

export default Video;
