import axiosClient from "@/app/Service/ApiClient";

const getCart = async () => {
  return await axiosClient.get("/cart");
};
const postCart = async (
  id_product: number,
  quantity: number,
  id_atributesValue: number,
  id_atributes_name: number
) => {
  if (!id_atributesValue) {
    console.log(id_product, quantity);
    return await axiosClient.post("/cart", {
      id_product,
      quantity,
    });
  } else {
    return await axiosClient.post("/cart", {
      id_product,
      quantity,
      id_atributes_value: id_atributesValue,
      id_atributes_name,
    });
  }
};
const deleteCart = async (id: number) => {
  return await axiosClient.delete(`/cart/${id}`);
};
const updateQuantityCart = async (id: number, quantity: number) => {
  return await axiosClient.post(`/cart/updateQuantity`, { id, quantity });
};
const updateCartItem = async (id: number, id_atributes_value: number) => {
  return await axiosClient.post(`/cart/updateCartItem`, {
    id,
    id_atributes_value,
  });
};
const getAttributesValue = async (id: number) => {
  return await axiosClient.get(`cart/AtributesValue/${id}`);
};

export {
  getCart,
  postCart,
  deleteCart,
  updateQuantityCart,
  updateCartItem,
  getAttributesValue,
};
