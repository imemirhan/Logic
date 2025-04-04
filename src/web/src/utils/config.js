import process from "process";

const config = {
  API_URL: "https://localhost:5099/api",
  TIMEOUT: parseInt(process.env.REACT_APP_TIMEOUT, 10) || 5000,
};
export default config;