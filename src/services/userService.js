import http from "./httpService";

const apiEndPoint = "/users/";

export function register(user) {
  return http.post(apiEndPoint, user);
}
