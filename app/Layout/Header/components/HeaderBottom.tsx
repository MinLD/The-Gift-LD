"use client";
import { useStateStore } from "@/app/Context/StoreProvider";
import {
  DataHeaderBottom,
  DataIcons,
} from "@/app/Layout/Header/components/contants";
import MyLayOut from "@/app/MyLayout/layout";

import logo from "@/public/logo2.png";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function HeaderBottom() {
  const { setIsOpenMenu } = useStateStore();
  const router = useRouter();

  const handlePushRouter = (name: number) => {
    if (name === 1) {
      router.push("/Authentication/Login");
    }
  };

  return (
    <div className="w-full min-h-[70px] h-auto  bg-[#ffffff]  shadow-2xl flex justify-center items-center ">
      <MyLayOut>
        <div className="flex  w-full justify-between items-center ">
          <div className="gap-5 items-center hidden xl:flex w-[406.59px]">
            {DataHeaderBottom.slice(0, 4).map((item) => (
              <div key={item.id} className="cursor-pointer text-lg font-medium">
                {item.name}
              </div>
            ))}
          </div>
          <div
            className="xl:hidden w-[68px] md:w-[112px] hover:cursor-pointer"
            onClick={() => setIsOpenMenu(true)}
          >
            <Menu size={32} strokeWidth={2.25} />
          </div>
          <div className="flex items-center justify-center w-[100px] h-[70px]">
            <Image src={logo.src} alt="logo" className="w-[60px] h-[45px]" />
          </div>
          <div className="flex gap-5 items-center">
            <div className="xl:flex gap-5 items-center hidden">
              {DataHeaderBottom.slice(4, DataHeaderBottom.length).map(
                (item) => (
                  <div
                    key={item.id}
                    className="cursor-pointer text-lg font-medium"
                  >
                    {item.name}
                  </div>
                )
              )}
            </div>
            <div className="flex gap-5 items-center">
              {DataIcons.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handlePushRouter(item.id)}
                  className={`cursor-pointer hover:opacity-50  ${
                    item.id === 0 && "hidden md:block"
                  }`}
                >
                  <item.name />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative mb-3 md:hidden block">
          <input
            type="text"
            className="w-full pl-10 border-0 rounded-2xl bg-[#f5f5f5]  h-[35px] text-[#000000] "
            placeholder="nhập từ khóa tìm kiếm"
          />
          <div className="absolute top-1/2 left-3 transform translate-y-[-50%] text-[#000000]">
            <Search size={20} strokeWidth={2.25} />
          </div>
        </div>
      </MyLayOut>
    </div>
  );
}

export default HeaderBottom;
