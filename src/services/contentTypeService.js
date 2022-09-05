import http from "./httpService";
import auth from "./authService";

const apiEndPoint = "/contenttype/";
const token = auth.getJwt();

export function getContentType() {
  return http.get(apiEndPoint);
}

export function deleteContentType(id) {
  return http.delete(`${apiEndPoint}/${id}`, token);
}

export function addContentType(contentType) {
  return http.post(apiEndPoint, contentType, token);
}

export function editContentType(contentType) {
  return http.put(
    apiEndPoint + contentType._id,
    { name: contentType.name },
    token
  );
}
