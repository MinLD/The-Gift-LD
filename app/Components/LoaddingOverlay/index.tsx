import React from "react";
import logo from "../../../public/AVTLoaDing.jpg";
import Image from "next/image";

const LoadingOverlay = ({ message }: { message: string }) => {
  return (
    <>
      {/* Nền tối mờ */}
      <div className="fixed inset-0 bg-black opacity-60 backdrop-blur-sm z-40"></div>

      {/* Hộp loading */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-10 animate-fade-in transition-all duration-300 w-80">
          {/* Logo có hiệu ứng xoay nhẹ */}
          <div className="w-24 h-24 animate-spin-slow">
            <Image
              src={logo}
              alt="Đang tải..."
              width={100}
              height={100}
              className="rounded-full shadow-lg"
            />
          </div>

          {/* Dòng chữ nhịp đập */}
          <p className="text-gray-700 text-lg font-semibold animate-pulse text-center">
            {message}
          </p>
        </div>
      </div>
    </>
  );
};

export default LoadingOverlay;
