import axios from "axios";
const BASE_URL = "https://www.taleb_restaurant_api.onrender.com/";
const myAxios = axios.create({
  baseURL: BASE_URL,
});
export default myAxios;
