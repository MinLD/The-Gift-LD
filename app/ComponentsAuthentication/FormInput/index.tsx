"use client";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
type Props = {
  type: string;
  placeholder?: string;
  id?: string;
  label?: string;
  Formik?: any;
  name?: string;
  value?: string;
};
function FormInput({ type, placeholder, id = "", label, Formik, name }: Props) {
  const isErr = Formik?.touched[name!] && Formik.errors[name!];
  const messageErr = Formik?.errors[name!];
  const [isShow, setIsShow] = useState<string>("password");
  return (
    <div>
      <div className="relative">
        <label className="text-[#8e8e8e] text-sm">{label}</label>
        <input
          id={id}
          type={type === "password" ? isShow : type}
          placeholder={placeholder}
          onBlur={Formik?.handleBlur}
          onChange={Formik?.handleChange}
          value={Formik?.values[name!] || ""}
          name={name}
          className="outline-0 pl-2 p-3 w-full bg-[#f5f5f5] rounded-md text-md text-[#8e8e8e] "
        />
        {type === "password" && (
          <div className="absolute top-[50%] right-3 -translate-y-[50%] transform">
            {isShow === "password" ? (
              <span
                className="cursor-pointer"
                onClick={() => setIsShow("text")}
              >
                <EyeClosed />
              </span>
            ) : (
              <span
                className="cursor-pointer"
                onClick={() => setIsShow("password")}
              >
                <Eye />
              </span>
            )}
          </div>
        )}
      </div>
      {isErr && <span className="text-red-500 text-[12px] font-medium">*{messageErr}</span>}
    </div>
  );
}

export default FormInput;
