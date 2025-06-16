import axios from "axios";
import { toast } from "sonner";

// const BASE_URL = "http://localhost:8000/api/v1";
const BASE_URL = "https://pilates-room-backend.onrender.com/api/v1";
// const BASE_URL = "http://192.168.29.235:8000/api/v1";

const adminAxiosInstance = axios.create();
adminAxiosInstance.defaults.baseURL = BASE_URL;
adminAxiosInstance.defaults.withCredentials = true;
// console.log("1");
adminAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Invalid Access Token"
    ) {
      try {
        const { data } = await axios.get(`${BASE_URL}/admin/refresh-token`, {
          withCredentials: true,
        });
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      // toast.error(error.response.data.message);
      return Promise.reject(error);
    }
  }
);

export default adminAxiosInstance;
