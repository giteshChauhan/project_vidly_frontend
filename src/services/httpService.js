import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

const herokuServices = axios.create({ baseURL: process.env.REACT_APP_API_URL });

herokuServices.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occured.");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  herokuServices.defaults.headers.common["x-auth-token"] = jwt;
}

const http = {
  get: herokuServices.get,
  post: herokuServices.post,
  put: herokuServices.put,
  delete: herokuServices.delete,
  setJwt,
};

export default http;
