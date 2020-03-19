const env = process.env || {};

const config = {
  API_URL: env.API_URL || "http://localhost:3001/api/v1/"
};

export default config;