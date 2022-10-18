import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getContentType } from "./../services/contentTypeService";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "./../services/genreService";
import { getCinema } from "./../services/cinemaService";

import Videoplayer from "./common/videoPlayer";
import SearchBox from "./common/searchBox";
import MoviesList from "./moviesList";
import VideosList from "./videosList";
import Form from "./common/form";

import Joi from "joi-browser";
import axios from "axios";

class MovieFormComponent extends Form {
  state = {
    data: {
      title: "",
      thumbnailUrl: "",
      genreId: "",
      year: "",
      rating: "",
      yt_id: "",
      imdb_id: "",
      contentTypeId: "",
      cinemaId: "",
    },
    searchTitle: "",
    videosMetaData: [],
    videoId: "",
    moviesMetaData: [],
    movieTitle: "",
    movieCountry: "",
    genres: [],
    cinema: [],
    contentType: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    thumbnailUrl: Joi.string().required().label("Thumbanil Url"),
    genreId: Joi.string().required().label("Genre"),
    year: Joi.number().required().min(1950).max(2024).label("Year"),
    rating: Joi.number().required().min(0).max(10).label("IMDb"),
    yt_id: Joi.string().required().length(11).label("YT_ID"),
    imdb_id: Joi.string().required().min(9).max(10).label("IMDb_ID"),
    contentTypeId: Joi.string().required().label("ContentType"),
    cinemaId: Joi.string().required().label("Cinema"),
  };

  async componentDidMount() {
    document.title = "VIDLY | MovieForm";
    await this.populateGenres();
    await this.populateCinema();
    await this.populateContentType();
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

  async populateCinema() {
    const { data: cinema } = await getCinema();
    this.setState({ cinema });
  }

  async populateContentType() {
    const { data: contentType } = await getContentType();
    this.setState({ contentType });
  }

  mapToViewModel(movie) {
    return {
      title: movie.title,
      thumbnailUrl: movie.thumbnailUrl,
      genreId: movie.genre._id,
      year: movie.year,
      rating: movie.rating,
      yt_id: movie.yt_id,
      imdb_id: movie.imdb_id,
      contentTypeId: movie.contentType._id,
      cinemaId: movie.cinema._id,
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
    const {
      genreId,
      rating,
      contentTypeId,
      cinemaId,
      title,
      year,
      imdb_id,
      thumbnailUrl,
    } = this.state.data;
    const newData = {
      title,
      thumbnailUrl,
      genreId,
      year,
      rating,
      yt_id: videoId,
      imdb_id,
      contentTypeId,
      cinemaId,
    };
    this.setState({ videoId });
    this.setState({ data: newData });
  };

  handleMovieselection = (movie) => {
    const { genreId, rating, yt_id, contentTypeId, cinemaId } = this.state.data;
    const { title, year, url, newId } = movie;
    const newData = {
      title,
      thumbnailUrl: url,
      genreId,
      year,
      rating,
      yt_id,
      imdb_id: newId,
      contentTypeId,
      cinemaId,
    };
    this.setState({ data: newData });
  };

  handleMovieSearch = async () => {
    const { movieTitle, movieCountry } = this.state;
    const { data } = await axios.get(
      `/.netlify/functions/fetchMovies?title=${movieTitle}&country=${movieCountry}`
    );
    let moviesMetaData = data.results;
    if (moviesMetaData === undefined) {
      moviesMetaData = [];
      toast.error("Something failed.");
    }
    this.setState({ moviesMetaData });
  };

  render() {
    const {
      searchTitle,
      videosMetaData,
      genres,
      cinema,
      contentType,
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
              {this.renderInput("thumbnailUrl", "Thumbnail Url")}
              {this.renderSelect("genreId", "Genre", genres)}
              {this.renderSelect("contentTypeId", "ContentType", contentType)}
              {this.renderSelect("cinemaId", "Cinema", cinema)}
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
                <MoviesList
                  data={moviesMetaData}
                  onMovieSelected={this.handleMovieselection}
                />
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
