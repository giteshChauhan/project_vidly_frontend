import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";
import add_enable from "../icons/add_enable.png";
import add_disable from "../icons/add_disable.png";
import delete_icon from "../icons/delete.png";
import { toast } from "react-toastify";

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
    this.addAddButton(auth.getCurrentUser());
  }

  addButton = (isDisable = true) => {
    return isDisable
      ? {
          key: "add",
          content: () => (
            <img
              className="myImg"
              onClick={() => toast.info("Please Login/Register 😊")}
              alt="Add"
              src={add_disable}
            />
          ),
        }
      : {
          key: "add",
          content: (movie) => (
            <img
              className="myImg"
              onClick={() => {
                this.props.onAdd(movie);
              }}
              alt="Add"
              src={add_enable}
            />
          ),
        };
  };

  addAddButton = (user) => {
    if (user) {
      this.columns.push(this.addButton(false));
    } else {
      this.columns.push(this.addButton());
    }
  };

  addDeleteButton = (user) => {
    if (user && user.isAdmin) {
      const deleteButton = {
        key: "delete",
        content: (movie) => (
          <img
            onClick={() => {
              this.props.onDelete(movie);
            }}
            src={delete_icon}
            alt="Delete"
            className="myImg"
          />
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
