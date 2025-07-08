import Image from "next/image";

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
type Props = {
  order: Order;
};

function ShowProductInCart({ order }: Props) {
  return (
    <>
      {" "}
      <table className="max-w-full border-collapse text-left ">
        <tbody>
          {order?.items.map((item) => (
            <tr className="" key={item.products_order.id}>
              <td className="py-2 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-[80px] h-[80px] relative">
                    <Image
                      src={item?.products_order?.images[0]?.url || ""}
                      alt="card"
                      width={100}
                      height={100}
                      className="object-cover rounded-md"
                    />
                    <div className="absolute top-0 right-0  bg-[#c5c5c5] w-[20px] h-[20px] rounded-full flex justify-center items-center">
                      <p className="text-[#fff] text-[12px]">{item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[16px] font-medium text-[#272727]">
                      {item.products_order.name}
                    </h2>
                    <div className="flex items-center gap-2  rounded-md">
                      <h2 className="text-base font-medium text-gray-700">
                        {item?.products_order?.atributes_name}
                      </h2>
                      <span className="text-sm text-gray-500">
                        {item?.products_order?.atributes_Value}
                      </span>
                    </div>
                    <h2 className="text-[16px] font-medium text-[#DD4B39]">
                      {item.unitPrice.toLocaleString()}đ
                    </h2>
                  </div>
                </div>
              </td>
            </tr>
          ))}
          <tr className="">
            <td className="px-2 py-2 text-gray-600 font-medium text-sm sm:text-base">
              <div>
                Tổng số lượng:{" "}
                {order?.items?.reduce((a, b) => a + b.quantity, 0)}
              </div>
            </td>
            <td className="px-2 py-2 text-gray-800 font-semibold text-sm sm:text-base text-right">
              <div>
                {order?.items
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
                {order?.items
                  ?.reduce((a, b) => a + b.unitPrice, 0)
                  .toLocaleString("vi-VN")}{" "}
                VND
              </h2>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ShowProductInCart;
