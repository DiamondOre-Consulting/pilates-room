import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api/v1'

const userAxiosInstance =  axios.create();
userAxiosInstance.defaults.baseURL =BASE_URL;
userAxiosInstance.defaults.withCredentials = true

export default userAxiosInstance;