"use client";
import Image from "next/image";
import cardImg from "../../../public/card.png";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/app/zustand/store";
import MyLayOut from "@/app/MyLayout/layout";
import { LockKeyhole } from "lucide-react";
import {
  deleteCart,
  getAttributesValue,
  updateCartItem,
  updateQuantityCart,
} from "@/app/Service/Cart";
import { useState } from "react";
import ModalConfirm from "@/app/Components/ModalConfirm";
import { toast } from "sonner";
type atributes_Value = {
  id: number;
  name: string;
  image: {
    url: string;
  };
};
function page() {
  const router = useRouter();
  const { Cart, fetchCart } = useProfileStore();
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
    console.log(id, id_atributes_value);
    await updateCartItem(id, id_atributes_value)
      .then(async () => {
        await fetchCart();
      })
      .catch(async (err) => {
        console.log(err.response.data.message);
        await fetchCart();
        setConFirm("");
        toast.error(err.response.data.message);
      });
  };

  return (
    <div>
      {Cart?.items?.length ? (
        <div className="min-h-screen">
          <h2 className="text-[48px] text-[#272727] text-center mt-10 mb-5">
            Giỏ hàng
          </h2>
          <MyLayOut>
            <div className="flex gap-5 ">
              <div className="w-[70vw]">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#d8d8d8] bg-gray-50">
                      <th className="py-3 px-4 text-[16px] font-semibold text-[#272727]">
                        Sản phẩm
                      </th>
                      <th className="py-3 px-4 text-[16px] font-semibold text-[#272727] text-center">
                        Số lượng
                      </th>
                      <th className="py-3 px-4 text-[16px] font-semibold text-[#272727] text-center">
                        Tổng giá
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Cart?.items?.map((item) => (
                      <tr
                        className="border-b border-[#e5e7eb] hover:bg-gray-100 transition-colors"
                        key={item.products_order.id}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-[100px] h-[100px]">
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
                                      value={
                                        item.products_order?.id_atributes_value
                                      }
                                    >
                                      {item.products_order?.atributes_Value}
                                    </option>

                                    {options.map(
                                      (i) =>
                                        i.name !==
                                          item.products_order
                                            .atributes_Value && (
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
                        <td className="py-4 px-4 text-[16px] font-medium text-[#272727] text-center ">
                          {item.unitPrice.toLocaleString()}đ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="w-[30vw] border border-[#d8d8d8] h-fit rounded-2xl p-5 sticky top-30">
                <h2 className="text-[20px] text-[#272727] ">
                  Tổng Cộng :{" "}
                  {Cart?.items
                    ?.reduce((a, b) => a + b.unitPrice, 0)
                    .toLocaleString()}{" "}
                  VND
                </h2>
                <p className="text-[15px] text-[#939393]">
                  Thuế và vận chuyển được tính toán khi thanh toán
                </p>
                <textarea
                  name=""
                  id=""
                  cols={20}
                  rows={3}
                  placeholder="Ghi chú "
                  className="w-full border border-[#d8d8d8] rounded-2xl p-3 mt-5"
                ></textarea>
                <button
                  onClick={() => router.push("/checkouts")}
                  className="mt-4 mb-3 flex items-center justify-center gap-2 font-semibold w-full text-[20px] bg-[#040404] text-white px-5 py-2 hover:cursor-pointer flex-1 "
                >
                  <LockKeyhole size={20} /> Đặt Hàng
                </button>
              </div>
            </div>
          </MyLayOut>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center flex-col gap-2 mt-10 mb-10">
            <Image
              src={cardImg}
              alt="card"
              width={150}
              height={150}
              className="bg-cover"
            />
            <h2 className="text-[15px] text-[#939393] font-medium">
              Giỏ hàng của bạn còn trống
            </h2>
            <button
              className="text-[20px] bg-[#DD4B39] text-white px-5 py-1 hover:cursor-pointer"
              onClick={() => router.push("/")}
            >
              MUA NGAY
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default page;
