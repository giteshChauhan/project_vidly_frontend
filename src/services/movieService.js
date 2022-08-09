import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiUrl + "/movies/";
const auth_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmE3MDM0NzM0YzM0MWQ5MzQ0ZTdkMmQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NTUxMTI2MTV9.cPdtfBbrAd_FKzIA1lBkS01UVX-25IhTDt3CUdjHfCg";

export function getMovies() {
  return http.get(apiEndPoint, {
    headers: {
      "x-auth-token": auth_token,
    },
  });
}

export function getMovie(id) {
  return http.get(apiEndPoint + id, {
    headers: {
      "x-auth-token": auth_token,
    },
  });
}

export function saveMovie(movie, movieId) {
  if (movieId === "new") {
    return http.post(apiEndPoint, movie, {
      headers: {
        "x-auth-token": auth_token,
      },
    });
  }

  return http.put(apiEndPoint + movieId, movie, {
    headers: {
      "x-auth-token": auth_token,
    },
  });
}

export function deleteMovie(id) {
  return http.delete(apiEndPoint + id, {
    headers: {
      "x-auth-token": auth_token,
    },
  });
}
