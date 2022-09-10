const MoviesCardView = ({ movies, onVideo }) => {
  return (
    <div className="row" id="moviesCardRow">
      {movies.map((movie) => {
        const {
          _id,
          title,
          genre,
          thumbnailUrl: url,
          year,
          rating,
          contentType,
        } = movie;
        return (
          <div
            className="card"
            style={{
              width: "298px",
              margin: "8px",
              borderRadius: "0px",
            }}
            onClick={() => onVideo(movie)}
            key={_id}
          >
            <div className="crop-container">
              <img src={url} alt={title} className="card-img-top" />
            </div>
            <div className="card-body">
              <div className="card-title myTitle" style={{ fontSize: "22px" }}>
                {title}{" "}
                <span style={{ color: "#AAAAAA", fontSize: "14px" }}>
                  :{contentType.name}
                </span>
              </div>
              <div className="card-text" style={{ color: "#AAAAAA" }}>
                Released Year: {year}
                <br />
                Rating : {rating}
                <br />
                Genres: <span style={{ color: "#6e00ff" }}>{genre.name}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MoviesCardView;
