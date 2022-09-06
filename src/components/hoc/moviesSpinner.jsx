import { useState, useEffect, useCallback } from "react";
import { PropagateLoader } from "react-spinners";

import { getMovies } from "../../services/movieService";
import { getGenres } from "../../services/genreService";
import { getContentType } from "../../services/contentTypeService";
import { getCinema } from "../../services/cinemaService";

import Movies from "../movies";

const MoviesSpinner = () => {
  const [movies, setMovies] = useState(null);
  const [genres, setGenres] = useState(null);
  const [cinema, setCinema] = useState(null);
  const [contentType, setContentType] = useState(null);

  const fetchMovies = useCallback(async () => {
    const { data } = await getMovies();
    setMovies(data);
  }, []);

  const fetchGenres = useCallback(async () => {
    const { data } = await getGenres();
    const genres = [{ name: "All Genres", _id: 0 }, ...data];
    setGenres(genres);
  }, []);

  const fetchCinema = useCallback(async () => {
    const { data } = await getCinema();
    const cinema = [{ name: "All Cinema", _id: 0 }, ...data];
    setCinema(cinema);
  }, []);

  const fetchContentType = useCallback(async () => {
    const { data } = await getContentType();
    const contentType = [{ name: "All Content", _id: 0 }, ...data];
    setContentType(contentType);
  }, []);

  useEffect(() => {
    fetchMovies();
    fetchGenres();
    fetchCinema();
    fetchContentType();
  }, [fetchMovies, fetchGenres, fetchCinema, fetchContentType]);

  const isData = () => {
    if (movies && genres && cinema && contentType) return true;
    return false;
  };

  return (
    <div>
      {isData() ? (
        <Movies
          movies={movies}
          genres={genres}
          cinema={cinema}
          contentType={contentType}
        />
      ) : (
        <div className="mySpinner">
          <PropagateLoader color="#6e00ff" />
        </div>
      )}
    </div>
  );
};

export default MoviesSpinner;
