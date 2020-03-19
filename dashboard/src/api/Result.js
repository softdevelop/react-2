import reduxApi from "redux-api";
import customFetch from "./axios";
import config from "./config";

const rest = reduxApi({
  get: {
    url: "results",
    options: {
      method: "GET"
    }
  },
  getById: {
    url: "results/:id",
    options: {
      method: "GET"
    }
  },
  edit: {
    url: "results/:id",
    options: {
      method: "PUT"
    }
  },
  delete: {
    url: "results/:id",
    options: {
      method: "DELETE"
    }
  },
  add: {
    url: "results",
    options: {
      method: "POST"
    }
  }
})
  .use("fetch", customFetch)
  .use("rootUrl", config.API_URL);

export default rest;
