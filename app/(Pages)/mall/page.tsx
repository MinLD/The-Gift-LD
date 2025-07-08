"use client";
import ProductItem from "@/app/Components/ProductItem";
import MyLayOut from "@/app/MyLayout/layout";
import { GetAllCategories } from "@/app/Service/Admin";
import { GetAllProductsMySeller } from "@/app/Service/products";
import { GetMyProducts, GetSeller } from "@/app/Service/Seller";
import {
  ChevronDown,
  CircleChevronLeft,
  CircleChevronRight,
  Logs,
  MessageSquareMore,
  Plus,
  Star,
  StepForward,
  StepForwardIcon,
  Store,
  UserCheck,
  UserCheckIcon,
  UserRoundPlus,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type data = {
  name: string;
  description: string;
  image: {
    url: string | null;
  };
  createdAt: Date;
  productsCount: number;
};
type dataProduct = {
  views: number;
  sku: string;
  id: number;
  title: string;
  description: string;
  price: number;
  category: number;
  trademark: string;
  origin: string;
  style: string;
  material: string;
  discount: number;
  quantity: number;
  images: {
    url: string | null;
  }[];
  attributes: {
    name: string;
    id: string;
    attributesValues: {
      name: string;
      id: string;
      price: number;
      quantity: number;
      image: {
        url: string | null;
      };
    }[];
  }[];
};
type dataCategory = {
  name: string;
  id: number;
};

function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("idSeller") || "0";
  const nameSeller = searchParams.get("nameSeller") || "0";
  const [seller, setSeller] = useState<data | null>(null);
  const [products, setProducts] = useState<dataProduct[]>([]);
  const [categorys, setCategories] = useState<dataCategory[]>([]);
  const [fillter, setFillter] = useState<boolean>(false);
  const [GetCategory, setGetCategory] = useState<Number>(-1);
  const calculateParticipationTime = (startDate: string | Date) => {
    const now = new Date();
    const start = new Date(startDate);
    const timeDiff = now.getTime() - start.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
    // Lựa chọn đơn vị lớn nhất
    if (years > 0) return `${years} Năm`;
    if (months > 0) return `${months} Tháng`;
    if (days > 0) return `${days} Ngày`;
    if (hours > 0) return `${hours} Giờ`;
    if (minutes > 0) return `${minutes} Phút`;
    return `${seconds} Giây`;
  };
  const data = [
    {
      name: "Sản phẩm:",
      icon: Store,
      value: seller?.productsCount,
    },
    {
      name: "Người Theo Dỗi:",
      icon: Users,
      value: 0,
    },
    {
      name: "Đang Theo:",
      icon: UserRoundPlus,
      value: 0,
    },
    {
      name: "Tỷ Lệ Phản Hồi Chat:",
      icon: MessageSquareMore,
      value: "100% (Trong Vài Giờ)",
    },
    {
      name: "Đánh Giá:",
      icon: Star,
      value: "0",
    },
    {
      name: "Tham Gia:",
      icon: UserCheckIcon,
      value:
        calculateParticipationTime(seller?.createdAt.toString() || "") +
        " Trước",
    },
  ];
  const category = [
    {
      id: 0,
      name: "Phổ Biến",
    },
    {
      id: 1,
      name: "Mới Nhất",
    },
    {
      id: 2,
      name: "Bán Chạy",
    },
  ];

  const handleGetSeller = async () => {
    await GetSeller(Number(id))
      .then((res) => {
        setSeller(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  const handleGetProductMySeller = async () => {
    if (GetCategory != -1) {
      await GetMyProducts(Number(id), Number(GetCategory))
        .then((res) => {
          setProducts(res.data.result);
        })
        .catch((err) => console.log(err));
      return;
    }
    await GetAllProductsMySeller(Number(id))
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  const handleGetAllCategories = async () => {
    await GetAllCategories()
      .then((res) => {
        setCategories(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleGetSeller();
    handleGetProductMySeller();
    handleGetAllCategories();
  }, [id, nameSeller, GetCategory]);

  console.log(products);
  console.log(categorys);
  console.log(GetCategory);

  return (
    <div className="w-full h-auto">
      <MyLayOut>
        <div className="flex gap-10 mt-10">
          <div className="relative  rounded-2xl ">
            <div
              style={{ backgroundImage: `url(${seller?.image.url})` }}
              className="w-[390px] h-[135px] bg-cover bg-center  blur-[1px] rounded-2xl"
            >
              <div className="w-[390px] h-[135px] bg-[#000000] opacity-30 rounded-2xl"></div>
            </div>
            <div className="absolute top-0 left-0   py-2 px-5 ">
              <div className="flex gap-2">
                <div className=" relative bg-amber-50 p-[1px] flex items-center justify-center rounded-full w-[82px] h-[82px]">
                  <Image
                    placeholder="empty"
                    quality={85}
                    priority
                    alt=""
                    src={seller?.image.url || "/fallback-image.jpg"}
                    width={300}
                    height={300}
                    className="rounded-full bg-white w-[72px] h-[72px] object-cover"
                  />
                  <div className="text-xs w-[70px] h-5 bg-[#EE4D2D] text-white  flex items-center justify-center absolute bottom-0 left-1/2 -translate-x-1/2 rounded-sm">
                    Yêu Thích
                  </div>
                </div>
                <div className="flex flex-col gap-1  justify-center">
                  <h2 className="text-[16px] text-[#ffffff] font-medium">
                    {nameSeller}
                  </h2>
                  <h2 className="text-[14px] text-[#FFFFFFB2]  ">
                    {" "}
                    Online 6 phút trước
                  </h2>
                </div>
              </div>
            </div>
            <div className=" mt-2 flex gap-2 absolute bottom-2 left-1/2 -translate-x-1/2 w-[390px] px-5">
              <div className="p-1 flex-1 border-1 border-[#d8d8d8] rounded-[1px] flex gap-1 justify-center items-center text-[#ffffff] text-[12px]">
                <Plus size={15} />
                Theo Dõi
              </div>
              <div className="p-1 flex-1 border-1 border-[#d8d8d8] rounded-[1px] flex gap-1 justify-center items-center text-[#ffffff] text-[12px]">
                <MessageSquareMore size={15} />
                Nhắn Tin
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2  gap-2  w-full items-center">
            {data.map((i, k) => (
              <div key={k} className="flex  gap-2 ">
                <i.icon size={17} />
                <p className="text-[15px] text-[#272727]">{i.name}</p>
                <p className="text-[15px] text-[#EE4D2D]">
                  {i.value?.toString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex gap-5 mb-20">
          <div className="w-[12vw]">
            <div className="flex gap-2 items-center ">
              <Logs size={17} />
              <h2 className="text-[17px] text-[#272727] font-medium">
                Danh Mục
              </h2>
            </div>
            <div className="w-full h-[1px] bg-[#e9e9e9] mt-3 mb-3" />

            <div className="px-1 space-y-2">
              <div
                className="flex gap-2 items-center"
                onClick={() => setGetCategory(-1)}
              >
                <StepForwardIcon size={15} color="#EE4D2D" />
                <h2
                  className={`text-[${
                    GetCategory === -1 ? "#EE4D2D" : "#272727"
                  }] text-[14px] font-medium`}
                >
                  Sản Phẩm
                </h2>
              </div>
              {categorys?.map((i, k) => (
                <div
                  key={k}
                  className="flex gap-2 "
                  onClick={() => setGetCategory(i.id)}
                >
                  <StepForwardIcon size={15} color="#EE4D2D" />
                  <h2
                    className={`text-[${
                      GetCategory === i.id ? "#EE4D2D" : "#272727"
                    }] text-[14px] font-medium`}
                  >
                    {i.name}
                  </h2>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            {/* Fillter */}
            <div className="w-full h-[60px] bg-[#ededed] flex justify-between items-center py-2 px-5">
              <div
                className="flex gap-2 items-center"
                onMouseLeave={() => setFillter(false)}
              >
                <h2 className="text-[15px] text-[#272727]">Sắp xếp theo</h2>
                <div className="flex gap-2">
                  {category?.map((i, k) => (
                    <div
                      className={`bg-[${
                        i.id == 0 ? "#EE4D2D" : "#ffffff"
                      }] p-2 rounded-[1px]`}
                      key={k}
                    >
                      <h2
                        className={`text-[14px] text-[${
                          i.id === 0 ? "#ffffff" : "#272727"
                        }] font-medium`}
                      >
                        {i.name}
                      </h2>
                    </div>
                  ))}
                </div>
                <div
                  className="relative w-[200px] p-2 bg-[#ffffff] flex items-center justify-between "
                  onClick={() => setFillter(!fillter)}
                  onMouseEnter={() => setFillter(true)}
                >
                  <h2 className={`text-[14px] text-["#272727"] font-medium`}>
                    Giá
                  </h2>
                  <ChevronDown />
                  {fillter && (
                    <div className="z-10 absolute inset-0 top-9 bg-[#ffffff] border-t-1 border-[#d8d8d8] shadow-sm w-[200px] h-[70px] p-2 px-3">
                      <h2
                        className={`text-[14px] text-["#272727"] font-medium`}
                      >
                        Giá: Thấp đến Cao
                      </h2>
                      <h2
                        className={`text-[14px] text-["#272727"] font-medium mt-2`}
                      >
                        Giá: Cao đến Thấp
                      </h2>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  1/16
                  <CircleChevronLeft size={25} />
                  <CircleChevronRight size={25} />
                </div>
              </div>
            </div>
            {/* prouducts */}

            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-4 gap-15 mt-5">
                  {products?.map((i, k) => (
                    <div key={k} className="w-full h-[300px]">
                      <ProductItem
                        key={k}
                        title={i.title || ""}
                        image1={i.images[0].url || ""}
                        image2={i.images[1]?.url || ""}
                        price={i.price}
                        discount={i.discount}
                        views={i.views}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="w-full h-[300px] flex justify-center items-center">
                <h2 className="text-[17px] text-[#272727] font-medium">
                  Không có sản phẩm
                </h2>
              </div>
            )}
          </div>
        </div>
      </MyLayOut>
    </div>
  );
}

export default page;
