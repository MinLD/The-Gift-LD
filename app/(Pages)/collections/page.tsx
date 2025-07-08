"use client";
import ProductItem from "@/app/Components/ProductItem";
import { GetAllProductsMyCategory } from "@/app/Service/products";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function DetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("aa") || "Không có ID";
  const name = searchParams.get("bb") || "Không có tên";
  const description = searchParams.get("cc") || "Không có mô tả";
  const [products, setProducts] = useState<dataProduct[]>([]);
  const router = useRouter();

  const handlePushDetailProduct = (id_Product: number, title: string) => {
    const query = new URLSearchParams({
      aa: id_Product.toString(),
      bb: name,
      cc: title,
    });
    router.push(`/collections/product?${query}`);
  };

  const handleGetProduct = () => {
    GetAllProductsMyCategory(Number(id))
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleGetProduct();
  }, []);
  console.log(products);

  return (
    <div className="mt-15  min-h-screen">
      <h1 className="text-[80px] text-center text-[#272727]">{name}</h1>
      <h2 className="text-[16px] text-center mt-1 text-[#272727]">
        {description} Khám phá những sản phẩm chơi cao cấp, được yêu thích nhờ
        thiết kế tinh tế, chế tác thủ công tỉ mỉ và chất liệu bền vững.
      </h2>
      <div className="flex gap-10 px-[5vw] mt-25">
        <div className="w-[20vw] space-y-5">
          <div className="flex gap-2 items-center">
            {" "}
            <SlidersHorizontal size={20} />
            <p className="text-[17px]"> Filters</p>
          </div>
          <div className="w-full h-[1px] bg-[#E5E5E5]" />
          <div>In stock only</div>
          <div className="w-full h-[1px] bg-[#E5E5E5]" />
          <div>In stock only</div>
        </div>
        <div className="w-[80vw]">
          <div className="flex gap-5 items-center justify-end">
            <p className="text-[17px]">
              <span className="font-bold">Sort by: </span> Best selling
            </p>
            <div className="w-6 h-6  rounded-full bg-[#c5c5c5] flex justify-center items-center">
              <ChevronDown size={15} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5 w-full mt-5">
            {products.map((item, index) => (
              <div
                key={index}
                onClick={() => handlePushDetailProduct(item.id, item.title)}
              >
                <ProductItem
                  views={item.views}
                  discount={item.discount}
                  price={item.price}
                  title={item.title}
                  image1={item.images[0]?.url || ""}
                  image2={item.images[1]?.url || ""}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
