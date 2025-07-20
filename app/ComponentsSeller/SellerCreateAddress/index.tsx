import LoaddingBox from "@/app/Components/BoxLoadding";
import { CreateAddress } from "@/app/Service/Seller";

import { useProfileStore } from "@/app/zustand/store";
import { X } from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";

type Props = {
  setClose: () => void;
};

function SellerCreateAddress({ setClose }: Props) {
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
  const [checked, setChecked] = useState(false);
  const { fetchProfile } = useProfileStore();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    detailsAddress: "",
    isType: "Nhận Hàng",
    isDefault: false,
  });

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
      formData.name !== "" ||
      formData.phone !== "" ||
      formData.address !== "" ||
      formData.detailsAddress !== "" ||
      formData.isType !== ""
    ) {
      console.log(formData);
      setLoading(true);
      await CreateAddress(formData)
        .then((res) => {
          fetchProfile();
          console.log(res);
          toast.success("Create successfully.");
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
  console.log(checked);

  return (
    <div>
      <div className="flex justify-between ">
        {" "}
        <h2 className="text-xl font-bold ">Tạo Địa Chỉ</h2>
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
            className="h-[80px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
            onChange={(e) => handleChange("detailsAddress", e.target.value)}
          />
          <p className="absolute top-1 left-2 text-[#8e8e8e] text-[12px]">
            {"Địa chỉ chi tiết"}
          </p>
        </div>
        <div className="relative">
          <select
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

export default SellerCreateAddress;
