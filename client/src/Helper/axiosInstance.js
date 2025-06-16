import axios from "axios";
import { toast } from "sonner";

// https://pilates-room-backend.onrender.com
const BASE_URL = "http://localhost:8000/api/v1";
// const BASE_URL = 'https://pilates-room-backend.onrender.com/api/v1'
// http://localhost:8000/api/v1

const userAxiosInstance = axios.create();
userAxiosInstance.defaults.baseURL = BASE_URL;
userAxiosInstance.defaults.withCredentials = true;

userAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Invalid Access Token"
    ) {
      try {
        const { data } = await axios.get(`${BASE_URL}/user/refresh-token`, {
          withCredentials: true,
        });
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      toast.error(error.response.data.message);
      return Promise.reject(error);
    }
  }
);

export default userAxiosInstance;
