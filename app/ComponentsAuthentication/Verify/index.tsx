"use client";
import { useRouter } from "next/navigation";
import { sendCode, activeUser } from "@/app/Service/Auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LoaddingBox from "@/app/Components/BoxLoadding";
import LoadingOverlay from "@/app/Components/LoaddingOverlay";
type Props = {
  email: string;
};
function Verify({ email }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [Verifyed, setVerifyed] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(15); // Bộ đếm ngược 30 giây
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Trạng thái nút

  const router = useRouter();
  // Quản lý bộ đếm ngược với useEffect
  useEffect(() => {
    if (resendCooldown > 0) {
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Dọn dẹp interval khi component unmount hoặc resendCooldown thay đổi
      return () => clearInterval(interval);
    }
  }, [resendCooldown]);

  const handleResendCode = async () => {
    setResendCooldown(15);
    setIsResendDisabled(true);
    try {
      const res: any = await sendCode(email);

      if (res.code === 1000) {
        toast.success("Code has been sent again.");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleActiveUser = async () => {
    if (!/^\d{6}$/.test(code)) {
      toast.error("Please enter a valid 6-digit code.");
      return;
    }
    setIsLoading(true);
    try {
      const res: any = await activeUser(email, code);
      console.log(res.data);
      if (res?.data?.code === 1000) {
        setVerifyed(true);
        setIsLoading(false);
        setTimeout(() => {
          router.push("/Authentication/Login");
        }, 3000);
      }
    } catch (err: any) {
      console.log(err.response.data);
      if (err?.response?.data?.code === 1011) {
        toast.error(err.response.data.message);
        setIsLoading(false);
        return;
      }
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="mt-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-black text-xl">Enter code </h2>
          <p className="text-[#8e8e8e] text-sm">Sent to {email} </p>
          <div className="flex items-center justify-center gap-2">
            <button
              className={`p-3  bg-[#272727] rounded-md text-md text-[#8e8e8e] mt-4 ${
                isResendDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#272727]"
              } rounded-md text-md text-white mt-2 flex items-center justify-center`}
              onClick={handleResendCode}
              disabled={isResendDisabled}
            >
              {isResendDisabled ? `(${resendCooldown}s)` : "Resend"}
            </button>
            <input
              type="text"
              placeholder="6-digit code"
              className=" p-3 w-full bg-[#f5f5f5] rounded-md text-md text-[#8e8e8e] mt-4"
              name={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button
            className={`${
              !code ? "cursor-not-allowed" : ""
            } outline-0 p-3 bg-[#272727]  rounded-md text-md text-white mt-4 flex items-center justify-center`}
            onClick={() => handleActiveUser()}
            disabled={!code}
          >
            {isLoading ? <LoaddingBox /> : "Submit"}
          </button>

          <p
            className="text-[#272727] text-sm mt-4 hover:cursor-pointer hover:text-[#8e8e8e]"
            onClick={() => {
              router.push("/Authentication/Sign");
            }}
          >
            Log in with a different Email
          </p>
        </div>

        {/* <Verify email={emai} setEmail={setEmail} /> */}
      </div>

      {Verifyed && (
        <LoadingOverlay message="Chúc mừng bạn đã kích hoạt tài khoản thành công!" />
      )}
    </>
  );
}

export default Verify;
