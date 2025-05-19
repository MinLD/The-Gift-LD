"use client";

import { useSidebar } from "@/app/zustand/sidebar";
import {
  Bell,
  CircleUserRound,
  Languages,
  Logs,
  Mail,
  Menu,
  SunMoon,
} from "lucide-react";

type Props = {
  isOpenSibar: () => void;
};
function HeaderDashBoard({ isOpenSibar }: Props) {
  const data = [
    {
      id: 1,
      name: "Dashboard",
    },
  ];
  const icons = [
    {
      id: 0,
      name: Bell,
    },
    {
      id: 1,
      name: Logs,
    },
    {
      id: 2,
      name: Mail,
    },
    {
      id: 3,
      name: Languages,
    },
    {
      id: 4,
      name: SunMoon,
    },
    {
      id: 5,
      name: CircleUserRound,
    },
  ];
  const { TypeSide } = useSidebar();

  return (
    <>
      <div className="w-full h-[80px] bg-[#ffffff] py-6 px-[1vw] border-b-1 border-[#d9d9d9]">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div
              className=" hover:cursor-pointer"
              onClick={() => isOpenSibar()}
            >
              <Menu size={25} strokeWidth={1.25} />
            </div>
            {data.map((item) => (
              <div key={item.id} className="text-[16px]">
                {item.name}
              </div>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            {icons.map((i) => (
              <div
                key={i.id}
                className="hover:cursor-pointer flex gap-2 items-center"
              >
                <i.name size={25} strokeWidth={1.25} />

                {i.id !== 5 && <div className="w-px h-6 bg-[#d9d9d9] " />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-[25px] bg-[#ffffff] py-5 px-[3vw] border-b-1 border-[#d9d9d9] flex items-center">
        <p className="text-[15px] ">Home / {TypeSide}</p>
      </div>
    </>
  );
}

export default HeaderDashBoard;
