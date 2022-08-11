import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`} style={{ textDecoration: "none" }}>
          {movie.title}
        </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onClick={() => {
            this.props.onLike(movie);
          }}
        />
      ),
    },
  ];

  constructor() {
    super();
    this.addDeleteButton(auth.getCurrentUser());
  }

  addDeleteButton = (user) => {
    if (user && user.isAdmin) {
      const deleteButton = {
        key: "delete",
        content: (movie) => (
          <button
            onClick={() => {
              this.props.onDelete(movie);
            }}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        ),
      };
      this.columns.push(deleteButton);
    }
  };

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
