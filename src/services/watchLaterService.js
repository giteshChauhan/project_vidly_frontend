import http from "./httpService";
import auth from "./authService";

const apiEndPoint = "/watchLater/";
const token = auth.getJwt();

export function getWatchLater() {
  return http.get(apiEndPoint, token);
}

export function updateWatchLater(movieId) {
  return http.post(apiEndPoint, movieId, token);
}

export function removeWatchLater(movieId) {
  return http.delete(apiEndPoint + movieId, token);
}
