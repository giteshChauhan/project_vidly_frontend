import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "./../services/genreService";

import MoviesList from "./moviesList";
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
      year: "",
      rating: "",
      yt_id: "",
      imdb_id: "",
    },
    searchTitle: "",
    videosMetaData: [],
    videoId: "",
    moviesMetaData: [],
    movieTitle: "",
    movieCountry: "",
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    year: Joi.number().required().min(1950).max(2024).label("Year"),
    rating: Joi.number().required().min(0).max(10).label("IMDb"),
    yt_id: Joi.string().required().length(11).label("YT_ID"),
    imdb_id: Joi.string().required().min(9).max(10).label("IMDb_ID"),
  };

  async componentDidMount() {
    document.title = "VIDLY | MovieForm";
    await this.populateGenres();
    await this.populateMovie();
  }

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

  mapToViewModel(movie) {
    return {
      title: movie.title,
      genreId: movie.genre._id,
      year: movie.year,
      rating: movie.rating,
      yt_id: movie.yt_id,
      imdb_id: movie.imdb_id,
    };
  }

  doSubmit = async () => {
    const { data } = this.state;
    await saveMovie(data, this.props.params.id);
    this.props.navigate("/movies", { replace: true });
    toast.success(`${data.title} added to db`);
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

  handleMovieSearch = async () => {
    const { movieTitle, movieCountry } = this.state;
    const { data } = await axios.get(
      `/.netlify/functions/fetchMovies?title=${movieTitle}&country=${movieCountry}`
    );
    const moviesMetaData = data.results;
    this.setState({ moviesMetaData });
  };

  render() {
    const {
      searchTitle,
      videosMetaData,
      genres,
      videoId,
      movieTitle,
      movieCountry,
      moviesMetaData,
    } = this.state;

    return (
      <div className="container">
        <div className="row align-items-start">
          <div className="col">
            <h3>Movie Form</h3>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("title", "Title")}
              {this.renderSelect("genreId", "Genre", genres)}
              {this.renderInput("year", "Year")}
              {this.renderInput("rating", "IMDb")}
              {this.renderInput("yt_id", "YT_ID")}
              {this.renderInput("imdb_id", "IMDb_ID")}
              {this.renderButton("Save")}
            </form>
            {videoId && <Videoplayer videoId={videoId} />}
          </div>

          <div className="break"></div>

          <div className="col">
            <div>
              <h3>Search Movies</h3>
              <div className="input-group">
                <input
                  className="form-control"
                  name="query"
                  type="text"
                  style={{ marginBottom: 10 }}
                  placeholder="title..."
                  onChange={(event) =>
                    this.setState({ movieTitle: event.target.value })
                  }
                />
                <input
                  className="form-control"
                  name="query"
                  type="text"
                  style={{ marginBottom: 10 }}
                  placeholder="country..."
                  onChange={(event) =>
                    this.setState({ movieCountry: event.target.value })
                  }
                  title="in|us|fr. Separated by comma for multiple options. Ex : us,fr,…"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  hidden={(movieTitle && movieCountry) === ""}
                  style={{ padding: "2px", height: "38px" }}
                  onClick={this.handleMovieSearch}
                >
                  Search
                </button>
              </div>
              {moviesMetaData.length ? (
                <MoviesList data={moviesMetaData} />
              ) : (
                <h6 style={{ color: "gray" }}>search to see movies</h6>
              )}
            </div>

            <hr style={{ color: "gray" }} />

            <div>
              <h3>Search Videos</h3>
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
                <h6 style={{ color: "gray" }}>search to see videos</h6>
              )}
            </div>
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
