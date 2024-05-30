import { useState, useEffect } from "react";
import customAxios from "@/lib/axiosInterceptor";
import { API_ENDPOINT_FOR_USER } from "@/lib/constants";

const useFetchUserDetail = () => {
  const [user, setUser] = useState<any>(null);
  const [status, setStatus] = useState<string>("idle");

  const fetchUserDetail = async () => {
    try {
      setStatus("fetching");
      const response = await customAxios.get(
        `${API_ENDPOINT_FOR_USER}/decode-access-token`
      );
      setUser(response.data);
      setStatus("fetched");
    } catch (error: any) {
      console.log("error while fetching decoded access token = ", error);
      setStatus("error");
    }
  };

  // fetchUserDetail();

  return { user, status, fetchUserDetail };
};

export default useFetchUserDetail;
