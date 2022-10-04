import { useState, useCallback, useEffect } from "react";
import { HashLoader } from "react-spinners";

import { getWatchLater } from "../../services/watchLaterService";
import { getMovie } from "../../services/movieService";

import WatchLater from "./../watchLater";

const WatchLaterSpinner = ({ onRemoveWatchLater }) => {
  const [moviesData, setMoviesData] = useState(null);

  const fetchWatchLaterMovieIds = useCallback(async () => {
    const { data } = await getWatchLater();
    fetchMovieById(data);
  }, []);

  const fetchMovieById = async (movieIds) => {
    let movieData = [];
    for (let movie of movieIds) {
      const id = movie.movieId;
      const { data } = await getMovie(id);
      movieData.push({ movie, data });
    }
    setMoviesData(movieData);
  };

  useEffect(() => {
    document.title = "VIDLY | WatchLater";
    fetchWatchLaterMovieIds();
  }, [fetchWatchLaterMovieIds]);

  const isData = () => {
    if (moviesData || moviesData === []) return true;
    return false;
  };

  return (
    <div>
      {isData() ? (
        <WatchLater
          moviesData={moviesData}
          onRemoveWatchLater={onRemoveWatchLater}
        />
      ) : (
        <div className="mySpinner">
          <HashLoader color="#6e00ff" />
        </div>
      )}
    </div>
  );
};

export default WatchLaterSpinner;
