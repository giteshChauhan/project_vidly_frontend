import Movie from "./movie";

const MoviesList = ({ data, onMovieSelected }) => {
  return (
    <div className="row">
      <h6>Movies List:</h6>
      <Movie data={data} onMovieSelected={onMovieSelected} />
    </div>
  );
};

export default MoviesList;
