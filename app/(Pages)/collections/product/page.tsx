"use client";
import LoadingOverlay from "@/app/Components/LoaddingOverlay";
import MyLayOut from "@/app/MyLayout/layout";
import { GetByProductId } from "@/app/Service/products";
import { GetSeller } from "@/app/Service/Seller";
import { Check, MessageSquareText, Minus, Plus, Store } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
type dataSeller = {
  id: number;
  name: string;
  image: {
    url: string | null;
  };
  description: string;
  taxCode: string;
  phone: string;
};
type dataProduct = {
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
  id_Seller: number;
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

function ProductDetail() {
  const [options, setOptions] = useState<string>("");
  const searchParams = useSearchParams();
  const id = searchParams.get("aa") || "0"; // Mặc định là "0" nếu không có ID
  const name = searchParams.get("bb") || "Không có tên";
  const title = searchParams.get("cc") || "Không có mô tả";
  const [products, setProducts] = useState<dataProduct | null>(null);
  const [seller, setSeller] = useState<dataSeller | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState<string>("");

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent quantity from going below 1
  };

  const handleGetProduct = async () => {
    try {
      setIsLoading(true);
      const res = await GetByProductId(Number(id));
      setProducts(res.data.result);
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetSeller = async (id: number) => {
    await GetSeller(id)
      .then((res) => {
        setSeller(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id !== "0") {
      handleGetProduct();
    }
  }, [id]);

  useEffect(() => {
    if (products && products.images.length > 0) {
      setCurrentImageIndex(products.images[0].url || "");
      handleGetSeller(products.id_Seller);
    }
  }, [products]);

  if (isLoading) {
    return (
      <MyLayOut>
        <div className="min-h-screen w-full mt-10 flex justify-center items-center">
          <LoadingOverlay message="Đang tải..." />
        </div>
      </MyLayOut>
    );
  }

  if (!products) {
    return (
      <MyLayOut>
        <div className="min-h-screen w-full mt-10 flex justify-center items-center">
          <p>Không tìm thấy sản phẩm</p>
        </div>
      </MyLayOut>
    );
  }
  return (
    <div className="min-h-screen w-full pt-10 bg-[#ffffff]">
      <MyLayOut>
        {/* sản phẩm */}
        <div className="bg-[#ffffff] w-full flex lg:gap-10 xl:gap-1 gap-5 flex-col md:flex-row">
          <div className="md:w-[50vw] w-full ">
            <div className="lg:flex-row flex gap-5 flex-col ">
              <div className="md:max-w-[38vw] w-full aspect-square ">
                <Image
                  alt={`Hình ảnh chính của sản phẩm ${products.title}`}
                  src={currentImageIndex || "/fallback-image.jpg"}
                  width={300}
                  height={300}
                  quality={85}
                  placeholder="empty"
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
              <div className="lg:w-[5vw] w-full space-y-2 flex gap-2 flex-row lg:flex-col items-center">
                {products.images.map((item, index) => (
                  <div
                    className={`w-[64px] h-[64px] border-b-2 border-[#272727] cursor-pointer pb-2 ${
                      currentImageIndex === item.url
                        ? "border-b-2 border-[#272727]"
                        : "border-b-2 border-transparent"
                    }`}
                    key={index}
                    onClick={() => setCurrentImageIndex(item.url || "")}
                  >
                    <Image
                      alt={`Hình ảnh ${index + 1} của sản phẩm ${
                        products.title
                      }`}
                      src={item.url || "/fallback-image.jpg"}
                      width={64}
                      height={64}
                      placeholder="empty"
                      quality={85}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:w-[45vw] w-full">
            <h2 className="text-[16px] text-[#272727]">
              <span
                className="text-[16px] text-[#272727] hover:text-[#F15D2F] hover:cursor-pointer"
                onClick={() => {
                  router.push("/");
                }}
              >
                Home
              </span>{" "}
              / <span>{name}</span> / <span>{title}</span>
            </h2>

            <h2 className="text-[48px] mt-5">{products.title}</h2>

            <div className="flex items-center gap-2 mt-5">
              <p className="text-[#F15D2F] text-[20px]">
                {typeof products.price === "number"
                  ? products.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : "N/A"}
              </p>
              <p className="text-[#7c7c7c] line-through text-[16px]">
                {typeof products.price === "number"
                  ? (products.price * 1.3).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : "N/A"}
              </p>
            </div>

            <p className="text-[16px] mt-5" style={{ whiteSpace: "pre-line" }}>
              {products.description}
            </p>

            {products.attributes && products.attributes.length > 0 && (
              <div className="mt-10">
                {products.attributes.map((item, index) => (
                  <div className="">
                    <h2 className="text-[16px] mt-5 text-[#646464]">
                      {item.name}
                    </h2>
                    <div className="grid grid-cols-2 gap-2">
                      {item.attributesValues.map((item, index) => (
                        <div
                          onClick={() => setOptions(item.name)}
                          className={`${
                            options === item.name
                              ? "border-[#F15D2F] text-[#F15D2F]"
                              : ""
                          } hover:text-[#F15D2F] relative mt-3 flex gap-2 items-center border-1 border-[#646464] w-auto h-[50px] p-1 hover:cursor-pointer hover:border-[#F15D2F]`}
                        >
                          <Image
                            alt={`Hình ảnh ${index + 1} của sản phẩm ${
                              products.title
                            }`}
                            src={item.image.url || "/fallback-image.jpg"}
                            width={24}
                            height={24}
                            placeholder="empty"
                            quality={85}
                            className="w-[40px] h-[40px] object-cover "
                          />
                          <span className="text-[16px] w-8 text-center ">
                            {item.name}
                          </span>
                          {options === item.name && (
                            <div className="absolute bottom-0 right-0 bg-[#F15D2F] text-white rounded-tl-[100%] flex justify-center items-center w-3 h-3">
                              <Check size={15} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col">
              <label
                className="text-[16px] mt-5 text-[#646464]"
                htmlFor="quantity"
              >
                Số lượng:
              </label>
              <div className="mt-3 flex items-center border border-[#272727] w-[120px] h-[50px] justify-between rounded-md">
                <button
                  className="cursor-pointer flex justify-center items-center w-8 h-8  "
                  onClick={handleDecrement}
                  aria-label="Decrease quantity"
                  disabled={quantity === 1}
                >
                  <Minus size={15} />
                </button>
                <span
                  className="text-[16px] w-8 text-center  text-[#F15D2F]"
                  id="quantity"
                >
                  {quantity}
                </span>
                <button
                  className="cursor-pointer flex justify-center items-center w-8 h-8 "
                  onClick={handleIncrement}
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              <div className="flex gap-2 sm:flex-row flex-col mt-5">
                <button className="font-bold hover:cursor-pointer w-full h-[50px] bg-[#FFB74A] text-white hover:bg-transparent border border-[#FFB74A] hover:text-[#FFB74A]">
                  Add to cart
                </button>
                <button className="font-bold hover:cursor-pointer  w-full h-[50px] bg-[#272727] text-white hover:bg-transparent border border-[#272727] hover:text-[#272727]">
                  Buy it now
                </button>
              </div>
              {/* Shop  */}
              <div className="w-full h-auto flex gap-5 bg-[#ffffff] mt-10 items-center">
                <div className="w-[80px] h-[80px] border-1 border-[#d8d8d8] rounded-full relative">
                  <Image
                    alt=""
                    src={seller?.image?.url || ""}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="text-xs w-[70px] h-5 bg-[#EE4D2D] text-white  flex items-center justify-center absolute bottom-0 left-1/2 -translate-x-1/2 rounded-sm">
                    Yêu Thích
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h2 className="text-[16px] text-[#272727] ">
                    {" "}
                    {seller?.name}
                  </h2>
                  <div className="flex  gap-2">
                    <div className="text-[16px] flex gap-2 items-center bg-[#FFEEE8] p-1 border border-[#EE4D2D] hover:cursor-pointer  hover:text-white">
                      <MessageSquareText size={20} color="#EE4D2D" />{" "}
                      <span className="text-[#EE4D2D]">Chat Ngay</span>
                    </div>
                    <div className="text-[16px] flex gap-2 items-center p-1 border border-[#c5c5c5] hover:cursor-pointer ">
                      <Store size={20} /> Xem Shop
                    </div>
                  </div>
                </div>

                <div className="w-[1px] opacity-15 h-[50px] bg-[#9999A9] rounded-2xl" />
              </div>
              {/* chi tiết sản phẩm */}
              <div className="bg-white mt-10 rounded-lg  mb-20 max-w-sm w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Chi tiết sản phẩm
                </h2>

                <div className="space-y-3 ">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">SKU:</span>
                    <span className="text-gray-800">{products.sku}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Số lượng tồn kho:
                    </span>
                    <span className="text-gray-800">{products.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Kiểu dáng:
                    </span>
                    <span className="text-gray-800">{products.style}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Chất liệu:
                    </span>
                    <span className="text-gray-800">{products.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Thương hiệu:
                    </span>
                    <span className="text-gray-800">{products.trademark}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Xuất xứ:</span>
                    <span className="text-gray-800">{products.origin}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MyLayOut>
    </div>
  );
}

export default ProductDetail;
