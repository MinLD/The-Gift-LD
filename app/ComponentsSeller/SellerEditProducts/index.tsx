import LoaddingBox from "@/app/Components/BoxLoadding";
import { CreateCategories, UpdateCategories } from "@/app/Service/Admin";
import {
  CreateAddress,
  PatchProduct,
  UpdateAddress,
  UpdateSeller,
} from "@/app/Service/Seller";

import { updateMyInfo } from "@/app/Service/User";
import { useProfileStore } from "@/app/zustand/store";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";
type dataProduct = {
  sku: string;
  id: number;
  title: string;
  description: string;
  price: number;
  category: number;
  trademark: string;
  origin: string;
  style: string;
  material: string;
  quantity: number;
  images: {
    url: string | null;
  }[];
  attributes: {
    name: string;
    id: string;
    attributesValues: {
      name: string;
      id: string;
      price: number;
      quantity: number;
      image: {
        url: string | null;
      };
    }[];
  }[];
};
type Props = {
  setClose: () => void;
  data: dataProduct;
};

function SellerEditProducts({
  setClose,
  data: {
    sku,
    id,
    title,
    description,
    price,
    trademark,
    origin,
    style,
    material,
    quantity,
    images,
    attributes,
  },
}: Props) {
  const inputs = [
    {
      id: 1,
      name: "title",
      type: "text",
      placeholder: "Tên sản phẩm",
      disabled: false,
    },

    {
      id: 3,
      name: "price",
      type: "number",
      placeholder: "Giá",
      disabled: false,
    },
    {
      id: 4,
      name: "quantity",
      type: "number",
      placeholder: "Số lượng",
      disabled: false,
    },
    {
      id: 6,
      name: "trademark",
      type: "text",
      placeholder: "Thương hiệu",
      disabled: false,
    },
    {
      id: 7,
      name: "origin",
      type: "text",
      placeholder: "Xuất xứ",
      disabled: false,
    },
    {
      id: 8,
      name: "style",
      type: "text",
      placeholder: "Kiểu dáng",
      disabled: false,
    },
    {
      id: 9,
      name: "material",
      type: "text",
      placeholder: "Chất liệu",
      disabled: false,
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [isRender, setIsRender] = useState<number>(0);
  const [formData, setFormData] = useState({
    title: title || "",
    description: description || "",
    price: price || 0,
    quantity: quantity || 0,
    trademark: trademark || "",
    origin: origin || "",
    style: style || "",
    material: material || "",
  });

  useEffect(() => {
    setFormData({
      title: title || "",
      description: description || "",
      price: price || 0,
      quantity: quantity || 0,
      trademark: trademark || "",
      origin: origin || "",
      style: style || "",
      material: material || "",
    });
  }, [title, description, price, quantity, trademark, origin, style, material]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();
    if (
      formData.title === title &&
      formData.description === description &&
      formData.price === price &&
      formData.quantity === quantity &&
      formData.trademark === trademark &&
      formData.origin === origin &&
      formData.style === style &&
      formData.material === material
    ) {
      toast.warning("Chưa có thay đổi!");
      setLoading(false);
      return;
    }

    if (formData.title !== title && formData.title !== "") {
      if (formData.title.length < 5) {
        toast.warning("Tên sản phẩm phải có ít nhất 5 ký tự!");
        setLoading(false);
        return;
      }
      data.append("title", formData.title);
    }
    if (formData.price !== price && formData.price !== 0) {
      if (formData.price < 0) {
        toast.warning("Giá phải lớn hơn 0!");
        setLoading(false);
        return;
      }
      data.append("price", formData.price.toString());
    }
    if (formData.quantity !== quantity && formData.quantity !== 0) {
      if (formData.quantity < 0) {
        toast.warning("Số lượng phải lớn hơn 0!");
        setLoading(false);
        return;
      }
      data.append("quantity", formData.quantity.toString());
    }
    if (formData.trademark !== trademark && formData.trademark !== "") {
      if (formData.trademark.length < 3) {
        toast.warning("Tên Thương hiệu phải lớn hơn 3 ký tự!");
        setLoading(false);
        return;
      }
      data.append("trademark", formData.trademark);
    }
    if (formData.origin !== origin && formData.origin !== "") {
      if (formData.origin.length < 3) {
        toast.warning("Xuất xứ phải lớn hơn 3 ký tự!");
        setLoading(false);
        return;
      }
      data.append("origin", formData.origin);
    }
    if (formData.style !== style && formData.style !== "") {
      if (formData.style.length < 3) {
        toast.warning("Kiểu dáng phải lớn hơn 3 ký tự!");
        setLoading(false);
        return;
      }
      data.append("style", formData.style);
    }
    if (formData.material !== material && formData.material !== "") {
      if (formData.material.length < 3) {
        toast.warning("Chất liệu phải lớn hơn 3 ký tự!");
        setLoading(false);
        return;
      }
      data.append("material", formData.material);
    }
    if (formData.description !== description && formData.description !== "") {
      if (formData.description.length < 150) {
        toast.warning("Mô tả phải lớn hơn 150 ký tự!");
        setLoading(false);
        return;
      }
      data.append("description", formData.description);
    }

    data.forEach((value, key) => {
      console.log(key, value);
    });

    console.log(data);
    setLoading(true);
    PatchProduct(id, data)
      .then((res) => {
        console.log(res);
        toast.success("Chỉnh sửa Thành Công!");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };
  return (
    <div>
      <div className="flex justify-between ">
        {" "}
        <h2 className="text-xl font-bold ">Chỉnh Sửa Sản Phẩm</h2>
        <X
          size={35}
          color="#afacac"
          strokeWidth={0.5}
          onClick={() => setClose()}
          className="hover:cursor-pointer"
        />
      </div>

      <div className="flex gap-2">
        <div
          className="hover:cursor-pointer   hover:text-[#b4b4b4]  pb-2"
          onClick={() => setIsRender(0)}
        >
          Thông tin
        </div>
        <div
          className="hover:cursor-pointer   hover:text-[#b4b4b4]  pb-2"
          onClick={() => setIsRender(1)}
        >
          Ảnh Sản phẩm
        </div>
        <div
          className="hover:cursor-pointer   hover:text-[#b4b4b4]  pb-2"
          onClick={() => setIsRender(2)}
        >
          Danh Mục
        </div>
      </div>

      {isRender === 0 ? (
        <>
          <div className="mt-5 grid-cols-1 grid sm:grid-cols-2  gap-2 ">
            {inputs.map((input) => (
              <div key={input.id} className="relative">
                <input
                  value={formData[
                    input?.name as keyof typeof formData
                  ]?.toString()}
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  className="h-[50px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
                  onChange={(e) => handleChange(input.name, e.target.value)}
                  disabled={input.disabled}
                />
                <p className="absolute top-1 left-2 text-[#8e8e8e] text-[12px]">
                  {input.placeholder}
                </p>
              </div>
            ))}
            <div className="relative">
              <textarea
                value={formData?.description}
                className="h-[80px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
                onChange={(e) => handleChange("description", e.target.value)}
              />
              <p className="absolute top-1 left-2 text-[#8e8e8e] text-[12px]">
                {"Mô tả"}
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-5 gap-2 items-center  ">
            <div
              className="text-[#3c3c3c] hover:cursor-pointer"
              onClick={setClose}
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
        </>
      ) : isRender === 1 ? (
        <>
          <div className="flex gap-2">
            {images.map((image) => (
              <div key={image.url} className="flex gap-2 items-center">
                <Image
                  src={image.url as string}
                  width={50}
                  height={50}
                  alt="anh san pham"
                  className="rounded-md"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-5 gap-2 items-center  ">
            <div
              className="text-[#3c3c3c] hover:cursor-pointer"
              onClick={setClose}
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
        </>
      ) : isRender === 2 ? (
        <>
          <div>danh mục</div>
          <div className="flex justify-end mt-5 gap-2 items-center  ">
            <div
              className="text-[#3c3c3c] hover:cursor-pointer"
              onClick={setClose}
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
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SellerEditProducts;
