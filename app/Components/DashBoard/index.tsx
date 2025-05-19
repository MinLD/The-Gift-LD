"use client";
import HeaderDashBoard from "@/app/Components/LayoutDashBoard/HeaderDashBoard";
import Sibar from "@/app/Components/Sibar";
import DashBoardManagementAdmin from "@/app/ComponentsAdmin/DashBoardManagement";
import ProductsManagement from "@/app/ComponentsAdmin/ProductsManagement";
import UsersManagement from "@/app/ComponentsAdmin/UsersManagement";
import { useSidebar } from "@/app/zustand/sidebar";
import { ChartBarStacked, UserCog } from "lucide-react";
import { useState } from "react";

function DashBoard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { TypeSide } = useSidebar();
  const data = [
    {
      title: "Quản lý",
      label: [
        { id: "UsersManagement", name: "Quản lý người dùng", icon: UserCog },
        {
          id: "ProductsManagement",
          name: "Quản lý Danh mục sản phẩm",
          icon: ChartBarStacked,
        },
      ],
    },
  ];

  const renderComponent = () => {
    switch (TypeSide) {
      case "UsersManagement":
        return <UsersManagement />;

      case "ProductsManagement":
        return <ProductsManagement />;
      default:
        return <DashBoardManagementAdmin />;
    }
  };
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sibar isSidebarOpen={isSidebarOpen} data={data} />

      <div className={`flex-1 mx-auto `}>
        <div className="">
          <HeaderDashBoard
            isOpenSibar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>

        <div className="pt-5 px-6 bg-gray-100 max-h-[592px] overflow-y-scroll">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
