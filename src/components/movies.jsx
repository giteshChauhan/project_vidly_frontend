import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

import { deleteMovie, getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { getContentType } from "../services/contentTypeService";
import { getCinema } from "../services/cinemaService";
// import auth from "../services/authService";
import { paginate } from "../utils/paginate";

import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import Dropdown from "./common/dropdown";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    contentType: [],
    cinema: [],
    queries: [
      { name: "By title", _id: 0 },
      { name: "By rating", _id: 1 },
      { name: "By year", _id: 2 },
    ],
    pageSize: 8,
    currentPage: 1,
    selectedGenre: { name: "All Genres" },
    selectedContent: { name: "All Content" },
    selectedCinema: { name: "All Cinema" },
    selectedQuery: { name: "By title" },
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    document.title = "VIDLY | Home";
    const { data } = await getGenres();
    const genres = [{ name: "All Genres", _id: 0 }, ...data];
    const { data: movies } = await getMovies();
    const { data: c } = await getCinema();
    const cinema = [{ name: "All Cinema", _id: 0 }, ...c];
    const { data: ct } = await getContentType();
    const contentType = [{ name: "All Content", _id: 0 }, ...ct];
    this.setState({ movies, genres, cinema, contentType });
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

  handleContentSelect = (content) => {
    this.setState({
      selectedContent: content,
      searchQuery: "",
      currentPage: 1,
    });
  };

  handleCinemaSelect = (cinema) => {
    this.setState({ selectedCinema: cinema, searchQuery: "", currentPage: 1 });
  };

  handleQuerySelect = (query) => {
    this.setState({ selectedQuery: query, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
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
      selectedCinema,
      selectedContent,
      selectedQuery,
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    let queryTitle = selectedQuery.name;

    if (searchQuery && queryTitle === "By title")
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    if (searchQuery && queryTitle === "By rating")
      filtered = filtered.filter((m) => m.rating === parseFloat(searchQuery));
    if (searchQuery && queryTitle === "By year")
      filtered = filtered.filter((m) => m.year === parseInt(searchQuery));
    if (selectedGenre && selectedGenre._id)
      filtered = filtered.filter((m) => m.genre._id === selectedGenre._id);
    if (selectedContent && selectedContent._id)
      filtered = filtered.filter(
        (m) => m.contentType._id === selectedContent._id
      );
    if (selectedCinema && selectedCinema._id)
      filtered = filtered.filter((m) => m.cinema._id === selectedCinema._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      genres,
      cinema,
      contentType,
      queries,
      selectedGenre,
      selectedCinema,
      selectedContent,
      selectedQuery,
      sortColumn,
      searchQuery,
    } = this.state;
    const { user } = this.props;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row myListModal">
        <div
          className="col-2"
          style={{ marginRight: "5px" }}
          id="moviesFilterListGroup"
        >
          <h6 style={{ color: "rgb(130 142 153)", marginLeft: "30px" }}>
            Filter By :
          </h6>
          <div className="m-2 myListModal">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="m-2 myListModal">
            <ListGroup
              items={contentType}
              selectedItem={selectedContent}
              onItemSelect={this.handleContentSelect}
            />
          </div>
          <div className="m-2 myListModal">
            <ListGroup
              items={cinema}
              selectedItem={selectedCinema}
              onItemSelect={this.handleCinemaSelect}
            />
          </div>
        </div>
        <div className="col">
          {user && user.isAdmin && (
            <Link
              className="btn btn-primary"
              style={{ marginRight: "15px", background: "#6e00ff" }}
              to={"/movies/new"}
            >
              New Movie
            </Link>
          )}
          {user && user.isAdmin && (
            <Link
              className="btn btn-primary"
              style={{ margin: "5px 0px", background: "#6e00ff" }}
              to={"/genres"}
            >
              Edit Genres
            </Link>
          )}
          <div className="myModal" id="moviesFilterDropdown">
            <h6
              style={{ color: "rgb(130 142 153)", marginTop: "2px" }}
              id="myFilterBy"
            >
              Filter By :
            </h6>
            <Dropdown
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
            <Dropdown
              items={contentType}
              selectedItem={selectedContent}
              onItemSelect={this.handleContentSelect}
            />
            <Dropdown
              items={cinema}
              selectedItem={selectedCinema}
              onItemSelect={this.handleCinemaSelect}
            />
          </div>
          <p>Showing {totalCount} Top Tier Movies.</p>
          <div className="input-group">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <Dropdown
              items={queries}
              selectedItem={selectedQuery}
              onItemSelect={this.handleQuerySelect}
              btnClass={"dropdown-toggle myListGroupDropdown"}
              dropdownMenuId={"myListGroupDropdownMenu"}
            />
          </div>
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
