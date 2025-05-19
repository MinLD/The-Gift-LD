import axiosClient from "@/app/Service/ApiClient";

const CreateSeller = async (formData: FormData) => {
  return await axiosClient.post("/seller", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export { CreateSeller };
