import { axiosClient } from "@/app/Service/ApiClient";

const createUser = async (
  email: string,
  password: string,
  fullName: string
) => {
  const res = await axiosClient.post("/users", { email, password, fullName });
  return res;
};

const activeUser = async (email: string, code: string) => {
  return await axiosClient.post("/users/active", { email, code });
};

const sendCode = async (email: string) => {
  return await axiosClient.post("/users/sendcode", { email });
};

const login = async (email: string, password: string) => {
  return await axiosClient.post("/auth/token", { email, password });
};

const refeshToken = async (token: string) => {
  return await axiosClient.post("/auth/refresh", { token });
};

export { createUser, activeUser, sendCode, login, refeshToken };
