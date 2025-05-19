"use client";
import { DeleteCookie } from "@/app/Service/ServerComponents";
import { useProfileStore } from "@/app/zustand/store";
import { ChevronDown, ChevronUp, CircleUserRound, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { useStateStore } from "@/app/Context/StoreProvider";

function HeaderOrthers() {
  const data = [
    {
      id: 1,
      name: "Profile",
    },
    {
      id: 2,
      name: "Settings",
    },
    {
      id: 3,
      name: "Log out",
    },
  ];
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const { User, Avt } = useProfileStore();
  const { setIsOpenMenu } = useStateStore();
  const handleReturnComponent = async (id: number) => {
    if (id === 1) {
      router.push("/accounts/profile");
    }
    if (id === 2) {
      router.push("/accounts/settings");
    }
    if (id === 3) {
      await DeleteCookie();
      Cookies.remove("token");
      Cookies.remove("roles");
      localStorage.clear();
      Cookies.remove("sessionToken");
      router.push("/Authentication/Login");
    }
  };

  return (
    <div className="bg-[#ffffff] h-[87px] w-full flex items-center justify-center">
      <div className="mx-auto w-[92vw] lg:w-[75vw] xl:w-[80vw] ">
        <div className=" flex  justify-between items-center ">
          <div
            className="sm:hidden w-[68px] md:w-[112px] hover:cursor-pointer"
            onClick={() => setIsOpenMenu(true)}
          >
            <Menu size={32} strokeWidth={2.25} />
          </div>
          <div className="flex gap-5 justify-center items-center">
            <div
              className=""
              onClick={() => {
                router.push("/");
              }}
            >
              <Image
                className="LTODq"
                width="112"
                height="59"
                src="https://cdn.shopify.com/s/files/1/1104/4168/files/Allbirds.Logo.Black.RGB.Large_112x112.png?v=1613734536.webp"
                alt="Allbirds logo"
              />
            </div>
            <div
              className="hidden sm:block hover:cursor-pointer hover:bg-[#f5f5f5] px-3 py-2  rounded-xl"
              onClick={() => router.push("/")}
            >
              Shop
            </div>
            <div className="hidden sm:block hover:cursor-pointer hover:bg-[#f5f5f5] px-3 py-2 rounded-xl relative">
              <span
                className="relative"
                onClick={() => router.push("/accounts/orthers")}
              >
                Orthers
                <div className="absolute w-full left-0 bottom-0 h-[1px] bg-[#333333]" />
              </span>
            </div>
          </div>
          <div className="sm:hidden"></div>

          <div
            className="hidden hover:cursor-pointer hover:bg-[#f5f5f5] px-3 py-2 rounded-xl text-[#333333] sm:flex gap-1 justify-center items-center relative"
            onClick={() => setShowMenu(!showMenu)}
          >
            <div>
              {Avt ? (
                <p className="rounded-full  w-[35px] h-[35px] flex items-center justify-center text-[12px] font-black bg-[#f5f5f5] ">
                  {Avt}
                </p>
              ) : (
                <CircleUserRound size={30} />
              )}
            </div>
            {showMenu ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            {showMenu && (
              <div className="absolute w-[auto] min-w-[300px] mx-auto h-auto bg-[#ffffff] top-[50px]  lg:right-auto right-[-10px] border-[1px] rounded-2xl p-2 border-[#333333] ">
                <div className="flex gap-2 items-center  mt-3 border-b-[1px] border-[#707070] pb-3 ">
                  {" "}
                  <div className="flex  gap-2 items-center">
                    <div>
                      {Avt ? (
                        <p className="rounded-full  w-[35px] h-[35px] flex items-center justify-center text-[12px] font-black bg-[#f5f5f5] ">
                          {Avt}
                        </p>
                      ) : (
                        <CircleUserRound size={30} />
                      )}
                    </div>
                    <div className="">
                      <p className="text-[#333333] font-bold">
                        {User?.profileUser?.fullName}
                      </p>
                      <p className="text-gray-500">{User?.email}</p>
                    </div>
                  </div>
                </div>

                <div>
                  {data.map((item) => (
                    <div
                      key={item.id}
                      className="hover:bg-[#f5f5f5] px-3 py-2 rounded-xl mt-3 hover:cursor-pointer"
                      onClick={() => handleReturnComponent(item.id)}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderOrthers;
