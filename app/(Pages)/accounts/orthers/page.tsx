"use client";

import { GetOrder } from "@/app/Service/Order";
import {
  Check,
  ChevronDown,
  CircleAlert,
  LayoutGrid,
  ListFilter,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type Order = {
  createdAt: Date;
  items: items[];
  orderId: number;
  paymentMethod: string;
  shippingAddress: {
    id: number;
    name: string;
    phone: string;
    address: string;
    detailsAddress: string;
  };
  status: string;
  totalPrice: number;
  updatedAt: Date;
}[];
type items = {
  id: number;
  products_order: {
    atributes_Value: string;
    atributes_name: string;
    id: number;
    id_atributes_name: number;
    id_atributes_value: number;
    id_product: number;
    id_seller: number;
    id_user: number;
    images: { url: string }[];
    name: string;
    price: number;
  };
  quantity: number;
  unitPrice: number;
};

function OrthersPage() {
  const [order, setOrder] = useState<Order>([]);
  const router = useRouter();
  const handleGetOrder = async () => {
    await GetOrder()
      .then((res) => {
        console.log(res);
        setOrder(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleGetOrder();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Đơn hàng</h2>
        <div className="flex gap-2 items-center justify-center">
          <div className="bg-[#ffff] p-2 rounded-md flex items-center justify-center gap-2">
            <LayoutGrid size={20} />
            <h2 className="">Bố cục</h2>
            <ChevronDown size={15} />
          </div>
          <div className="bg-[#ffff] p-2 rounded-md flex items-center justify-center gap-2">
            <ListFilter size={20} />
          </div>
        </div>
      </div>
      {order.length === 0 ? (
        <div className="w-full h-[200px] bg-[#ffffff] mt-10 rounded-2xl flex items-center justify-center">
          <p>No orders yet Go to store to place an order.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1  gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-5">
          {order.map((item, key) => (
            <div
              onClick={() => router.push(`/accounts/orthers/${item.orderId}`)}
              key={key}
              className="bg-[#ffffff] w-full flex-1  rounded-2xl flex px-4 py-5 flex-col  h-auto justify-between shadow-md cursor-pointer"
            >
              <div>
                <div className="bg-[#f5f5f5] w-full h-auto rounded-2xl p-3">
                  <div className="flex gap-2">
                    <Check />
                    <div>
                      <p>Confirmed</p>
                      <p>Jun 28</p>
                    </div>
                  </div>
                </div>

                {/* Phần hiển thị sản phẩm */}
                <div className="mt-5 mb-5 relative">
                  {item.items.length === 1 ? (
                    // Trường hợp 1 sản phẩm: Ảnh full width
                    <div>
                      <Image
                        src={item.items[0].products_order.images[0].url}
                        alt={
                          item.items[0].products_order.name || "Product image"
                        }
                        className="h-auto w-full object-cover rounded-2xl"
                        width={500}
                        height={800}
                        priority
                      />
                    </div>
                  ) : (
                    // Trường hợp 2, 3, hoặc 4+ sản phẩm
                    <div
                      className={`grid ${
                        item.items.length === 2
                          ? "grid-cols-2 gap-1"
                          : "grid-cols-2 gap-1"
                      }`}
                    >
                      {item.items.slice(0, 4).map((j, key) => (
                        <div key={key}>
                          <Image
                            src={j.products_order.images[0].url}
                            alt={j.products_order.name || "Product image"}
                            className="h-[140px] w-full object-cover rounded-2xl"
                            width={500}
                            height={800}
                            priority={key === 0}
                            style={
                              item.items.length === 2
                                ? { height: "calc(2 * (140px + 4px))" } // Chiều cao bằng 4 ảnh (giả sử mỗi ảnh ~180px + gap)
                                : {}
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Badge hiển thị số sản phẩm vượt quá 4 */}
                  {item.items.length > 4 && (
                    <div className="absolute bottom-2 right-2 bg-gray-800 text-white text-xl font-semibold rounded-full px-2 py-1">
                      +{item.items.length - 4}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-5">
                <h2>
                  Số lượng: {item.items.reduce((a, b) => a + b.quantity, 0)}
                </h2>
                <h2 className="text-sm">Mã đơn hàng: #{item.orderId}</h2>
                <div className="flex gap-2 mt-5">
                  <h2 className="font-bold">
                    đ{item.totalPrice.toLocaleString()}
                  </h2>
                  <div className="gap-2 justify-center items-center bg-[#f5f5f5] w-full h-auto rounded-2xl p-1 flex">
                    <CircleAlert size={20} />
                    <h2 className="text-sm">{order[0].paymentMethod}</h2>
                  </div>
                </div>
              </div>
              <button className="bg-[#f5f5f5] w-full h-auto rounded-2xl p-3 text-[#1773b0] font-medium border-1 border-[#c5c5c5]">
                Mua lại
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default OrthersPage;
