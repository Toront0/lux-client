import { axiosInstance } from "@/shared";

export const onLogin = async (email: string, password: string) => {
  const res = await axiosInstance({
    method: "POST",
    url: "/login",
    headers: { "Content-Type": "text/plain" },
    withCredentials: true,
    data: {
      email,
      password
    }
  });

  return res;
};

export const onSignup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const res = await axiosInstance({
    method: "POST",
    url: "/sign-up",
    headers: { "Content-Type": "text/plain" },
    withCredentials: true,
    data: {
      email,
      password,
      firstName,
      lastName
    }
  });

  return res;
};
