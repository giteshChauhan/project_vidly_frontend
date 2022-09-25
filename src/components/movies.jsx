import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

import { deleteMovie } from "../services/movieService";
import { updateWatchLater } from "../services/watchLaterService";

import auth from "../services/authService";
import { paginate } from "../utils/paginate";

import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import Dropdown from "./common/dropdown";
import MoviesCardView from "./moviesCardView";
import MoviesTable from "./moviesTable";
import VideoModal from "./videoModal";

import listview_icon from "../icons/listview_icon.png";
import cardview_icon from "../icons/cardview_icon.png";

const user = auth.getCurrentUser();

class Movies extends Component {
  state = {
    isList: false,
    movies: [],
    genres: [],
    contentType: [],
    cinema: [],
    videoModal: {
      isOpen: false,
      movie: {},
    },
    queries: [
      { name: "Search by title", _id: 0 },
      { name: "Search by rating", _id: 1 },
      { name: "Search by year", _id: 2 },
    ],
    sortItems: [
      { name: "Sort by title", _id: 0 },
      { name: "Sort by rating", _id: 1 },
      { name: "Sort by year", _id: 2 },
    ],
    pageSize: 8,
    currentPage: 1,
    selectedGenre: { name: "All Genres" },
    selectedContent: { name: "All Content" },
    selectedCinema: { name: "All Cinema" },
    selectedQuery: { name: "Search by title" },
    selectedSort: { name: "Sort by title" },
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    document.title = "VIDLY | Home";
    const { movies, genres, cinema, contentType } = this.props;
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

  handleSortSelected = (sort) => {
    this.setState({ selectedSort: sort });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleAddMovie = async (movie) => {
    if (user) {
      try {
        await updateWatchLater({ movieId: movie._id });
        this.props.onAddWatchLater(movie);
        toast.success("Movie Added");
      } catch (err) {
        toast.info(`${err.response.data}`);
      }
    } else toast.info("Please login/register");
  };

  handleVideoModal = (movie) => {
    const videoModal = {
      isOpen: true,
      movie,
    };
    this.setState({ videoModal });
  };

  handleClose = () => {
    const videoModal = {
      isOpen: false,
    };
    this.setState({ videoModal });
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

    if (searchQuery && queryTitle === "Search by title")
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    if (searchQuery && queryTitle === "Search by rating")
      filtered = filtered.filter((m) => m.rating === parseFloat(searchQuery));
    if (searchQuery && queryTitle === "Search by year")
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
      isList,
      pageSize,
      currentPage,
      genres,
      cinema,
      contentType,
      queries,
      sortItems,
      selectedGenre,
      selectedCinema,
      selectedContent,
      selectedQuery,
      selectedSort,
      sortColumn,
      searchQuery,
    } = this.state;

    const { totalCount, data: movies } = this.getPagedData();
    const { isOpen: openVideo, movie } = this.state.videoModal;

    return (
      <>
        <SearchBox
          value={searchQuery}
          onChange={this.handleSearch}
          id={"moviesSearchBoxUp"}
        />
        <div className="input-group" id="moviesInputGroup">
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearch}
            id={"moviesSearchBox"}
          />
          <Dropdown
            items={queries}
            selectedItem={selectedQuery}
            onItemSelect={this.handleQuerySelect}
            btnClass={"dropdown-toggle myListGroupDropdown"}
            dropdownMenuId={"myListGroupDropdownMenu"}
          />
          <div className="divider" id="moviesSearchSortDivider" />
          {!isList && (
            <Dropdown
              items={sortItems}
              sortColumn={sortColumn}
              selectedItem={selectedSort}
              onSort={this.handleSort}
              onItemSelect={this.handleSortSelected}
              btnClass={"dropdown-toggle myListGroupDropdown"}
              dropdownMenuId={"myListGroupDropdownMenuSort"}
            />
          )}
          <img
            className="myImg hiddenImg"
            style={{ margin: "0 6px ", height: "47px" }}
            alt="card"
            onClick={() => this.setState({ isList: false })}
            src={cardview_icon}
          />
          <img
            className="myImg hiddenImg"
            style={{ height: "42px" }}
            alt="list"
            src={listview_icon}
            onClick={() => this.setState({ isList: true })}
          />
        </div>
        <div>
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
        </div>
        {isList ? (
          <div className="row">
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
              <MoviesTable
                movies={movies}
                sortColumn={sortColumn}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                onAdd={this.handleAddMovie}
                onVideo={this.handleVideoModal}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="myModal" id="moviesDropdownCardview">
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
            <MoviesCardView
              movies={movies}
              onVideo={this.handleVideoModal}
              onAdd={this.handleAddMovie}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        )}
        <VideoModal
          isOpen={openVideo}
          onClose={this.handleClose}
          movie={movie}
          onAdd={this.handleAddMovie}
        />
      </>
    );
  }
}

export default Movies;
