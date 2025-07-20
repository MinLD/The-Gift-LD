"use client";

import MyLayOut from "@/app/MyLayout/layout";
import { useProfileStore } from "@/app/zustand/store";
import logo from "@/public/logo2.png";
import { Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import zalo from "../../../../public/logo/zalo.png";
import face from "../../../../public/logo/face.png";
import { Apisearch } from "@/app/Service/Search";
import { toast } from "sonner";
import { useState, useCallback } from "react";
import { debounce } from "lodash"; // THÊM: Import lodash để sử dụng debounce
import { DataIcons } from "@/app/Layout/Header/components/contants";

type data = {
  products: {
    id: number;
    name: string;
    description: string;
    type: string;
  }[];
  stores: {
    id: number;
    name: string;
    description: string;
    type: string;
  }[];
};

function HeaderBottom() {
  const [dataSearch, setDataSearch] = useState<data | null>(null);
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const { User, Cart } = useProfileStore();

  // THÊM: Debounce hàm tìm kiếm để giảm số lượng gọi API
  const debouncedSearch = useCallback(
    debounce(async (keyword: string) => {
      if (!keyword.trim()) {
        setDataSearch(null);
        setIsShowSearch(false); // SỬA: Ẩn danh sách gợi ý khi từ khóa rỗng
        return;
      }

      try {
        const res = await Apisearch(keyword);
        // SỬA: Kiểm tra dữ liệu API rỗng hoặc không có sản phẩm/cửa hàng
        if (
          !res?.data?.data ||
          (!res.data.data.products.length && !res.data.data.stores.length)
        ) {
          setDataSearch(null);
        } else {
          setDataSearch(res.data.data);
        }
      } catch (err: any) {
        setDataSearch(null);
      }
    }, 100), // THÊM: Đợi 100ms trước khi gọi API
    []
  );

  // SỬA: Sử dụng debouncedSearch thay vì gọi API trực tiếp
  const handleGetSearch = (keyword: string) => {
    setIsShowSearch(true);
    setSearch(keyword);
    debouncedSearch(keyword);
  };

  const roles: boolean = User?.roles[0]?.name === "SELLER";

  const handlePushRouter = (name: number) => {
    if (name === 1) {
      router.push("/Authentication/Login");
    }
    if (name === 2) {
      router.push("/cart");
    }
  };

  // SỬA: Thêm kiểm tra từ khóa rỗng trước khi tạo query
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!search.trim()) {
        toast.warning("Vui lòng nhập từ khóa tìm kiếm."); // THÊM: Thông báo khi từ khóa rỗng
        return;
      }
      const query = new URLSearchParams({
        type: "search",
        keyword: search,
        dtp: dataSearch?.products.map((item) => item.id).join(",") || "",
        dts: dataSearch?.stores.map((item) => item.id).join(",") || "",
      });
      router.push(`/mall?${query}`);
      setIsShowSearch(false);
    }
  };

  return (
    <div
      className="w-full min-h-[70px] h-auto bg-[#f7f2eb] flex justify-center items-center"
      onClick={() => setIsShowSearch(false)}
    >
      <MyLayOut>
        <div className="flex justify-between w-full mt-2">
          <div className="flex gap-2 items-center">
            <h2
              className="text-[13px] text-center sm:text-[14px] hover:opacity-50 cursor-pointer"
              onClick={() => router.push("/seller/dashboard")}
            >
              {roles ? "Kênh Người Bán" : "Đăng ký bán hàng"}
            </h2>
            <div className="w-[2px] opacity-15 h-[15px] bg-[#f05626] rounded-2xl" />
            <div className="flex gap-1">
              <Image
                src={face}
                alt="logo"
                width={20}
                height={5}
                className="object-cover cursor-pointer"
              />
              <Image
                src={zalo}
                alt="logo"
                width={20}
                height={20}
                className="object-cover cursor-pointer"
              />
            </div>
          </div>
          <div className="flex gap-5 items-center">
            {DataIcons.slice(2, DataIcons.length).map((item) => (
              <div
                key={item.id}
                onClick={() => handlePushRouter(item.id)}
                className={`cursor-pointer hover:opacity-50 ${
                  item.id === 0 && "hidden md:block"
                }`}
              >
                <div className="flex items-center gap-1 text-[12px] sm:text-[14px]">
                  <item.name className="w-6 h-6" />
                  <p className="hidden sm:block">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <div
            className="flex items-center w-[100px] h-[70px]"
            onClick={() => router.push("/")}
          >
            <Image src={logo.src} alt="logo" width={70} height={65} />
          </div>
          <div className="w-full mt-3">
            <div
              className="relative"
              onClick={(e) => {
                e.stopPropagation(); // THÊM: Ngăn sự kiện click lan ra ngoài
                setIsShowSearch(true);
              }}
            >
              <input
                type="text"
                className="outline-none w-full flex-1 pl-4 border-b border-[#f05626] rounded-[5px] h-[45px] text-[#000000]"
                placeholder="nhập từ khóa tìm kiếm"
                id="id-search"
                value={search} // SỬA: Thêm value để đồng bộ input với state
                onKeyDown={handleKeyPress}
                onChange={(e) => handleGetSearch(e.target.value)}
              />
              <div className="hidden absolute top-1/2 right-3 transform translate-y-[-50%] text-[#ffffff] bg-[#f05626] w-[70px] h-[35px] sm:flex items-center justify-center">
                <Search size={20} strokeWidth={2.25} />
              </div>
              {isShowSearch &&
                search.trim() && ( // SỬA: Chỉ hiển thị khi có từ khóa
                  <div className="absolute top-13 left-0 w-[90%] p-2 bg-[#ffffff] space-y-2">
                    <>
                      <div className="flex gap-2 items-center text-[15px]">
                        <ShoppingBag
                          size={18}
                          color="#f05626"
                          strokeWidth={2.25}
                        />
                        <h2 className="text-[15px]">Tìm Shop "{search}"</h2>
                      </div>

                      {dataSearch?.products?.slice(0, 9).map((item) => (
                        <div key={item.id}>
                          <h2 className="text-[15px]">{item.name}</h2>
                        </div>
                      ))}
                    </>
                  </div>
                )}
            </div>
          </div>
          <div>
            <div className="flex gap-2 sm:gap-5">
              {DataIcons.slice(1, 2).map((item) => (
                <div
                  key={item.id}
                  onClick={() => handlePushRouter(item.id)}
                  className={`relative cursor-pointer hover:opacity-50 ${
                    item.id === 0 && "hidden md:block"
                  }`}
                >
                  <item.name size={30} />
                  {Cart?.items?.length && (
                    <div className="absolute top-0 right-0 text-[8px] w-[15px] h-[15px] bg-[#272727] font-medium rounded-full flex items-center justify-center text-white">
                      {Cart?.items?.length || ""}
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
