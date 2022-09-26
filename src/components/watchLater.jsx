import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

import Dropdown from "./common/dropdown";
import Card from "./common/card";

import { getWatchLater, removeWatchLater } from "../services/watchLaterService";
import { getMovie } from "../services/movieService";

import chill_icon from "../icons/chill_icon.png";

const WatchLater = ({ onRemoveWatchLater }) => {
  const [moviesData, setMoviesData] = useState([]);
  const sortItems = [
    { name: "Newest First", _id: 0 },
    { name: "Most Popular", _id: 1 },
    { name: "Oldest First", _id: 2 },
  ];
  const [selectedItem, setSelectedItem] = useState(sortItems[0]);

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
    }
  };

  const handleSort = (item) => {
    setSelectedItem(item);
    if (item._id === 0) {
      moviesData.sort(({ movie: a }, { movie: b }) => {
        if (a.addedOn >= b.addedOn) return 1;
        else return -1;
      });
    }
    if (item._id === 1) {
      moviesData.sort(({ data: a }, { data: b }) => {
        if (a.rating >= b.rating) return -1;
        else return 1;
      });
    }
    if (item._id === 2) {
      moviesData.sort(({ movie: a }, { movie: b }) => {
        if (b.addedOn >= a.addedOn) return 1;
        else return -1;
      });
    }
    setMoviesData(moviesData);
  };

  return (
    <div style={{ marginLeft: "7%" }}>
      {moviesData.length ? (
        <Dropdown
          items={sortItems}
          selectedItem={selectedItem}
          onItemSelect={handleSort}
          dropdownMenuId={"watchLaterSort"}
          isSortIcon={true}
        />
      ) : null}
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
            marginTop: "-20px",
            marginLeft: "-20px",
            color: "#e2dada",
          }}
        >
          <span style={{ fontSize: "1.3rem" }}>
            <span style={{ color: "white", fontSize: "1.5rem" }}>
              WatchLater :{" "}
            </span>
            Currently no active movies to watch later. Add movies to enjoy{" "}
            <img src={chill_icon} alt="and chill" className="myImg" />
          </span>
        </div>
      )}
    </div>
  );
};

export default WatchLater;
