import axios from "axios";

// https://pilates-room-backend.onrender.com
const BASE_URL = "http://localhost:8000/api/v1";
// const BASE_URL = 'https://pilates-room-backend.onrender.com/api/v1'
// http://localhost:8000/api/v1

const userAxiosInstance = axios.create();
userAxiosInstance.defaults.baseURL = BASE_URL;
userAxiosInstance.defaults.withCredentials = true;

export default userAxiosInstance;
