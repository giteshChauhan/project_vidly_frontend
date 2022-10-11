import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";

import delete_icon from "../icons/delete.png";
import edit_icon from "../icons/edit_icon.png";

import {
  deleteGenre,
  getGenres,
  addGenre,
  editGenre,
} from "../services/genreService";

import ConfirmModal from "./common/confirmModal";
import Table from "./common/table";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });
  const [name, setName] = useState("");
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    body: "",
    confirmStyle: "",
    confirmText: "",
    data: {},
  });
  const columns = [
    { path: "name", label: "Name" },
    {
      key: "edit",
      content: (genre) => (
        <>
          <input
            type="text"
            className="form-control"
            style={{ marginBottom: "10px" }}
            placeholder={genre.name}
            onChange={(e) => (genre.name = e.target.value)}
          />
          <img
            onClick={() => {
              handleGenre(genre);
            }}
            className="myImg"
            src={edit_icon}
            alt="Edit"
          />
        </>
      ),
    },
    {
      key: "delete",
      content: (genre) => (
        <img
          src={delete_icon}
          onClick={() => {
            handleConfirmModal(genre);
          }}
          className="myImg"
          alt="Delete"
        />
      ),
    },
  ];

  async function getGenresData() {
    const { data } = await getGenres();
    setGenres(data);
  }

  useEffect(() => {
    document.title = "VIDLY | Genres";
    getGenresData();
  }, []);

  const getPagedData = () => {
    const sortedGenres = _.orderBy(
      genres,
      [sortColumn.path],
      [sortColumn.order]
    );
    return sortedGenres;
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handleGenre = async (genre) => {
    try {
      const originalGenres = [...genres];
      const index = originalGenres.findIndex((g) => g._id === genre._id);
      originalGenres[index].name = genre.name;
      setGenres(originalGenres);
      await editGenre(genre);
      toast.dark("✔️ Genre edited successfully");
    } catch (ex) {
      if (ex.response && (ex.response.status === 404 || 400))
        toast.dark(`❗❗ ${ex.response.data}`);
    }
  };

  const handleNewGenre = async () => {
    try {
      const { data: genre } = await addGenre({ name: name });
      toast.dark(`✔️ ${genre.name} added sucessfully`);
      let originalGenres = [...genres];
      originalGenres.push(genre);
      setGenres(originalGenres);
      setName("");
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.dark(`❗❗ ${ex.response.data}`);
    }
  };

  const handleCloseModal = () => {
    const confirmModal = {
      isOpen: false,
    };
    setConfirmModal(confirmModal);
  };

  const handleConfirmModal = (genre) => {
    const confirmModal = {
      isOpen: true,
      title: "Delete Genre",
      body: `Sure you want to delete ${genre.name}?`,
      confirmStyle: "btn btn-danger",
      confirmText: "Delete",
      data: genre,
    };
    setConfirmModal(confirmModal);
  };

  const handleDelete = async (genre) => {
    const originalGenres = [...genres];
    setGenres(originalGenres.filter((g) => g._id !== genre._id));

    try {
      await deleteGenre(genre._id);
      toast.dark(`✔️ ${genre.name} deleted sucessfully`);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.dark("❗❗ This genre has already been deleted");
      setGenres(originalGenres);
    }
  };

  const { title, isOpen, body, confirmStyle, confirmText, data } = confirmModal;

  return (
    <>
      <div className="row">
        <div className="col-2">
          <>
            <h1>Genres</h1>
            <input
              className="form-control"
              placeholder="Add new genre"
              style={{ marginBottom: "10px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="btn btn-primary"
              style={{ background: "#6e00ff" }}
              onClick={() => handleNewGenre()}
              disabled={name === ""}
            >
              Add
            </button>
          </>
        </div>
        <div className="col">
          <Table
            data={getPagedData()}
            sortColumn={sortColumn}
            onSort={handleSort}
            columns={columns}
          />
        </div>
      </div>
      <ConfirmModal
        isOpen={isOpen}
        title={title}
        body={body}
        confirmStyle={confirmStyle}
        confirmText={confirmText}
        onConfirm={() => handleDelete(data)}
        onCloseModal={handleCloseModal}
      />
    </>
  );
};

export default Genres;
