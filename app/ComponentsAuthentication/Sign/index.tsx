"use client"; // Đánh dấu là Client Component

import { useContext, useEffect, useState } from "react";
import { createUser, login } from "@/app/Service/Auth";
import FormInput from "../FormInput";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup để xác thực

import LoaddingBox from "@/app/Components/BoxLoadding";

import { toast } from "sonner";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AuthContext } from "@/app/Context/AuthProvider";
import { SetCookie } from "@/app/Service/ServerComponents";

import { useProfileStore } from "@/app/zustand/store";

type Props = {
  isType: string;
};
type FormData = {
  email: string;
  password: string;
  passwordrl: string;
  fullName: string;
};

type Form = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
};

function SignIn({ isType = "login" }: Props) {
  const data: Form[] = [
    {
      label: "Email: ",
      type: "text",
      name: "email",
      placeholder: "Email",
    },
    {
      label: "Mật khẩu: ",
      type: "password",
      name: "password",
      placeholder: "Password",
    },
    {
      label: "Mật khẩu: ",
      type: "password",
      name: "passwordrl",
      placeholder: "re-enter Password",
    },
    {
      label: "Họ tên: ",
      type: "text",
      name: "fullName",
      placeholder: "Full Name",
    },
  ];
  const { fetchProfile, fetchCart } = useProfileStore();
  const [isLoading, setIsLoading] = useState(false);
  const authcontext = useContext(AuthContext);
  if (!authcontext) {
    throw new Error("useUser must be used within a ContextProvider");
  }
  const { setSessionToken } = authcontext;
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordrl: "",
      fullName: "",
    },
    validationSchema: Yup.object({
      ...(isType === "register"
        ? {
            email: Yup.string()
              .email("Email không hợp lệ")
              .required("Bắt buộc"),
            password: Yup.string()
              .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
              .required("Bắt buộc"),
            passwordrl: Yup.string()
              .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
              .required("Bắt buộc"),
            fullName: Yup.string()
              .min(3, "Họ tên phải có ít nhất 3 ký tự")
              .required("Bắt buộc"),
          }
        : {}),
    }),
    onSubmit: async (values: FormData) => {
      formik.setTouched({
        email: true,
        password: true,
        fullName: true,
      });

      if (isType === "login") {
        setIsLoading(true);
        await login(values.email, values.password)
          .then(async (res) => {
            if (res?.data?.result?.isActive) {
              toast.success("Login successfully");
              SetCookie(res?.data?.result?.token);
              Cookies.set("token", res?.data?.result?.token);
              setSessionToken(res?.data?.result?.token);
              // Chờ fetchProfile hoàn thành để lấy role
              await fetchProfile(); // Đảm bảo fetchProfile trả về promise
              await fetchCart();
              const role = Cookies.get("roles"); // Lấy role từ cookie

              // Redirect dựa trên role
              if (role === "ADMIN") {
                router.push("/admin");
              } else {
                router.push("/");
              }
            } else if (!res?.data?.result?.isActive) {
              toast.error("Please verify your email.");
              router.push("/Authentication/Verify/" + values.email);
              setIsLoading(false);
              return;
            }
          })
          .catch((err) => {
            if (err.response?.data?.code === 1005) {
              console.log(err);
              toast.error("Password is incorrect.");
              setIsLoading(false);
              return;
            } else if (err.response?.data?.code === 1004) {
              toast.error("Email is incorrect.");
              setIsLoading(false);
              return;
            }
            setIsLoading(false);
            toast.error("Something went wrong. Please try again.");
            console.log(err);
          });
      }

      if (isType === "register") {
        console.log(isType);
        setIsLoading(true);
        await createUser(values.email, values.password, values.fullName)
          .then((res) => {
            console.log(res);
            setIsLoading(false);
            toast.success("Register successfully");

            router.push("/Authentication/Verify/" + values.email);
          })
          .catch((err) => {
            if (err?.response?.data?.code === 1001) {
              toast.error(err?.response?.data?.message);
              setIsLoading(false);
              return;
            }
            setIsLoading(false);
            toast.error("Something went wrong. Please try again.");
            console.log(err);
          });
      }
    },
  });
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  return (
    <>
      <h2 className="font-black text-xl">
        {isType === "register" ? "Sign Up" : "Sign In"}
      </h2>
      <p className="text-[#8e8e8e] text-sm">
        {isType === "register" ? "Register" : "Login"} your account
      </p>
      <form onSubmit={formik.handleSubmit}>
        {data
          .splice(0, isType === "register" ? data.length : 2)
          .map((i, index) => (
            <div key={index} className="mt-4">
              <FormInput
                id={i.name}
                key={index}
                type={i.type}
                placeholder={i.placeholder}
                name={i.name}
                Formik={formik} // Truyền đối tượng formik
              />
            </div>
          ))}
        <div>
          <button
            type="submit" // Dùng type="submit" để kích hoạt submit form
            className={`flex items-center justify-center outline-0 p-3 bg-[#272727] w-full rounded-md text-md text-white mt-4 ${
              !formik.values.email || !formik.values.password || isLoading
                ? "opacity-80 cursor-not-allowed"
                : "scale-100 hover:scale-95 duration-300 cursor-pointer"
            }`}
          >
            {isLoading ? <LoaddingBox /> : "Continue"}
          </button>
        </div>
      </form>
      <div className="flex gap-2 mt-5">
        <div>
          {isType === "register"
            ? "Already have an account?"
            : "Don't have an account?"}
        </div>
        <div
          onClick={() =>
            router.push(
              `/Authentication/${isType === "register" ? "Login" : "Sign"}`
            )
          }
          className="text-[#5433eb] cursor-pointer"
        >
          {isType === "register" ? "Sign In" : "Sign Up"} now
        </div>
      </div>

      {isType === "login" && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mt-5">
            <div className="w-full h-[2px] bg-[#8e8e8e] opacity-50"></div>
            <div>or</div>
            <div className="w-full h-[2px] bg-[#8e8e8e] opacity-50"></div>
          </div>
          <button className="outline-0 p-3 bg-[#5433eb] rounded-md text-md text-white mt-2">
            Sign in with Google
          </button>

          {/* <LoadingOverlay /> */}
        </div>
      )}
    </>
  );
}

export default SignIn;
