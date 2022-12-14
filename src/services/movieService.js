import http from "./httpService";

const apiEndPoint = "/movies/";

export function getMovies() {
  return http.get(apiEndPoint);
}

export function getMovie(id) {
  return http.get(apiEndPoint + id);
}

export function saveMovie(movie, movieId) {
  if (movieId === "new") {
    return http.post(apiEndPoint, movie);
  }

  return http.put(apiEndPoint + movieId, movie);
}

export function deleteMovie(id) {
  return http.delete(apiEndPoint + id);
}
