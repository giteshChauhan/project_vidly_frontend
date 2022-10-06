import { useState, useEffect, useCallback } from "react";

import { getMovies } from "../../services/movieService";
import { getGenres } from "../../services/genreService";
import { getContentType } from "../../services/contentTypeService";
import { getCinema } from "../../services/cinemaService";

import CardPlaceHolder from "../common/cardPlaceholder";
import Movies from "../movies";

const MoviesSpinner = ({ onAddWatchLater, selectedQuery, searchQuery }) => {
  const [contentType, setContentType] = useState(null);
  const [movies, setMovies] = useState(null);
  const [genres, setGenres] = useState(null);
  const [cinema, setCinema] = useState(null);
  let dummyArray = [];
  for (let i = 0; i < 32; i++) {
    dummyArray.push(i);
  }

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
          onAddWatchLater={onAddWatchLater}
          selectedQuery={selectedQuery}
          searchQuery={searchQuery}
        />
      ) : (
        <div style={{ marginTop: "-38px" }}>
          <p
            className="placeholder-wave"
            style={{ width: "30%", marginBottom: "5px" }}
          >
            <span className="placeholder" style={{ width: "100%" }}></span>
          </p>
          <p
            className="placeholder-wave"
            style={{ width: "15%", marginBottom: "15px" }}
          >
            <span className="placeholder" style={{ width: "100%" }}></span>
          </p>
          <div className="row">
            {dummyArray.map((value) => (
              <CardPlaceHolder key={value} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesSpinner;
