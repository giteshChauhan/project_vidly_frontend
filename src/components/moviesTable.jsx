import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import auth from "../services/authService";

import ConfirmModal from "./common/confirmModal";
import Table from "./common/table";
import VideoModal from "./videoModal";

import add_enable from "../icons/add_enable.png";
import add_disable from "../icons/add_disable.png";
import delete_icon from "../icons/delete.png";
import edit_icon from "../icons/edit_icon.png";

class MoviesTable extends Component {
  state = {
    confirmModal: {
      isOpen: false,
      title: "",
      body: "",
      confirmStyle: "",
      confirmText: "",
      data: {},
    },
    videoModal: {
      isOpen: false,
      movie: {},
    },
  };
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <div className="myTitle" onClick={() => this.handleVideoModal(movie)}>
          {movie.title}
        </div>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "year", label: "Year" },
    { path: "rating", label: "IMDb" },
  ];

  constructor() {
    super();
    const user = auth.getCurrentUser();
    this.addDeleteButton(user);
    this.addAddButton(user);
    this.addEditButton(user);
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

  addEditButton = (user) => {
    if (user && user.isAdmin) {
      const editButton = {
        key: "edit",
        content: (movie) => (
          <Link to={`/movies/${movie._id}`} style={{ textDecoration: "none" }}>
            <img src={edit_icon} className="myImg" alt={movie.title} />
          </Link>
        ),
      };
      this.columns.push(editButton);
    }
  };

  addDeleteButton = (user) => {
    if (user && user.isAdmin) {
      this.columns.push({
        key: "delete",
        content: (movie) => (
          <img
            src={delete_icon}
            alt="Delete"
            className="myImg"
            onClick={() => this.handleConfirmModal(movie)}
          />
        ),
      });
    }
  };

  handleCloseModal = () => {
    const confirmModal = {
      isOpen: false,
    };
    this.setState({ confirmModal });
  };

  handleConfirmModal = (movie) => {
    const confirmModal = {
      isOpen: true,
      title: "Delete Movie",
      body: `Sure you want to delete ${movie.title}?`,
      confirmStyle: "btn btn-danger",
      confirmText: "Delete",
      data: movie,
    };
    this.setState({ confirmModal });
  };

  handleClose = () => {
    const videoModal = {
      isOpen: false,
    };
    this.setState({ videoModal });
  };

  handleVideoModal = (movie) => {
    const videoModal = {
      isOpen: true,
      movie,
    };
    this.setState({ videoModal });
  };

  render() {
    const { movies, onSort, sortColumn } = this.props;
    const { title, isOpen, body, confirmStyle, confirmText, data } =
      this.state.confirmModal;
    const { isOpen: openVideo, movie } = this.state.videoModal;

    return (
      <>
        <Table
          columns={this.columns}
          data={movies}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <ConfirmModal
          isOpen={isOpen}
          title={title}
          body={body}
          confirmStyle={confirmStyle}
          confirmText={confirmText}
          onConfirm={() => this.props.onDelete(data)}
          onCloseModal={this.handleCloseModal}
        />
        <VideoModal
          isOpen={openVideo}
          onClose={this.handleClose}
          movie={movie}
        />
      </>
    );
  }
}

export default MoviesTable;
