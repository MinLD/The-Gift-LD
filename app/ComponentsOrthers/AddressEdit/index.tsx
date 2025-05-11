import LoaddingBox from "@/app/Components/BoxLoadding";
import { useProfileStore } from "@/app/zustand/store";
import { X } from "lucide-react";
import { useEffect,  useState } from "react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { updateMyInfo } from "@/app/Service/User";
import { toast } from "sonner";

type Props = {
  setClose: () => void;
  country: string;
  id: number;

  city: string;
  address: string;
};

function AddressEdit({ setClose, country, id, city, address }: Props) {
  countries.registerLocale(enLocale);
  const countryList = Object.entries(
    countries.getNames("en", { select: "official" })
  );
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    address: "",
  });
  const inputs = [
    {
      id: 1,
      name: "city",
      type: "text",
      placeholder: "city",
      disabled: false,
    },
    {
      id: 2,
      name: "address",
      type: "text",
      placeholder: "address",
      disabled: false,
    },
  ];
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchProfile } = useProfileStore();
  useEffect(() => {
    setFormData({
      country: country || "",
      city: city || "",
      address: address || "",
    });
  }, [country, city, address]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const updatedFields: Partial<typeof formData> = {};
    //typeof: lấy kiểu dữ liệu của formData
    if (formData.address !== (address || "")) {
      updatedFields.address = formData.address;
    }
    if (city !== formData.city) {
      updatedFields.city = formData.city;
    }
    if (country !== formData.country) {
      updatedFields.country = formData.country;
    }
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
    <div>
      <div className="flex justify-between ">
        {" "}
        <h2 className="text-xl font-bold ">Edit Address</h2>
        <X
          size={35}
          color="#afacac"
          strokeWidth={0.5}
          onClick={() => setClose()}
          className="hover:cursor-pointer"
        />
      </div>
      <div className="relative mt-5">
        <select
          value={formData?.country}
          onChange={(e) => handleChange("country", e.target.value)}
          className="h-[50px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
        >
          <option value="">Select country</option>
          {countryList.map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
        <p className="absolute top-1 left-2 text-[#8e8e8e] text-[12px]">
          Country
        </p>
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

export default AddressEdit;
