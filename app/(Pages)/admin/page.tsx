"use client";
import DashBoard from "@/app/Components/DashBoard";
import DashBoardManagementAdmin from "@/app/ComponentsAdmin/DashBoardManagement";
import CategoriesManagement from "@/app/ComponentsAdmin/ProductsManagement";
import UsersManagement from "@/app/ComponentsAdmin/UsersManagement";
import { useSidebar } from "@/app/zustand/sidebar";
import { ChartBarStacked, UserCog } from "lucide-react";

function Page() {
  const data = [
    {
      title: "Quản lý",
      label: [
        { id: "UsersManagement", name: "Quản lý người dùng", icon: UserCog },
        {
          id: "CategoriesManagement",
          name: "Quản lý Danh mục sản phẩm",
          icon: ChartBarStacked,
        },
      ],
    },
  ];
  const { TypeSide } = useSidebar(); // Đổi tên TypeSide thành selectedTab

  const renderComponent = () => {
    switch (TypeSide) {
      case "UsersManagement":
        return <UsersManagement />;
      case "CategoriesManagement":
        return <CategoriesManagement />;
      default:
        return <DashBoardManagementAdmin />;
    }
  };

  return (
    <>
      <DashBoard data={data} renderComponent={renderComponent} />
    </>
  );
}

export default Page;
