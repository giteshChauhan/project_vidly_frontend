import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiUrl + "/genres/";
const auth_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmE3MDM0NzM0YzM0MWQ5MzQ0ZTdkMmQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NTUxMTI2MTV9.cPdtfBbrAd_FKzIA1lBkS01UVX-25IhTDt3CUdjHfCg";

export function getGenres() {
  return http.get(apiEndPoint, {
    headers: {
      "x-auth-token": auth_token,
    },
  });
}
