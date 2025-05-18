"use client";
import { useStateStore } from "@/app/Context/StoreProvider";
import {
  dataHeader,
  DataHeaderBottom,
  DataIcons,
} from "@/app/Layout/Header/components/contants";
import MyLayOut from "@/app/MyLayout/layout";

import logo from "@/public/logo2.png";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const roles = Cookies.get("roles");
function HeaderBottom() {
  const { setIsOpenMenu } = useStateStore();
  const router = useRouter();

  const handlePushRouter = (name: number) => {
    if (name === 1) {
      router.push("/Authentication/Login");
    }
  };
  //  <div
  //           className="xl:hidden w-[68px] md:w-[112px] hover:cursor-pointer"
  //           onClick={() => setIsOpenMenu(true)}
  //         >
  //           <Menu size={32} strokeWidth={2.25} />
  //         </div>

  //        <div className="flex gap-5 items-center">
  //   {DataIcons.map((item) => (
  //     <div
  //       key={item.id}
  //       onClick={() => handlePushRouter(item.id)}
  //       className={`cursor-pointer hover:opacity-50  ${
  //         item.id === 0 && "hidden md:block"
  //       }`}
  //     >
  //       <item.name />
  //     </div>
  //   ))}
  // </div>

  return (
    <div className="w-full min-h-[70px] h-auto  bg-[#f7f2eb]  shadow-2xl flex justify-center items-center ">
      <MyLayOut>
        <div className="flex justify-between w-full mt-2">
          <div className="flex gap-2 items-center">
            <h2 className="text-[13px] text-center sm:text-[14px]">
              {roles === "SELLER"
                ? "Kênh Người Bán"
                : "Trở thành người bán hàng"}
            </h2>
            <div className="w-[2px] opacity-15 h-[15px] bg-[#f05626] rounded-2xl" />
            <h2 className=" text-[13px] text-center sm:text-[14px]">
              Kết nối{" "}
            </h2>
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
            <div className="hidden sm:flex gap-2 mt-2 mb-2 ">
              {DataHeaderBottom.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handlePushRouter(item.id)}
                  className={`text-[12px] cursor-pointer hover:opacity-50  ${
                    item.id === 0 && "hidden md:block"
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex gap-2 sm:gap-5">
              {DataIcons.slice(1, 2).map((item) => (
                <div
                  key={item.id}
                  onClick={() => handlePushRouter(item.id)}
                  className={` cursor-pointer hover:opacity-50  ${
                    item.id === 0 && "hidden md:block"
                  }`}
                >
                  <item.name size={30} />
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
