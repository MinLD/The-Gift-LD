"use client";
import { useState } from "react";
import visa from "../../../public/payt/VISA-Logo-1992.png";
import mastercard from "../../../public/payt/MasterCard_early_1990s_logo.png";

import Image from "next/image";
type PaymentOption = "payoo" | "cod";

export default function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentOption>("payoo");

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value as PaymentOption);
  };
  return (
    <div className="max-w-2xl mx-auto px-2">
      {/* Shipping Method */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Phương thức giao hàng</h2>
        <div className="border border-gray-200 rounded-md p-4 bg-blue-50 text-gray-700">
          <p>Miễn phí giao hàng cho đơn hàng {`>`} 500,000 VND</p>
          <span className="text-green-600 font-medium">FREE</span>
        </div>
      </div>

      {/* Payment */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Phương thức thanh toán</h2>
        <p className="text-sm text-gray-500 mb-4">
          Mọi giao dịch đều được đảm bảo an toàn và bảo mật chặt chẽ.
        </p>
        <div className="space-y-4">
          <label className="flex items-center p-4 border border-gray-200 rounded-md bg-blue-50 hover:bg-blue-100 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="payoo"
              checked={paymentMethod === "payoo"}
              onChange={handlePaymentChange}
              className="w-4 h-4 text-blue-600 "
            />
            <span className="ml-3 text-gray-700">Chuyển khoản</span>
            <div className="ml-auto flex space-x-2">
              <Image
                src={visa}
                alt="logo"
                className="w-[35px] h-[25px] object-cover"
                width={35}
                height={35}
              />
              <Image
                src={mastercard}
                alt="logo"
                className="w-[45px] h-[25px] "
                width={35}
                height={35}
              />
            </div>
          </label>
          <div className="text-sm text-gray-500 pl-8 flex items-center justify-center flex-col gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-252.3 356.1 163 80.9"
              className="zjrzY w-[160px] h-[100px]"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M-108.9 404.1v30c0 1.1-.9 2-2 2H-231c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1"
              ></path>
              <circle
                cx="-227.8"
                cy="361.9"
                r="1.8"
                fill="currentColor"
              ></circle>
              <circle
                cx="-222.2"
                cy="361.9"
                r="1.8"
                fill="currentColor"
              ></circle>
              <circle
                cx="-216.6"
                cy="361.9"
                r="1.8"
                fill="currentColor"
              ></circle>
              <path
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M-128.7 400.1H-92m-3.6-4.1 4 4.1-4 4.1"
              ></path>
            </svg>
            <p className="px-15 text-center">
              Sau khi nhấp vào "Thanh toán ngay", bạn sẽ được chuyển hướng đến
              Payoo để hoàn tất giao dịch mua hàng của mình một cách an toàn.
            </p>
          </div>
          <label className="flex items-center p-4 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={handlePaymentChange}
              className="w-4 h-4 text-blue-600 "
            />
            <span className="ml-3 text-gray-700">
              Thanh toán khi nhận hàng (COD)
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
