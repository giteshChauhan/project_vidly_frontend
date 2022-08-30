import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteMovie, getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
// import auth from "../services/authService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ name: "All Genres", _id: 0 }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    let { movies } = this.state;
    const originalMovies = [...movies];
    try {
      movies = movies.filter((m) => m._id !== movie._id);
      this.setState({ movies });
      await deleteMovie(movie._id);
      toast.success(`${movie.title} deleted successfully`);
    } catch (error) {
      toast.error("Something failed");
      this.setState({ movies: originalMovies });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ selectedGenre: null, searchQuery: query, currentPage: 1 });
  };

  handleAddMovie = (movie) => {
    //const user = auth.getCurrentUser();
    // console.log(movie._id);
    toast.info(`Added ${movie.title}`);
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    const { user } = this.props;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
          {user && user.isAdmin && (
            <Link
              className="btn btn-primary"
              style={{ marginTop: "10px", background: "#6e00ff" }}
              to={"/genres"}
            >
              Edit Genres
            </Link>
          )}
        </div>
        <div className="col">
          {user && user.isAdmin && (
            <Link
              className="btn btn-primary"
              style={{ marginBottom: "10px", background: "#6e00ff" }}
              to={"/movies/new"}
            >
              New Movie
            </Link>
          )}
          <p>Showing {totalCount} Top Tier Movies.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            onAdd={this.handleAddMovie}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
