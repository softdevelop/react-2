import axios from "axios";

export default function customFetch(url, options) {
  axios.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      return Promise.reject(error);
    }
  );
  return new Promise((resolve, reject) => {
    axios(url, options)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
