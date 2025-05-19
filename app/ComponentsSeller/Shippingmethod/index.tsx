"use client";
import { useState } from "react";

function ShippingMethod() {
  const data2 = [
    {
      id: 0,
      label: "Hỏa Tốc",
    },
    {
      id: 1,
      label: "Nhanh",
    },
    {
      id: 2,
      label: "Tiết Kiệm",
    },
    {
      id: 3,
      label: "Hàng Cồng Kềnh",
    },
  ];

  const [isOn, setIsOn] = useState(0);

  const handleToggle = (id: number) => {
    setIsOn(id);
  };
  return (
    <div>
      <h2 className="text-[17px] text-[#272727] font-medium">
        Phương thức vận chuyển
      </h2>
      <p className="text-[14px] text-[#8b8888f9]">
        Kích hoạt phương thức vận chuyển
      </p>
      <div className="">
        {data2.map((i) => (
          <div key={i.id} className="mt-5 ">
            <label htmlFor="">{i.label}</label>
            <div className="relative w-full h-[50px] bg-[#f6f6f6] py-2 pl-5 rounded-md flex items-center mt-2">
              <h2 className="flex gap-2">
                {i.label}{" "}
                {isOn === i.id && (
                  <span className="text-red-500">[COD đã được kích hoạt]</span>
                )}
              </h2>

              <div className="absolute top-1/2 transform -translate-y-1/2 right-3 ">
                <div className="flex items-center gap-2 ">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isOn === i.id}
                      onChange={() => handleToggle(i.id)}
                    />
                    <div
                      className={`w-12 h-6 bg-gray-300 rounded-full transition-colors duration-300 ${
                        isOn === i.id ? "bg-green-500" : ""
                      }`}
                    >
                      <div
                        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          isOn === i.id ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShippingMethod;
