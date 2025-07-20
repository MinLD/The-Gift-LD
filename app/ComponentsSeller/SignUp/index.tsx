"use client";
import FormInput from "@/app/ComponentsAuthentication/FormInput";
import ShippingMethod from "@/app/ComponentsSeller/Shippingmethod";
import MyLayOut from "@/app/MyLayout/layout";
import { useProfileStore } from "@/app/zustand/store";
import { useFormik } from "formik";
import { Check } from "lucide-react";

import { useState } from "react";
import * as Yup from "yup"; // Import Yup để xác thực
import { CreateSeller } from "@/app/Service/Seller";
import { toast } from "sonner";
import LoaddingBox from "@/app/Components/BoxLoadding";
import { refeshToken } from "@/app/Service/Auth";
import { SetCookie } from "@/app/Service/ServerComponents";
import Cookies from "js-cookie";

type FormData = {
  name: string;
  description: string;
  taxCode: string;

  email: string | undefined;
};

type Form = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
};
function SignUpSeller() {
  const data = [
    {
      id: 0,
      name: "Thông tin Cửa hàng",
    },
    {
      id: 1,
      name: "Cài đặt vận chuyển",
    },
    {
      id: 2,
      name: "Thông tin thuế",
    },
    {
      id: 3,
      name: "Hoàn tất",
    },
  ];
  const data1: Form[] = [
    {
      label: "Tên cửa hàng:",
      type: "text",
      name: "name",
      placeholder: "Tên cửa hàng",
    },
    {
      label: "Email:",
      type: "email",
      name: "email",
      placeholder: "Email",
    },
    {
      label: "Mô tả cửa hàng:",
      type: "text",
      name: "description",
      placeholder: "Mô tả",
    },
    {
      label: "Mã số thuế:",
      type: "text",
      name: "taxCode",
      placeholder: "Mã số thuế",
    },
  ];
  const data2 = [
    {
      id: 0,
      label: "Cá nhân",
    },
    {
      id: 1,
      label: "Hộ kinh doanh",
    },
    {
      id: 2,
      label: "Công ty",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState(0);
  const { User, fetchProfile } = useProfileStore();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      taxCode: "",

      email: User?.email,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("bắt buộc")
        .min(3, "tên cửa hàng phải ít nhất 3 ký tự")
        .max(20, "tên cửa hàng tối đa 20 ký tự"),
      description: Yup.string()
        .required("bắt buộc")
        .min(20, "Mô tả ít nhất 20 ký tự")
        .max(100, "Mô tả tối đa 100 ký tự"),
      ...(step === 2 && {
        taxCode: Yup.string().required("bắt buộc"),
      }),
    }),
    onSubmit: async (values: FormData) => {
      formik.setTouched({
        name: true,
        description: true,
        taxCode: true,
      });
      if (!imageFile) {
        toast.error("Hình ảnh cửa hàng là bắt buộc");
        return;
      }
      if (step < 2) {
        setStep(step + 1);
      }
      if (step === 2) {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("taxCode", values.taxCode);
        if (imageFile) {
          formData.append("image", imageFile);
        }

        setIsLoading(true);
        await CreateSeller(formData)
          .then((res) => {
            const token = Cookies.get("token") || "";
            refeshToken(token)
              .then((res) => {
                console.log(res?.data?.result?.token);
                SetCookie(res?.data?.result?.token);
                Cookies.remove("token");
                Cookies.set("token", res?.data?.result?.token);
                fetchProfile();
              })
              .catch((err) => {
                console.log(err);
              });
            console.log(res);
            toast.success(res?.data?.result?.message);
            setStep(3);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            toast.error(error?.response?.data?.message);
            setIsLoading(false);
          });
      }
    },
  });

  const handleReturnForm = () => {
    switch (step) {
      case 0:
        return (
          <div className="">
            {data1.slice(0, 3).map((i, k) => (
              <div className={`mt-4`} key={i.label}>
                <label>{i.label}</label>
                <div>
                  <FormInput
                    disabled={i.name === "email"}
                    id={i.name}
                    key={k}
                    type={i.type}
                    placeholder={
                      i.name === "email" ? User?.email : i.placeholder
                    }
                    name={i.name}
                    Formik={formik} // Truyền đối tượng formik
                  />
                </div>
              </div>
            ))}
            <div className="mt-4 flex flex-col">
              <label>Ảnh cửa hàng</label>
              <input
                id={"image"}
                placeholder={"image"}
                onBlur={formik?.handleBlur}
                type="file"
                onChange={(e) => handleFileChange(e)}
                accept="image/*"
                name="image"
                className={` outline-0 pl-2 p-3 w-full bg-[#f5f5f5] rounded-md text-md text-[#8e8e8e]`}
              />
            </div>
          </div>
        );

      case 1:
        return <ShippingMethod />;

      case 2:
        return (
          <>
            <div className="flex gap-2">
              <h2 className="text-[17px] text-[#272727]">
                Loại hình kinh doanh
              </h2>
              {data2.map((i) => (
                <div className="flex gap-2" key={i.id}>
                  <input
                    type="radio"
                    checked={checked === i.id}
                    onChange={() => setChecked(i.id)}
                  />
                  <label
                    htmlFor=""
                    onClick={() => setChecked(i.id)}
                    className="hover:cursor-pointer"
                  >
                    {i.label}
                  </label>
                </div>
              ))}
            </div>

            <div className="">
              {data1.slice(3, data1.length).map((i, k) => (
                <div className="mt-4" key={i.label}>
                  <label key={k}>{i.label}</label>
                  <FormInput
                    id={i.name}
                    key={k}
                    type={i.type}
                    placeholder={i.placeholder}
                    name={i.name}
                    Formik={formik} // Truyền đối tượng formik
                  />
                </div>
              ))}
              <p className="text-[13px] text-[#c4c4c4]">
                Theo Quy định về thương mại điện tử Việt Nam (Nghị định
                52/2013/ND/CP), Người Bán phải cung cấp thông tin Mã số thuế cho
                sàn thương mại điện tử.
              </p>
            </div>
          </>
        );

      case 3:
        return (
          <div className="flex justify-center items-center flex-col gap-4">
            <div className="w-[70px] h-[70px] rounded-full bg-[green] flex items-center justify-center">
              <Check className="w-[50px] h-[50px] text-[#ffffff]" />
            </div>
            <h2>Đăng ký thành công</h2>
            <p className="text-[#272727]">
              Hãy đăng bán sản phẩm đầu tiên để khởi động hành trình bán hàng
              cùng TheCraftLD nhé!
            </p>
            <button className="bg-[#39523f] text-[#ffffff] py-2 px-5 rounded-md">
              Thêm sản phẩm
            </button>
          </div>
        );
    }
  };

  return (
    <div className="bg-[#f6f6f6] w-full h-screen p-5">
      <MyLayOut>
        <div className="w-full bg-[#ffffff] h-auto px-2 ">
          {/* Step XL*/}
          <div className="hidden lg:flex justify-center gap-2 pt-10 mb-20">
            {data.map((i, k) => (
              <div
                key={i.id}
                className="flex flex-col items-center justify-center relative"
              >
                <div className="flex gap-2 items-center">
                  <div
                    className={`w-2.5 h-2.5 bg-[${
                      step >= k ? "#39523f" : "#f6f6f6"
                    }] rounded-full`}
                  />
                  <div
                    className={`w-48 h-[2px] bg-[${
                      step >= k ? "#39523f" : "#f6f6f6"
                    }] transition-all duration-700 `}
                  />
                </div>
                <div
                  className={`absolute top-5 left-1/2 -translate-x-1/2 text-center text-sm `}
                >
                  <p className={`text-[${step >= k ? "#272727" : "#f6f6f6"}]`}>
                    {i.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full bg-[#f2f2f2] h-[1px]  " />
          <div className="flex gap-2 md:justify-between flex-col">
            <div className="px-2 mt-5 ">
              <h2 className="font-bold text-[20px]">The Gift LD Việt Nam</h2>
            </div>
            {/* step mobile */}
            <div className="lg:hidden space-y-5 px-2 mt-5">
              {data.map((i, k) => (
                <h2
                  key={k}
                  className={`${
                    step === i.id
                      ? "text-[#39523f] font-bold"
                      : "text-[#272727]"
                  }`}
                >
                  {i.name}
                </h2>
              ))}
            </div>
          </div>
          {/* Thông tin */}
          <div className="flex gap-2">
            <form onSubmit={formik.handleSubmit} className="w-full flex-1 mx-3">
              <div className="mt-8">{handleReturnForm()}</div>
              {step < 3 && (
                <>
                  <div className="w-full bg-[#f2f2f2] h-[1px] mt-10 " />
                  <button className="mt-3 mb-5 bg-[#39523f] w-[100px] h-10 text-[#ffffff] rounded-md left-4/5 relative hover:cursor-pointer">
                    {isLoading ? (
                      <LoaddingBox isAVT width="10" height="10" />
                    ) : (
                      "Tiếp tục"
                    )}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </MyLayOut>
    </div>
  );
}

export default SignUpSeller;
