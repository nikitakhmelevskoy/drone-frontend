import axios from "axios";

const API_URL = import.meta.env.PROD
  ? "https://drone-backend-five.vercel.app/"
  : "http://localhost:3030/";

export const api = axios.create({
  baseURL: API_URL,
});
