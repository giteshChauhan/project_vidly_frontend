import movieLogo from "../icons/PV.png";

const Movie = ({ data }) => {
  return data.map(({ title, ratings }) => {
    let url = "";
    try {
      url = title.image.url;
    } catch (error) {
      url = movieLogo;
    }
    return (
      <div
        className="card"
        style={{
          width: "18rem",
          margin: "3px",
          boxShadow: "0 0  1px 1px #6e00ff",
        }}
        key={title.id}
      >
        <div className="crop-container">
          <img src={url} alt={title.title} className="card-img-top" />
        </div>
        <div className="card-body">
          <h5 className="card-title">{title.title}</h5>
          <p className="card-text">
            {title.id}, {title.year}, {ratings.rating}
          </p>
        </div>
      </div>
    );
  });
};

export default Movie;
