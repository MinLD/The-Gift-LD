"use client";
import ShowProductInCart from "@/app/Components/ShowProductInCart";
import { GetOrderById } from "@/app/Service/Order";
import { Check, ChevronDown, CornerDownLeft } from "lucide-react";
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
};
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
type Props = { id: number };
function DetailsOrderItem({ id }: Props) {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [isShowProduct, setIsShowProduct] = useState(false);
  const handleGetOrderById = async () => {
    await GetOrderById(Number(id))
      .then((res) => {
        console.log(res);
        setOrder(res.data.result);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleGetOrderById();
  }, []);

  return (
    <div>
      <div className="lg:hidden border-b border-[#d8d8d8] pb-5">
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsShowProduct((prev) => !prev)}
            aria-expanded={isShowProduct}
            aria-controls="product-list"
          >
            <p className="text-[#105989] font-medium">Hiển thị đơn hàng</p>
            <ChevronDown
              color="#105989"
              size={20}
              className={`transition-transform ${
                isShowProduct ? "rotate-180" : ""
              }`}
            />
          </button>
          <p className="font-bold text-xl">
            {order?.items?.length
              ? `₫${order.items
                  .reduce((sum, item) => sum + (item.unitPrice || 0), 0)
                  .toLocaleString("vi-VN")}`
              : "₫0"}
          </p>
        </div>

        <div
          id="product-list"
          className={`mt-5 overflow-hidden transition-max-h duration-600 ${
            isShowProduct ? "max-h-[1000px] " : "max-h-0"
          }`}
        >
          {isShowProduct && <ShowProductInCart order={order as Order} />}
        </div>
      </div>
      <div className="flex  flex-col gap-5 mt-4 md:flex-row md:justify-between">
        <div className="flex gap-3 items-center ">
          <span
            onClick={() => {
              router.back();
            }}
            className="cursor-pointer"
          >
            {" "}
            <CornerDownLeft size={20} />
          </span>

          <div>
            <h2 className="font-medium text-[18px]">Đơn hàng #Bd0{id}</h2>
            <h2 className="text-[14px]">
              Đã xác nhận {order?.createdAt.toString()}
            </h2>
          </div>
        </div>

        <button className="bg-[#f5f5f5] w-full h-auto rounded-xl p-2 py-3 md:max-w-[100px] text-[#1773b0] font-medium border-1 border-[#c5c5c5]">
          Mua lại
        </button>
      </div>

      <div className="flex gap-5">
        <div className="w-full flex-1">
          <div className="bg-[#fff] w-full h-auto rounded-2xl p-4  mt-5">
            <div className="flex gap-3">
              <Check />
              <div className="text-[14px] space-y-1">
                <p>Đã xác nhận</p>
                <p>{order?.createdAt.toString()}</p>
                <p className="">Chúng tôi đã nhận được đơn hàng của bạn</p>
              </div>
            </div>
          </div>

          <div className="bg-[#fff] w-full h-auto rounded-2xl p-3 mt-5">
            <div className="flex gap-4 flex-col">
              <p className="font-bold">Tin tức và ưu đãi</p>

              <p className="text-[14px]">
                Bạn sẽ nhận được email tiếp thị. Bạn có thể hủy đăng ký bất cứ
                lúc nào.
              </p>
              <div className="flex gap-2 items-center text-[14px]">
                <input
                  type="checkbox"
                  className="0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                Gửi email cho tôi với tin tức ưu đãi
              </div>
            </div>
          </div>

          <div className="bg-[#fff] w-full h-auto rounded-2xl p-3 mt-5">
            <div className="flex gap-4 flex-col md:grid md:grid-cols-2">
              <span className="flex gap-2 flex-col">
                {" "}
                <p className="font-bold">Thông tin liên lạc</p>
                <p className="text-[14px]">{order?.shippingAddress.name}</p>
                <p className="text-[14px]">{order?.shippingAddress.phone}</p>
              </span>
              <span className="flex gap-2 flex-col">
                <p className="font-bold">Địa chỉ giao hàng</p>
                <p className="text-[14px]">{order?.shippingAddress.address}</p>
                <p className="text-[14px]">
                  {order?.shippingAddress.detailsAddress}
                </p>
              </span>
              <span className="flex gap-2 flex-col">
                <p className="font-bold">Phương thức vận chuyển</p>
                <p className="text-[14px]">
                  Miễn phí giao hàng cho đơn hàng {">"} 500.000 VND
                </p>
              </span>
              <span className="flex gap-2 flex-col">
                <p className="font-bold">Sự chi trả</p>
                <p className="text-[14px]">Thanh toán khi nhận hàng (COD)</p>
                <p className="text-[14px]">
                  đ
                  {order?.items
                    ?.reduce((a, b) => a + b.unitPrice, 0)
                    .toLocaleString("vi-VN")}{" "}
                </p>
                <p className="text-[14px]">{order?.createdAt.toString()}</p>
              </span>
            </div>
          </div>
        </div>
        <div className="w-1/2 hidden lg:block">
          <div className="bg-[#fff] w-full h-auto rounded-2xl p-4  mt-5">
            <ShowProductInCart order={order as Order} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsOrderItem;
