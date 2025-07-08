import axiosClient from "@/app/Service/ApiClient";

const GetAllProductsMyCategory = async (id: number) => {
  return await axiosClient.get(`/categories/products/${id}`);
};
const GetByProductId = async (id: number) => {
  return await axiosClient.get(`/products/by/${id}`);
};

const GetAllProductsMySeller = async (id: number) => {
  return await axiosClient.get(`/products/myseller/${id}`);
};

const GetTop5ViewProducts = async () => {
  return await axiosClient.get(`/products/topview`);
};
export { GetAllProductsMyCategory, GetByProductId, GetTop5ViewProducts, GetAllProductsMySeller };
