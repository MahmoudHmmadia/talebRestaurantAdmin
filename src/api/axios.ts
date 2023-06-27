import axios from "axios";
const BASE_URL = "https://www.talebRestaurantApi.com/";
const myAxios = axios.create({
  baseURL: BASE_URL,
});
export default myAxios;
