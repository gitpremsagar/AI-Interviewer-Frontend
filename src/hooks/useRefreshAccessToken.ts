import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT_FOR_USER } from "@/lib/constants";

const useRefreshAccessToken = () => {
  const [status, setStatus] = useState<string>("idle");

  async function refreshAccessToken() {
    try {
      setStatus("fetching");
      const response = await axios.post(
        `${API_ENDPOINT_FOR_USER}/refresh-access-token`,
        { withCredentials: true }
      );
      if (response.data.message === "Token refreshed") {
        setStatus("refreshed");
      } else {
        setStatus("error");
      }
      console.log(response.data);
    } catch (error: any) {
      const refreshErrors = [
        "Refresh token not found",
        "Refresh Token expired",
        "Invalid Refresh token",
        "Refresh Token validation failed",
      ];
      if (refreshErrors.includes(error.response.data.message)) {
        setStatus("failed");
      } else {
        setStatus("error");
      }

      console.log(error);
    }
  }

  return { status, refreshAccessToken };
};

export default useRefreshAccessToken;
