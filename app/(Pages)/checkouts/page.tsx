"use client";
import CheckoutForm from "@/app/Components/CheckoutForm";
import ModalConfirm from "@/app/Components/ModalConfirm";
import AddressSellerManagement from "@/app/ComponentsSeller/AddressSellerManagement";
import {
  deleteCart,
  getAttributesValue,
  updateCartItem,
  updateQuantityCart,
} from "@/app/Service/Cart";
import { CreaterOrder } from "@/app/Service/Order";
import { useProfileStore } from "@/app/zustand/store";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { toast } from "sonner";
type atributes_Value = {
  id: number;
  name: string;
  image: {
    url: string;
  };
};
type order = {
  shippingAddress: number;
  paymentMethod: string;
  products_order: {
    id_products_order: number;
    quantity: number;
  }[];
};
function page() {
  const [order, setOrder] = useState<order>({
    shippingAddress: 0,
    paymentMethod: "COD",
    products_order: [],
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { Cart, fetchCart, User } = useProfileStore();
  const [isConFirm, setConFirm] = useState<String>("");
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [options, setOptions] = useState<atributes_Value[]>([]);
  const handleDeleteCart = async (id: number) => {
    setConFirm(String(id));
    await deleteCart(id)
      .then(async () => {
        await fetchCart();
        setConFirm("");
      })
      .catch(async (err) => {
        console.log(err.response.data.message);
        await fetchCart();
        setConFirm("");
      });
  };
  const handleUpdateQuantity = async (id: number, quantity: number) => {
    if (!isNaN(quantity) && quantity >= 0) {
      setQuantities((prev) => ({ ...prev, [id]: quantity }));
      await updateQuantityCart(id, quantity)
        .then(async () => {
          await fetchCart();
        })
        .catch(async (err) => {
          console.log(err.response.data.message);
          await fetchCart();
          setConFirm("");
          toast.error(err.response.data.message);
        });
    }
  };
  const handleGetAttributesValue = async (id: number) => {
    return await getAttributesValue(id)
      .then((res) => {
        setOptions(res?.data?.result);
      })
      .catch(async (err) => {
        console.log(err.response.data.message);
        await fetchCart();
        setConFirm("");
        toast.error(err.response.data.message);
      });
  };

  const handleUpdateCartItem = async (
    id: number,
    id_atributes_value: number
  ) => {
    await updateCartItem(id, id_atributes_value)
      .then(async () => {
        await fetchCart();
      })
      .catch(async (err) => {
        await fetchCart();
        setConFirm("");
        toast.error(err.response.data.message);
      });
  };
  const CreateOrder = async () => {
    setIsLoading(true);
    const id_Address = User?.addresses.find(
      (item) => item.addressDefault === true
    )?.id;
    order.shippingAddress = id_Address || 0;
    Cart?.items?.forEach((item) => {
      order.products_order.push({
        id_products_order: item.products_order.id,
        quantity: item.quantity,
      });
    });
    await CreaterOrder(order)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        router.push(`/accounts/orthers`);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex">
      <div className="w-[40vw] pt-10 px-2">
        <AddressSellerManagement />
        <CheckoutForm />
        <button
          onClick={CreateOrder}
          className="bg-[#1773b0] w-full h-[50px] flex items-center justify-center text-[#fff] cursor-pointer"
        >
          {isLoading ? "Loading..." : "Thanh toán"}
        </button>
      </div>
      <div className="flex-1 w-full  border-l-2 border-[#e5e7eb] sticky top-0 h-fit">
        <table className="max-w-full border-collapse text-left mt-10 ml-5">
          <tbody>
            {Cart?.items?.map((item) => (
              <tr className="" key={item.products_order.id}>
                <td className="py-2 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-[80px] h-[80px] ">
                      <Image
                        src={item?.products_order?.images[0]?.url || ""}
                        alt="card"
                        width={100}
                        height={100}
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[16px] font-medium text-[#272727]">
                        {item.products_order.name}
                      </h2>
                      <div className="flex items-center gap-2  rounded-md">
                        <h2 className="text-base font-medium text-gray-700">
                          {item?.products_order?.atributes_name}
                        </h2>
                        {item?.products_order?.atributes_name ? (
                          <select
                            onChange={(e) =>
                              handleUpdateCartItem(
                                item.id,
                                Number(e.target.value)
                              )
                            }
                            onClick={() =>
                              handleGetAttributesValue(
                                item.products_order.id_atributes_name
                              )
                            }
                            className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm text-gray-600 focus:ring-1 focus:ring-blue-400 outline-none cursor-pointer hover:bg-gray-50"
                          >
                            {/* Option mặc định */}
                            <option
                              key="-1"
                              value={item.products_order?.id_atributes_value}
                            >
                              {item.products_order?.atributes_Value}
                            </option>

                            {options.map(
                              (i) =>
                                i.name !==
                                  item.products_order.atributes_Value && (
                                  <option key={i.id} value={i.id}>
                                    {i.name}
                                  </option>
                                )
                            )}
                          </select>
                        ) : (
                          <span className="text-sm text-gray-500">
                            {item?.products_order?.atributes_Value}
                          </span>
                        )}
                      </div>
                      <h2 className="text-[16px] font-medium text-[#DD4B39]">
                        {item.products_order.price.toLocaleString()}đ
                      </h2>
                    </div>
                  </div>
                </td>
                <td className="justify-center py-4 px-4 text-[16px] font-medium text-[#272727] flex flex-col items-center gap-2">
                  <div className=" w-[100px] rounded-2xl h-[40px] flex items-center justify-center border border-[#d8d8d8]">
                    <input
                      type="text"
                      value={
                        quantities[item.id] !== undefined
                          ? quantities[item.id]
                          : item.quantity
                      }
                      onChange={(e) => {
                        const newValue = Number(e.target.value);
                        if (!isNaN(newValue) && newValue >= 0) {
                          handleUpdateQuantity(item.id, newValue);
                        }
                      }}
                      className="w-full h-full text-center outline-none"
                    />
                  </div>
                  <h2
                    className="text-[15px] font-medium text-[#D8D8D8] hover:cursor-pointer"
                    onClick={() => setConFirm(String(item.id))}
                  >
                    Xóa
                  </h2>
                  {isConFirm === String(item.id) && (
                    <ModalConfirm
                      setClose={() => setConFirm("")}
                      handle={() => {
                        handleDeleteCart(item.id);
                        setConFirm("");
                      }}
                      message="sản phẩm"
                    />
                  )}
                </td>
              </tr>
            ))}
            <tr className="">
              <td className="px-2 py-2 text-gray-600 font-medium text-sm sm:text-base">
                <div>
                  Tổng số lượng:{" "}
                  {Cart?.items?.reduce((a, b) => a + b.quantity, 0)}
                </div>
              </td>
              <td className="px-2 py-2 text-gray-800 font-semibold text-sm sm:text-base text-right">
                <div>
                  {Cart?.items
                    ?.reduce((a, b) => a + b.unitPrice, 0)
                    .toLocaleString("vi-VN")}{" "}
                  VND
                </div>
              </td>
            </tr>
            <tr className="">
              <td className="px-2 py-2 text-gray-600 font-medium text-sm sm:text-base">
                <h2 className="text-base sm:text-lg">Phí vận chuyển</h2>
              </td>
              <td className="px-2 py-2 text-green-600 font-semibold text-sm sm:text-base text-right">
                <h2 className="text-base sm:text-lg">MIỄN PHÍ</h2>
              </td>
            </tr>
            <tr className="">
              <td className="px-2 py-2 text-gray-800 font-semibold text-base sm:text-lg">
                <h2>Tổng cộng</h2>
              </td>
              <td className="px-2 py-2 text-red-600 font-bold text-base sm:text-lg text-right">
                <h2>
                  {Cart?.items
                    ?.reduce((a, b) => a + b.unitPrice, 0)
                    .toLocaleString("vi-VN")}{" "}
                  VND
                </h2>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default page;
