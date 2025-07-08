"use client";
import { DataIcons } from "@/app/Layout/Header/components/contants";
import MyLayOut from "@/app/MyLayout/layout";
import { useProfileStore } from "@/app/zustand/store";

import logo from "@/public/logo2.png";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function HeaderBottom() {
  const router = useRouter();
  const { User, Cart } = useProfileStore();
  const roles: boolean = User?.roles[0]?.name === "SELLER";

  const handlePushRouter = (name: number) => {
    if (name === 1) {
      router.push("/Authentication/Login");
    }
    if (name === 2) {
      router.push("/cart");
    }
  };
  console.log(Cart);

  return (
    <div className="w-full min-h-[70px] h-auto  bg-[#f7f2eb] flex justify-center items-center ">
      <MyLayOut>
        <div className="flex justify-between w-full mt-2">
          <div className="flex gap-2 items-center">
            <h2
              className="text-[13px] text-center sm:text-[14px] hover:opacity-50 cursor-pointer"
              onClick={() => router.push("/seller/dashboard")}
            >
              {roles ? "Kênh Người Bán" : "Trở thành người bán hàng"}
            </h2>
            <div className="w-[2px] opacity-15 h-[15px] bg-[#f05626] rounded-2xl" />
            <h2 className=" text-[13px] text-center sm:text-[14px]">Kết nối</h2>
          </div>
          <div className="flex gap-5  items-center">
            {DataIcons.slice(2, DataIcons.length).map((item) => (
              <div
                key={item.id}
                onClick={() => handlePushRouter(item.id)}
                className={` cursor-pointer hover:opacity-50  ${
                  item.id === 0 && "hidden md:block"
                }`}
              >
                <div className="flex items-center gap-1 text-[12px] sm:text-[14px] ">
                  {" "}
                  <item.name className="w-6 h-6" />{" "}
                  <p className="hidden sm:block">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <div className="flex items-center  w-[100px] h-[70px]">
            <Image src={logo.src} alt="logo" width={70} height={65} />
          </div>

          <div className="w-full mt-3">
            <div className="relative">
              <input
                type="text"
                className="outline-none w-full flex-1 pl-4 border-b border-[#f05626]  rounded-[5px]   h-[45px] text-[#000000] "
                placeholder="nhập từ khóa tìm kiếm"
              />
              <div className="hidden absolute top-1/2 right-3 transform translate-y-[-50%] text-[#ffffff] bg-[#f05626] w-[70px] h-[35px]  sm:flex items-center justify-center">
                <Search size={20} strokeWidth={2.25} />
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-2 sm:gap-5">
              {DataIcons.slice(1, 2).map((item) => (
                <div
                  key={item.id}
                  onClick={() => handlePushRouter(item.id)}
                  className={`relative cursor-pointer hover:opacity-50  ${
                    item.id === 0 && "hidden md:block"
                  }`}
                >
                  <item.name size={30} />
                  {Cart?.items?.length && (
                    <div className="absolute top-0 right-0 text-[8px] w-[15px] h-[15px] bg-[#272727] font-medium rounded-full flex items-center justify-center text-white  ">
                      {Cart && Cart.items ? Cart?.items?.length : ""}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </MyLayOut>
    </div>
  );
}

export default HeaderBottom;
