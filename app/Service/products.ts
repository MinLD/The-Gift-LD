import axiosClient from "@/app/Service/ApiClient";

const GetAllProductsMyCategory = async (id: number) => {
  return await axiosClient.get(`/categories/products/${id}`);
};
const GetByProductId = async (id: number) => {
  return await axiosClient.get(`/products/by/${id}`);
};
export { GetAllProductsMyCategory, GetByProductId };
