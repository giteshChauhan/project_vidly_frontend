import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/feedback/";
const token = auth.getJwt();

export function sendFeedback(feedback) {
  return http.post(apiEndpoint, feedback);
}

export function getFeedback() {
  return http.get(apiEndpoint, token);
}

export function getAllFeedbacks() {
  return http.get(`${apiEndpoint}/all`, token);
}
