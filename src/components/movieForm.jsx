import { useNavigate, useParams, Navigate } from "react-router-dom";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "./../services/fakeGenreService";
import Form from "./common/form";
import Joi from "joi-browser";

class MovieFormComponent extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.number().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.params.id;
    if (movieId === "new") return;
    const movie = getMovie(movieId);
    if (!movie) return <Navigate to={"/not-found"} replace />;

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.navigate("/movies", { replace: true });
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

const MovieForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  return <MovieFormComponent navigate={navigate} params={params} />;
};

export default MovieForm;
