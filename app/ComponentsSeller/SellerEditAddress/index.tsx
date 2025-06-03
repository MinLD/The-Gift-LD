import LoaddingBox from "@/app/Components/BoxLoadding";
import { CreateCategories, UpdateCategories } from "@/app/Service/Admin";
import {
  CreateAddress,
  UpdateAddress,
  UpdateSeller,
} from "@/app/Service/Seller";

import { updateMyInfo } from "@/app/Service/User";
import { useProfileStore } from "@/app/zustand/store";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  setClose: () => void;
  name: string;
  phone: string;
  address: string;
  detailsAddress: string;
  isType: string;
  isDefault: boolean;
  id: number;
};

function SellerEditAddress({
  setClose,
  name,
  phone,
  address,
  detailsAddress,
  isType,
  isDefault,
  id,
}: Props) {
  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Họ và tên",
      disabled: false,
    },
    {
      id: 2,
      name: "phone",
      type: "text",
      placeholder: "Số điện thoại",
      disabled: false,
    },
    {
      id: 3,
      name: "address",
      type: "text",
      placeholder: "Địa chỉ",
      disabled: false,
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState(isDefault);
  const { fetchProfile } = useProfileStore();
  const [formData, setFormData] = useState({
    name: name || "",
    phone: phone || "",
    address: address || "",
    detailsAddress: detailsAddress || "",
    isType: isType || "",
    isDefault: isDefault || false,
  });

  useEffect(() => {
    setFormData({
      name: name || "",
      phone: phone || "",
      address: address || "",
      detailsAddress: detailsAddress || "",
      isType: isType || "",
      isDefault: isDefault || false,
    });
    setChecked(isDefault);
  }, [name, phone, address, detailsAddress, isType, isDefault]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    formData.isDefault = checked;

    if (
      formData.name !== (name || "") ||
      formData.phone !== (phone || "") ||
      formData.address !== (address || "") ||
      formData.detailsAddress !== (detailsAddress || "") ||
      formData.isType !== (isType || "") ||
      formData.isDefault !== checked ||
      formData.isDefault !== isDefault
    ) {
      setLoading(true);
      await UpdateAddress(id, formData)
        .then((res) => {
          fetchProfile();
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
        <h2 className="text-xl font-bold ">Chỉnh Sửa Địa Chỉ</h2>
        <X
          size={35}
          color="#afacac"
          strokeWidth={0.5}
          onClick={() => setClose()}
          className="hover:cursor-pointer"
        />
      </div>

      <div className="mt-5 grid grid-cols-1  gap-2 ">
        {inputs.map((input) => (
          <div key={input.id} className="relative">
            <input
              value={formData[input?.name as keyof typeof formData]?.toString()}
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
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
          <textarea
            value={formData?.detailsAddress}
            className="h-[80px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
            onChange={(e) => handleChange("detailsAddress", e.target.value)}
          />
          <p className="absolute top-1 left-2 text-[#8e8e8e] text-[12px]">
            {"Địa chỉ chi tiết"}
          </p>
        </div>
        <div className="relative">
          <select
            value={formData?.isType}
            onChange={(e) => handleChange("isType", e.target.value)}
            className="h-[50px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
          >
            <option value="Nhận Hàng">Nhận Hàng</option>
            <option value="Giao Hàng">Giao Hàng</option>
            <option value="Giao Hàng - Nhận Hàng">Giao Hàng - Nhận Hàng</option>
          </select>
          <p className="absolute top-1 left-2 text-[#8e8e8e] text-[12px]">
            {"Loại địa chỉ"}
          </p>
        </div>
        <div
          className="flex gap-1 items-center"
          onClick={() => setChecked(!checked)}
        >
          <input type="radio" className="w-[30px]" checked={checked} />
          <p className="text-[#8e8e8e] text-[15px]">
            {"Đặt làm địa chỉ mặc định"}
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-5 gap-2 items-center  ">
        <div className="text-[#3c3c3c] hover:cursor-pointer" onClick={setClose}>
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

export default SellerEditAddress;
