import { axiosInstance } from "@/shared";

export const handleLogout = async () => {
  const res = await axiosInstance({
    method: "get",
    withCredentials: true,
    url: "/logout"
  });

  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};
