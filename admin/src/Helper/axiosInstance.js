import axios from "axios";
import { toast } from "sonner";

const BASE_URL = "http://localhost:8000/api/v1";

const adminAxiosInstance = axios.create();
adminAxiosInstance.defaults.baseURL = BASE_URL;
adminAxiosInstance.defaults.withCredentials = true;
// console.log("1");
adminAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("first response for the admin axios  instance ");
    const originalRequest = error.config;
    console.log(error?.response);
    console.log(error?.response?.data?.message);
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Invalid Access Token"
    ) {
      try {
        console.log(3);
        const { data } = await axios.get(`${BASE_URL}/admin/refresh-token`, {
          withCredentials: true,
        });
        console.log("api work after one minute");
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        console.error("Error refreshing token:", error);
        return Promise.reject(error);
      }
    } else {
      toast.error(error.response.data.message);
    }
  }
);

export default adminAxiosInstance;
