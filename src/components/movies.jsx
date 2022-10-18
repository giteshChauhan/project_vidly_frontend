import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

import { deleteMovie, getMovies } from "../services/movieService";
import { updateWatchLater } from "../services/watchLaterService";
import { getContentType } from "../services/contentTypeService";
import { getCinema } from "../services/cinemaService";
import { getGenres } from "../services/genreService";

import auth from "../services/authService";
import { paginate } from "../utils/paginate";

import CardPlaceHolder from "./common/cardPlaceholder";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import Dropdown from "./common/dropdown";

import MoviesCardView from "./moviesCardView";
import MoviesTable from "./moviesTable";
import VideoModal from "./videoModal";

import listview_icon from "../icons/listview_icon.png";
import cardview_icon from "../icons/cardview_icon.png";
import filter_icon from "../icons/filter_icon.png";

const user = auth.getCurrentUser();

class Movies extends Component {
  state = {
    isMovies: true,
    isList: false,
    isContents: false,
    movies: [],
    genres: [],
    contentType: [],
    cinema: [],
    videoModal: {
      isOpen: false,
      movie: {},
    },
    sortItems: [
      { name: "Sort by title", _id: 0 },
      { name: "Sort by rating", _id: 1 },
      { name: "Sort by year", _id: 2 },
    ],
    viewType: [
      { name: "Card View", _id: 0, imgSrc: cardview_icon },
      { name: "List View", _id: 1, imgSrc: listview_icon },
    ],
    pageSize: 64,
    currentPage: 1,
    selectedGenre: { name: "All Genres" },
    selectedContent: { name: "All Content" },
    selectedCinema: { name: "All Cinema" },
    selectedSort: { name: "Sort by title" },
    selectedViewType: { name: "Card View" },
    sortColumn: { path: "title", order: "desc" },
  };

  async componentDidMount() {
    document.title = "VIDLY | Home";
    const { data: movies } = await getMovies();
    this.setState({ movies, isMovies: false });
    const { data: genresO } = await getGenres();
    const genres = [{ name: "All Genres", _id: 0 }, ...genresO];
    this.setState({ genres });
    const { data: cinemaO } = await getCinema();
    const cinema = [{ name: "All Cinema", _id: 0 }, ...cinemaO];
    this.setState({ cinema });
    const { data: content } = await getContentType();
    const contentType = [{ name: "All Content", _id: 0 }, ...content];
    this.setState({ contentType, isContents: true });
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
      toast.error("Invalid email");
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

  handleViewTypeSelect = (viewType) => {
    const { _id: id } = viewType;
    this.setState({ selectedViewType: viewType });
    if (id) {
      this.setState({ isList: true });
    } else this.setState({ isList: false });
  };

  handleSortSelected = (sort) => {
    this.setState({ selectedSort: sort });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
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

  handleFiltersComponent = () => {
    const {
      genres,
      cinema,
      contentType,
      selectedGenre,
      selectedCinema,
      selectedContent,
    } = this.state;
    return (
      <>
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
      </>
    );
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      selectedCinema,
      selectedContent,
      sortColumn,
    } = this.state;

    const { selectedQuery, searchQuery } = this.props;

    let filtered = allMovies;
    let queryTitle = selectedQuery.name;

    if (searchQuery && queryTitle === "by title")
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    if (searchQuery && queryTitle === "by rating")
      filtered = filtered.filter((m) => m.rating >= parseFloat(searchQuery));
    if (searchQuery && queryTitle === "by year")
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
      isMovies,
      isList,
      isContents,
      pageSize,
      currentPage,
      genres,
      cinema,
      viewType,
      contentType,
      sortItems,
      selectedGenre,
      selectedCinema,
      selectedViewType,
      selectedContent,
      selectedSort,
      sortColumn,
    } = this.state;

    const { totalCount, data: movies } = this.getPagedData();
    const { isOpen: openVideo, movie } = this.state.videoModal;
    let dummyArray = [];
    for (let i = 0; i < 32; i++) {
      dummyArray.push(i);
    }

    return (
      <>
        <div className="input-group" style={{ marginTop: "-38px" }}>
          {!isList && isContents && (
            <Dropdown
              items={sortItems}
              sortColumn={sortColumn}
              selectedItem={selectedSort}
              onSort={this.handleSort}
              onItemSelect={this.handleSortSelected}
              dropdownMenuId={"watchLaterSort"}
              isSortIcon={true}
            />
          )}
          {!isList && isContents && (
            <div
              className="myDropdownBtn"
              style={{ backgroundColor: "#181818", border: "none" }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <img
                src={filter_icon}
                alt=":"
                style={{ height: "24px", marginRight: "2px" }}
              />
              Filters
            </div>
          )}
          {isContents && (
            <Dropdown
              items={viewType}
              selectedItem={selectedViewType}
              onItemSelect={this.handleViewTypeSelect}
              dropdownMenuId={"myImgDropdown"}
              areImages={true}
            />
          )}
        </div>
        <div>
          {user && user.isAdmin && isContents && (
            <>
              <Link
                className="btn btn-primary"
                style={{ marginRight: "15px", background: "#6e00ff" }}
                to={"/movies/new"}
              >
                New Movie
              </Link>
              <Link
                className="btn btn-primary"
                style={{ margin: "5px 0px", background: "#6e00ff" }}
                to={"/genres"}
              >
                Edit Genres
              </Link>
            </>
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
                {this.handleFiltersComponent()}
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
            {isContents ? (
              <div className="collapse" id="collapseExample">
                <div className="myModal" id="moviesDropdownCardview">
                  {this.handleFiltersComponent()}
                </div>
              </div>
            ) : (
              <div style={{ marginTop: "-5px" }}>
                <p
                  className="placeholder-wave"
                  style={{ width: "30%", marginBottom: "5px" }}
                >
                  <span
                    className="placeholder"
                    style={{ width: "100%" }}
                  ></span>
                </p>
              </div>
            )}

            {movies.length === 0 && isMovies ? (
              <>
                <p
                  className="placeholder-wave"
                  style={{ width: "15%", marginBottom: "15px" }}
                >
                  <span
                    className="placeholder"
                    style={{ width: "100%" }}
                  ></span>
                </p>
                <div className="row">
                  {dummyArray.map((value) => (
                    <CardPlaceHolder key={value} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <p>Showing {totalCount} Top Tier Movies.</p>
                <MoviesCardView
                  movies={movies}
                  onVideo={this.handleVideoModal}
                  onAdd={this.handleAddMovie}
                />
              </>
            )}
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
