import _ from "lodash";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  deleteGenre,
  getGenres,
  addGenre,
  editGenre,
} from "../services/genreService";
import Table from "./common/table";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });
  const [name, setName] = useState("");
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
          <button
            onClick={() => {
              handleGenre(genre);
            }}
            className="btn btn-primary btn-sm"
          >
            Edit
          </button>
        </>
      ),
    },
    {
      key: "delete",
      content: (genre) => (
        <button
          onClick={() => {
            handleDelete(genre._id);
          }}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  async function getGenresData() {
    const { data } = await getGenres();
    setGenres(data);
  }

  useEffect(() => {
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
    } catch (ex) {
      if (ex.response && (ex.response.status === 404 || 400))
        toast.error(ex.response.data);
    }
  };

  const handleNewGenre = async () => {
    try {
      const { data: genre } = await addGenre({ name: name });
      let originalGenres = [...genres];
      originalGenres.push(genre);
      setGenres(originalGenres);
      setName("");
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data);
    }
  };

  const handleDelete = async (genreId) => {
    const originalGenres = [...genres];
    setGenres(originalGenres.filter((g) => g._id !== genreId));

    try {
      await deleteGenre(genreId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This genre has already been deleted");
      setGenres(originalGenres);
    }
  };

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
              className="btn btn-primary btn-sm"
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
    </>
  );
};

export default Genres;
