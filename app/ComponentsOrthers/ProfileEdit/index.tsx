import LoaddingBox from "@/app/Components/BoxLoadding";
import { updateMyInfo } from "@/app/Service/User";
import { useProfileStore } from "@/app/zustand/store";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  fullName: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  setClose: () => void;
  id: number;
  dob: string | undefined;
  gender: string | undefined;
};

function ProfileEdit({
  fullName,
  phone = "phone",
  email,
  setClose,
  id,
  dob,
  gender,
}: Props) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchProfile } = useProfileStore();
  useEffect(() => {
    setFormData({
      fullName: fullName || "",
      phone: phone || "",
      email: email || "",
      dob: dob || "",
      gender: gender || "",
    });
  }, [fullName, phone, email, dob, gender]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Full name",
      disabled: false,
    },
    {
      id: 2,
      name: "phone",
      type: "text",
      placeholder: "Phone number",
      disabled: false,
    },
    {
      id: 3,
      name: "dob",
      type: "date",
      placeholder: "Date of birth",
      disabled: false,
    },

    {
      id: 5,
      name: "email",
      type: "email",
      placeholder: "Email",
      disabled: true,
    },
  ];
  const handleSubmit = () => {
    setLoading(true);
    const updatedFields: Partial<typeof formData> = {};
    //typeof: lấy kiểu dữ liệu của formData

    if (formData.fullName !== (fullName || "")) {
      if (formData.fullName.length < 3) {
        toast.error("Full name must be at least 3 characters.");
        setLoading(false);
        return;
      }
      updatedFields.fullName = formData.fullName;
    }
    if (formData.phone !== (phone || "")) {
      if (formData.phone.length !== 10) {
        toast.error("Phone number must be 10 digits.");
        setLoading(false);
        return;
      }
      updatedFields.phone = formData.phone;
    }
    if (formData.dob !== (dob || "")) {
      updatedFields.dob = formData.dob;
    }
    if (formData.gender !== (gender || "")) {
      updatedFields.gender = formData.gender;
    }
    // Email bị disable nên không cần kiểm tra

    // Gửi updatedFields nếu có thay đổi
    if (Object.keys(updatedFields).length > 0) {
      //Object.keys(obj) trả về một mảng chứa tất cả các key (dưới dạng string).
      console.log("Updated fields:", updatedFields);

      updateMyInfo(id, updatedFields)
        .then((res) => {
          console.log(res);
          fetchProfile();
          toast.success("Update successfully.");
          setClose();
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
          console.log(error);
          setLoading(false);
        });
    } else {
      toast.warning("No changes made.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between ">
        {" "}
        <h2 className="text-xl font-bold ">Edit profile</h2>
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
            {input.name === "email" && (
              <p className="text-gray-500 text-[12px]">
                Email used for login can&apos;t be changed
              </p>
            )}
          </div>
        ))}
        <div className="relative">
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="h-[50px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
          >
            <option value="">Select gender</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
          <p className="absolute top-1 left-2 text-[#8e8e8e] text-[12px]">
            Gender
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
    </>
  );
}

export default ProfileEdit;
