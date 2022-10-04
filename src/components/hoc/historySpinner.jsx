import { useCallback, useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import _ from "lodash";

import { getHistory } from "../../services/historyService";
import { getMovie } from "../../services/movieService";

import History from "../history";

const HistorySpinner = () => {
  const [moviesData, setMoviesData] = useState(null);

  const fetchWatchLaterMovieIds = useCallback(async () => {
    const { data } = await getHistory();
    fetchMovieById(data);
  }, []);

  const fetchMovieById = async (movieIds) => {
    let movieData = [];
    for (let movie of movieIds) {
      const id = movie.movieId;
      const { data } = await getMovie(id);
      movieData.push({ movie, data });
    }
    _.reverse(movieData);
    setMoviesData(movieData);
  };

  useEffect(() => {
    document.title = "VIDLY | History";
    fetchWatchLaterMovieIds();
  }, [fetchWatchLaterMovieIds]);

  const isData = () => {
    if (moviesData || moviesData === []) return true;
    return false;
  };

  return (
    <div>
      {isData() ? (
        <History moviesData={moviesData} />
      ) : (
        <div className="mySpinner">
          <HashLoader color="#6e00ff" />
        </div>
      )}
    </div>
  );
};

export default HistorySpinner;
