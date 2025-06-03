"use client";
import DashBoard from "@/app/Components/DashBoard";
import DashBoardManagementAdmin from "@/app/ComponentsAdmin/DashBoardManagement";
import AccountSellerManagement from "@/app/ComponentsSeller/AccountSellerManagement";
import AddressSellerManagement from "@/app/ComponentsSeller/AddressSellerManagement";
import CreateProductsSellerManagement from "@/app/ComponentsSeller/CreateProductsSellerManagement";
import ProductsSellerManagement from "@/app/ComponentsSeller/ProductsSellerManagement";
import { useSidebar } from "@/app/zustand/sidebar";
import { MapPinHouse, Store, UserCog } from "lucide-react";

function Page() {
  const data = [
    {
      title: "QUẢN LÝ SẢN PHẨM",
      label: [
        {
          id: "ProductsSellerManagement",
          name: "Tất Cả Sản Phẩm",
          icon: UserCog,
        },
        {
          id: "CreateProductsSellerManagement",
          name: "Thêm Sản Phẩm",
          icon: Store,
        },
      ],
    },
    {
      title: "Thiết lập shop",
      label: [
        {
          id: "AccountSellerManagement",
          name: "Tài Khoản",
          icon: UserCog,
        },
        {
          id: "CategoriesManagement",
          name: "Thiết Lập Shop",
          icon: Store,
        },
        {
          id: "AddressManagement",
          name: "Địa Chỉ",
          icon: MapPinHouse,
        },
      ],
    },
    // {
    //   title: "Tài Chính",
    //   label: [
    //     {
    //       id: "AccountSellerManagement",
    //       name: "Doanh Thu",
    //       icon: UserCog,
    //     },
    //     {
    //       id: "CategoriesManagement",
    //       name: "Số dư Tài khoản TheCraftLD",
    //       icon: Store,
    //     },
    //     {
    //       id: "AddressManagement",
    //       name: "Tài Khoản Ngân hàng",
    //       icon: MapPinHouse,
    //     },
    //     {
    //       id: "AddressManagement",
    //       name: "Thiết lập Thanh toán",
    //       icon: MapPinHouse,
    //     },
    //   ],
    // },
  ];
  const { TypeSide } = useSidebar(); // Đổi tên TypeSide thành selectedTab

  const renderComponent = () => {
    switch (TypeSide) {
      case "AccountSellerManagement":
        return <AccountSellerManagement />;
      case "AddressManagement":
        return <AddressSellerManagement />;
      case "CreateProductsSellerManagement":
        return <CreateProductsSellerManagement />;

      case "ProductsSellerManagement":
        return <ProductsSellerManagement />;

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
