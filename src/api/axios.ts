import axios from "axios";
const BASE_URL = "https://taleb-restaurant-api.onrender.com";
const myAxios = axios.create({
  baseURL: BASE_URL,
});
export default myAxios;
