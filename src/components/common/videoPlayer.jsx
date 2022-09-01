import "../../css/App.css";

const Videoplayer = ({ videoId }) => {
  return (
    <div className="iframe-container">
      <iframe
        title={videoId}
        frameBorder="0"
        src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&iv_load_policy=3&rel=0`}
        allowFullScreen={true}
      />
    </div>
  );
};

export default Videoplayer;
