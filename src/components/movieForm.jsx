import { useNavigate, useParams } from "react-router-dom";

import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "./../services/genreService";

import VideosList from "./videosList";
import Form from "./common/form";
import SearchBox from "./common/searchBox";

import Joi from "joi-browser";
import axios from "axios";
import Videoplayer from "./common/videoPlayer";

class MovieFormComponent extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    searchTitle: "",
    videosMetaData: [],
    videoId: "",
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        this.props.navigate("/not-found", { replace: true });
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data, this.props.params.id);
    this.props.navigate("/movies", { replace: true });
  };

  handleSearchChange = (searchTitle) => {
    this.setState({ searchTitle });
  };

  handleSearch = async () => {
    const keyword = this.state.searchTitle;
    if (keyword) {
      const { data } = await axios.get(
        `/.netlify/functions/fetchYoutubeVideos?q=${keyword}`
      );
      const videosMetaData = data.items;
      this.setState({ videosMetaData });
    }
  };

  handleVideoSelection = (videoId) => {
    this.setState({ videoId });
  };

  render() {
    const { searchTitle, videosMetaData, genres, videoId } = this.state;

    return (
      <div className="container">
        <div className="row align-items-start">
          <div className="col">
            <h3>Movie Form</h3>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("title", "Title")}
              {this.renderSelect("genreId", "Genre", genres)}
              {this.renderInput("numberInStock", "Number in Stock")}
              {this.renderInput("dailyRentalRate", "Rate")}
              {this.renderButton("Save")}
            </form>
            {videoId && <Videoplayer videoId={videoId} />}
          </div>

          <div className="break"></div>

          <div className="col">
            <h3>Search Movies</h3>
            <div className="input-group">
              <SearchBox
                value={searchTitle}
                onChange={this.handleSearchChange}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                hidden={searchTitle === ""}
                style={{ padding: "2px", height: "38px" }}
                onClick={this.handleSearch}
              >
                Search
              </button>
            </div>
            {videosMetaData.length ? (
              <VideosList
                onVideoSelected={this.handleVideoSelection}
                data={videosMetaData}
              />
            ) : (
              <h6 style={{ color: "gray" }}>search to see results</h6>
            )}
          </div>
        </div>
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
