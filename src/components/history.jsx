import { useEffect, useCallback, useState } from "react";
import moment from "moment/moment";

import Card from "./common/card";
import MyDate from "./common/myDate";

import { getHistory } from "../services/historyService";
import { getMovie } from "../services/movieService";

import chill_icon from "../icons/chill_icon.png";

const History = () => {
  const [moviesData, setMoviesData] = useState([]);
  let history = null;

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
    setMoviesData(movieData);
  };

  useEffect(() => {
    document.title = "VIDLY | History";
    fetchWatchLaterMovieIds();
  }, [fetchWatchLaterMovieIds]);

  return (
    <div style={{ marginLeft: "7%" }}>
      {moviesData.length ? (
        moviesData.map(({ movie, data }) => {
          const date = moment(movie.addedOn).format("l");
          let show = false;
          if (!history || history !== date) {
            history = date;
            show = true;
          }
          return (
            <div key={movie._id}>
              {show ? <MyDate date={movie.addedOn} /> : null}
              <Card body={movie} movie={data} bodyText="Watched On" />
            </div>
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
              History :{" "}
            </span>
            Currently no movies watched. Enjoy add free content{" "}
            <img src={chill_icon} alt="and chill" className="myImg" />
          </span>
        </div>
      )}
    </div>
  );
};

export default History;
