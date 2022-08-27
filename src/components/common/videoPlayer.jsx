import "../../css/App.css";

const Videoplayer = ({ videoId }) => {
  return (
    <div className="iframe-container">
      <iframe
        title={videoId}
        frameBorder="0"
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen={true}
      />
    </div>
  );
};

export default Videoplayer;
