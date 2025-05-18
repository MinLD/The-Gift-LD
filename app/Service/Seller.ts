import axiosClient from "@/app/Service/ApiClient";

const CreateSeller = async (formData: FormData) => {
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  return await axiosClient.post("/seller", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export { CreateSeller };
