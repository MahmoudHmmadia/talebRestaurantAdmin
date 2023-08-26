import axios from "axios";
const BASE_URL = "https://taleb-restaurant-api.onrender.com";
const LOCAL_URL = "http://localhost:3500";
const myAxios = axios.create({
  baseURL: BASE_URL,
});
export default myAxios;
