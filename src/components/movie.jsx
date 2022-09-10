import movieLogo from "../icons/PV.png";

const Movie = ({ data }) => {
  return data.map(({ id, title, year, image, titleType }) => {
    let url = "";
    try {
      url = image.url;
    } catch (error) {
      url = movieLogo;
    }
    return (
      <div
        className="card"
        style={{
          width: "18rem",
          margin: "3px",
        }}
        key={id}
      >
        <div className="crop-container">
          <img src={url} alt={title} className="card-img-top" />
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {id}, {year}, {titleType}
          </p>
        </div>
      </div>
    );
  });
};

export default Movie;
