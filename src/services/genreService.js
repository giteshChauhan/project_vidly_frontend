import http from "./httpService";
import auth from "./authService";

const apiEndPoint = "/genres/";
const token = auth.getJwt();

export function getGenres() {
  return http.get(apiEndPoint);
}

export function deleteGenre(id) {
  return http.delete(`${apiEndPoint}/${id}`, token);
}

export function addGenre(genre) {
  return http.post(apiEndPoint, genre, token);
}

export function editGenre(genre) {
  return http.put(apiEndPoint + genre._id, { name: genre.name }, token);
}
