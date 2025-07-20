import axiosClient from "@/app/Service/ApiClient";

const Apisearch = async (name: string) => {
  return await axiosClient.get(`api/search?keyword=${name}`);
};

export { Apisearch };
