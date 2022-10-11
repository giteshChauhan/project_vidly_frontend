import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Dropdown from "./common/dropdown";
import Card from "./common/card";

import { removeWatchLater } from "../services/watchLaterService";

import chill_icon from "../icons/chill_icon.png";

const WatchLater = ({ onRemoveWatchLater, moviesData }) => {
  const [moviesDataCopy, setMoviesDataCopy] = useState(moviesData);
  const sortItems = [
    { name: "Newest First", _id: 0 },
    { name: "Most Popular", _id: 1 },
    { name: "Oldest First", _id: 2 },
  ];
  const [selectedItem, setSelectedItem] = useState(sortItems[0]);

  useEffect(() => {
    document.title = "VIDLY | WatchLater";
  }, []);

  const handleRemoveVideo = async (movieWatchLater) => {
    const moviesCopy = [...moviesDataCopy];
    try {
      const movies = moviesDataCopy.filter(
        ({ movie }) => movieWatchLater !== movie
      );
      setMoviesDataCopy(movies);
      await removeWatchLater(movieWatchLater.movieId);
      toast.dark("✔️ Removed Successfully");
    } catch (err) {
      setMoviesDataCopy(moviesCopy);
      toast.dark("❗❗ Something failed");
    }
  };

  const handleSort = (item) => {
    setSelectedItem(item);
    if (item._id === 0) {
      moviesDataCopy.sort(({ movie: a }, { movie: b }) => {
        if (a.addedOn >= b.addedOn) return 1;
        else return -1;
      });
    }
    if (item._id === 1) {
      moviesDataCopy.sort(({ data: a }, { data: b }) => {
        if (a.rating >= b.rating) return -1;
        else return 1;
      });
    }
    if (item._id === 2) {
      moviesDataCopy.sort(({ movie: a }, { movie: b }) => {
        if (b.addedOn >= a.addedOn) return 1;
        else return -1;
      });
    }
    setMoviesDataCopy(moviesDataCopy);
  };

  return (
    <div style={{ marginLeft: "7%", marginTop: "-38px" }}>
      {moviesDataCopy.length ? (
        <Dropdown
          items={sortItems}
          selectedItem={selectedItem}
          onItemSelect={handleSort}
          dropdownMenuId={"watchLaterSort"}
          isSortIcon={true}
        />
      ) : null}
      {moviesDataCopy.length ? (
        moviesDataCopy.map(({ movie, data }) => {
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
