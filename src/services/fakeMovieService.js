import { getGenre } from "./fakeGenreService";

const movies = [
  {
    _id: "1",
    title: "Die Hard",
    genre: { _id: "3", name: "Thriller" },
    numberInStock: 5,
    dailyRentalRate: 1.5,
    liked: true,
  },
  {
    _id: "2",
    title: "Terminator",
    genre: { _id: "1", name: "Action" },
    numberInStock: 7,
    dailyRentalRate: 1,
  },
  {
    _id: "3",
    title: "Mirzapur",
    genre: { _id: "3", name: "Thriller" },
    numberInStock: 8,
    dailyRentalRate: 4.5,
  },
  {
    _id: "4",
    title: "Bhool Bhooliya",
    genre: { _id: "2", name: "Comedy" },
    numberInStock: 8,
    dailyRentalRate: 3.5,
  },
  {
    _id: "5",
    title: "KGF",
    genre: { _id: "1", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 4.5,
  },
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find((m) => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = getMovie(movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = getGenre(movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = (movies.length + 1).toString();
    movies.push(movieInDb);
  }

  return movieInDb;
}
