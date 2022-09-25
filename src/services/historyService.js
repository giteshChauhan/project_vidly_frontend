import auth from "./authService";
import http from "./httpService";

const token = auth.getJwt();
const user = auth.getCurrentUser();
const apiEndPoint = "/history/";

export function getHistory() {
  return http.get(apiEndPoint, token);
}

export function addHistory(movieId) {
  if (user) return http.post(apiEndPoint, movieId, token);
}
