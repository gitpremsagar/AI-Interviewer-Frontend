import axios from "axios";
import { API_ENDPOINT_FOR_USER } from "@/lib/constants";

async function refreshAccessToken() {
  try {
    await axios.post(`${API_ENDPOINT_FOR_USER}/refresh-access-token`, {
      withCredentials: true,
    });
    return "refreshed";
  } catch (error: any) {
    console.log(error);
    return "error";
  }
}

// Create a custom axios instance
const customAxios = axios.create();
customAxios.defaults.withCredentials = true;
customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const result = await refreshAccessToken();
      if (result === "refreshed") {
        return customAxios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default customAxios;
