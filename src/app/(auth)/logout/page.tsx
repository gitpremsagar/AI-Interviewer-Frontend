"use client";
import customAxios from "@/lib/axiosInterceptor";
import { API_ENDPOINT_FOR_USER } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearUser } from "@/redux/userSlice";

const LogOutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await customAxios.post(`${API_ENDPOINT_FOR_USER}/logout`);
      dispatch(clearUser());
      router.push("/login");
    } catch (error: any) {
      console.log("logout error = ", error);
    }
  };

  logout();
  return (
    <div className=" flex justify-center items-center h-screen">
      Logging you out
    </div>
  );
};

export default LogOutPage;
