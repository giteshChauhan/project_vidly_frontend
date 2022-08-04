// MovieForm
import { useParams, useNavigate } from "react-router-dom";

const MovieForm = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <>
      <h1>Movies Form : {params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => navigate("/movies", { replace: true })}
      >
        Save
      </button>
    </>
  );
};

export default MovieForm;
