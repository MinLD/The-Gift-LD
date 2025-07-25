import LoaddingBox from "@/app/Components/BoxLoadding";
import { UpdateCategories } from "@/app/Service/Admin";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  setClose: () => void;
  id: number;
  image: string;
  name: string;
  description: string;
};

function CategoriesEdit({ setClose, id, image, name, description }: Props) {
  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Tên Danh Mục",
      disabled: false,
    },
    {
      id: 2,
      name: "description",
      type: "text",
      placeholder: "Mô Tả",
      disabled: false,
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);

  const [avatar, setAvatar] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: name || "",
    description: description || "",

    image: image || "",
  });
  useEffect(() => {
    console.log("Props:", { name, description, image });
    setFormData({
      name: name || "",
      description: description || "",

      image: image || "",
    });
    console.log("FormData updated:", formData);
  }, [name, description, image]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();

    // Kiểm tra và thêm dữ liệu nếu có thay đổi
    if (formData.name !== (name || "") && formData.name.length >= 3) {
      data.append("name", formData.name);
    } else if (formData.name.length < 3 && formData.name !== (name || "")) {
      toast.error("Name must be at least 3 characters.");
      setLoading(false);
      return;
    }

    if (
      formData.description !== (description || "") &&
      formData.description.length >= 5
    ) {
      data.append("description", formData.description);
    } else if (
      formData.description.length < 5 &&
      formData.description !== (description || "")
    ) {
      toast.error("Description must be at least 5 characters.");
      setLoading(false);
      return;
    }

    if (avatar instanceof File) {
      data.append("image", avatar || "");
    }

    // Kiểm tra xem có dữ liệu nào được thêm vào FormData không
    if (data.has("name") || data.has("description") || data.has("image")) {
      for (const [key, value] of data.entries()) {
        console.log(`${key}: ${value}`);
      }
      await UpdateCategories(id, data)
        .then((res) => {
          console.log(res);
          toast.success("Update successfully.");
          setLoading(false);
          setClose();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "An error occurred.");
          console.log(error);
          setLoading(false);
        });
    } else {
      toast.warning("No changes made.");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between ">
        {" "}
        <h2 className="text-xl font-bold ">Thông Tin Của Danh Mục</h2>
        <X
          size={35}
          color="#afacac"
          strokeWidth={0.5}
          onClick={() => setClose()}
          className="hover:cursor-pointer"
        />
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 ">
        {inputs.map((input) => (
          <div key={input.id} className="relative">
            <input
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              value={formData[input.name as keyof typeof formData]}
              className="h-[50px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
              onChange={(e) => handleChange(input.name, e.target.value)}
              disabled={input.disabled}
            />
            <p className="absolute top-1 left-2 text-[#8e8e8e] text-[12px]">
              {input.name}
            </p>
          </div>
        ))}
        <div className="relative">
          <input
            type="file"
            name="image"
            className="h-[50px] pl-4 pt-4 border border-gray-300 rounded-lg w-full text-gray-700 text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setAvatar(e.target.files?.[0] || null)}
            accept="image/*"
            placeholder="Image"
          />
          <p className="absolute top-1 left-2 text-gray-500 text-[12px]">
            Ảnh Danh Mục
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="relative w-[250px] h-[250px] rounded-2xl overflow-hidden border-2 border-transparent bg-gradient-to-br from-indigo-100 to-pink-100 transition-all duration-300 hover:shadow-xl hover:border-indigo-400">
            {formData.image || avatar ? (
              <Image
                src={
                  avatar instanceof File
                    ? URL.createObjectURL(avatar)
                    : formData.image
                }
                alt="Avatar"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-2xl"
                onError={() => console.log("Error loading image")}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center ">
                <div className="text-center flex flex-col items-center justify-center">
                  <Camera size={80} color="#4b5563" strokeWidth={1.5} />
                  <p className="text-gray-700 font-bold mt-3  drop-shadow-md">
                    Thêm Ảnh Ngay
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-5 gap-2 items-center  ">
        <div
          className="text-[#3c3c3c] hover:cursor-pointer"
          onClick={() => {
            !loading && setClose;
          }}
        >
          Cancel
        </div>
        <button
          className="bg-[#3c3c3c] text-white p-3 rounded-md hover:cursor-pointer"
          onClick={handleSubmit}
        >
          {loading ? <LoaddingBox width="5" height="5" /> : "Save"}
        </button>
      </div>
    </div>
  );
}

export default CategoriesEdit;
