import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

import Card from "./common/card";

import { getWatchLater, removeWatchLater } from "../services/watchLaterService";
import { getMovie } from "../services/movieService";

import chill_icon from "../icons/chill_icon.png";

const WatchLater = ({ onRemoveWatchLater }) => {
  const [moviesData, setMoviesData] = useState([]);

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

  const handleRemoveVideo = async (movieWatchLater) => {
    const moviesCopy = [...moviesData];
    try {
      const movies = moviesData.filter(
        ({ movie }) => movieWatchLater !== movie
      );
      setMoviesData(movies);
      await removeWatchLater(movieWatchLater.movieId);
      toast.success("Removed Successfully");
    } catch (err) {
      setMoviesData(moviesCopy);
      toast.error("Something Failed");
      console.log(err);
    }
  };

  return (
    <div style={{ marginLeft: "7%" }}>
      <h3>WatchLater</h3>
      {moviesData.length ? (
        moviesData.map(({ movie, data }) => {
          return (
            <Card
              key={movie.movieId}
              body={movie}
              movie={data}
              onClose={handleRemoveVideo}
              bodyText="Added On"
              onRemoveWatchLater={onRemoveWatchLater}
            />
          );
        })
      ) : (
        <div
          className="myModal"
          style={{
            textAlign: "center",
            marginTop: "-46px",
            marginLeft: "-20px",
            color: "#e2dada",
          }}
        >
          <span style={{ fontSize: "1.3rem" }}>
            Currently no active movies to watch later. Add movies to enjoy{" "}
            <img src={chill_icon} alt="and chill" className="myImg" />
          </span>
        </div>
      )}
    </div>
  );
};

export default WatchLater;
