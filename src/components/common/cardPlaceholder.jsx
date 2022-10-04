const CardPlaceHolder = () => {
  return (
    <div
      className="card"
      aria-hidden="true"
      style={{ width: "298px", padding: "0", margin: "15px" }}
    >
      <svg
        className="bd-placeholder-img card-img-top"
        width="100%"
        height="180"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#868e96"></rect>
      </svg>
      <div className="card-body">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-7"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-6"></span>
          <span className="placeholder col-8"></span>
        </p>
        <button
          className="btn btn-primary btn-sm disabled placeholder col-6"
          style={{ width: "100%", height: "20px", backgroundColor: "#6e00ff" }}
        />
      </div>
    </div>
  );
};

export default CardPlaceHolder;
