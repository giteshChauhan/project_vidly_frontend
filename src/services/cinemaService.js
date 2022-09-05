import http from "./httpService";
import auth from "./authService";

const apiEndPoint = "/cinema/";
const token = auth.getJwt();

export function getCinema() {
  return http.get(apiEndPoint);
}

export function deleteCinema(id) {
  return http.delete(`${apiEndPoint}/${id}`, token);
}

export function addCinema(cinema) {
  return http.post(apiEndPoint, cinema, token);
}

export function editCinema(cinema) {
  return http.put(apiEndPoint + cinema._id, { name: cinema.name }, token);
}
