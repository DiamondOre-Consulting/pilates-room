import axios from "axios";

const BASE_URL = 'http://localhost:8000/api/v1'

const adminAxiosInstance =  axios.create();
adminAxiosInstance.defaults.baseURL =BASE_URL;
adminAxiosInstance.defaults.withCredentials = true

export default adminAxiosInstance;