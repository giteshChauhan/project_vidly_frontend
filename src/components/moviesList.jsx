import Movie from "./movie";

const MoviesList = ({ data }) => {
  return (
    <div className="row">
      <h6>Movies List:</h6>
      <Movie data={data} />
    </div>
  );
};

export default MoviesList;
