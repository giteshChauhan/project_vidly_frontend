import Video from "./video";

const VideosList = ({ data, onVideoSelected }) => {
  return (
    <div className="row">
      <h6>Videos List:</h6>
      <Video data={data} onVideoSelected={onVideoSelected} />
    </div>
  );
};

export default VideosList;
