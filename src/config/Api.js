import axios from "axios";

// define base_url
export const API_URL = "";
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
