import movieLogo from "../icons/PV.png";

const separateId = (id) => {
  const firstIndex = id.search("e") + 2;
  const lastIndex = id.lastIndexOf();
  return id.slice(firstIndex, lastIndex);
};

const Movie = ({ data, onMovieSelected }) => {
  return data.map((movie) => {
    const { id, title, year, image, titleType } = movie;
    const newId = separateId(id);
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
        onClick={() => onMovieSelected({ newId, title, year, url })}
        key={newId}
      >
        <div className="crop-container">
          <img src={url} alt={title} className="card-img-top" />
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {newId}, {year}, {titleType}
          </p>
        </div>
      </div>
    );
  });
};

export default Movie;
