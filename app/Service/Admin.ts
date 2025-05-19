import axiosClient from "@/app/Service/ApiClient";

const GetAllUsers = async () => {
  return await axiosClient.get("/users");
};

const DeleteUsers = async (id: string) => {
  return await axiosClient.delete(`/users/${id}`);
};

export { GetAllUsers, DeleteUsers };
