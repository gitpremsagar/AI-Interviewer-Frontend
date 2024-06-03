import axios from "axios";
import { API_ENDPOINT_FOR_USER } from "@/lib/constants";

async function refreshAccessToken() {
  axios.defaults.withCredentials = true;
  try {
    await axios.post(`${API_ENDPOINT_FOR_USER}/refresh-access-token`);
    return {
      status: "refreshed",
    };
  } catch (error: any) {
    // console.log("refresh token error = ", error);
    if (
      error.response?.data?.message === "Refresh Token expired" ||
      error.response?.data?.message === "User not authorised"
    ) {
      return {
        status: "expired",
        error,
      };
    } else {
      return {
        status: "error",
        error,
      };
    }
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
      // console.log("refresh token result = ", result);
      if (result.status === "refreshed") {
        return customAxios(originalRequest);
      } else if (result.status === "expired") {
        // redirect login page
        window.location.href = "/login";
        return Promise.reject(result.error);
      }
    }
    return Promise.reject(error);
  }
);

export default customAxios;
