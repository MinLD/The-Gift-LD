"use client";

import LoaddingBox from "@/app/Components/BoxLoadding";
import LoadingOverlay from "@/app/Components/LoaddingOverlay";
import ModalConfirm from "@/app/Components/ModalConfirm";
import SellerEditProducts from "@/app/ComponentsSeller/SellerEditProducts";

import { GetAllCategories } from "@/app/Service/Admin";
import { DeleteProduct, GetMyProducts } from "@/app/Service/Seller";

import { Check, CirclePlus, Plus, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type DataCategories = {
  id: number;
  name: string;
  description: string;
  image: {
    url: string | null;
  };
}[];

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
type classification = {
  name: string;
  data: {
    name: string;
    price: number;
    image: File | null;
    quantity: number;
  }[];
};
function ProductsSellerManagement() {
  const dataDetails = [
    { id: 0, name: "trademark", label: "Thương hiệu" },
    { id: 1, name: "origin", label: "Xuất xứ" },
    { id: 2, name: "style", label: "Kiểu dáng" },
    { id: 3, name: "material", label: "Vật liệu" },
  ];

  const titleTable = [
    { id: 0, name: "ID" },
    { id: 1, name: "TIÊU ĐỀ" },
    { id: 2, name: "MÔ TẢ" },
    { id: 3, name: "HÌNH ẢNH" },
    { id: 4, name: "THƯƠNG HIỆU" },
    { id: 5, name: "KIỂU DÁNG" },
    { id: 6, name: "CHẤT LIỆU" },
    { id: 7, name: "XUẤT XỨ" },
    { id: 8, name: "GIÁ" },
    { id: 9, name: "SỐ LƯỢNG" },
  ];

  const [data, setData] = useState<DataCategories>([]);
  const [Categories, setCategories] = useState<number>(16);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [form, setForm] = useState<dataProduct[]>([]);
  const [isDelete, setIsDelete] = useState<number>(-1);
  const [EditProfile, setEditProfile] = useState<number>(-1);

  const handleGetAllCategories = async () => {
    setLoading(true);
    GetAllCategories()
      .then((res) => {
        setData(res?.data?.result);
        setCategories(res?.data?.result[0]?.id);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleDeleteProduct = async () => {
    DeleteProduct(isDelete)
      .then(() => {
        toast.success("Xóa sản phẩm thành công");
        handleGetAllProducts();
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  useEffect(() => {
    handleGetAllCategories();
    // Cleanup URLs khi component unmount
  }, []);
  const handleShowLength = (e: string) => {
    return e.length;
  };

  const handleGetAllProducts = async () => {
    GetMyProducts(Categories)
      .then((res) => {
        setForm(res?.data?.result);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetAllProducts();
  }, [Categories]);
  console.log(isDelete);
  return (
    <div className="px-2">
      {/* /*Thông tin cơ bản  */}
      <div className="w-full h-[auto] bg-[#ffffff] px-2">
        <div className="p-2">
          <h2 className="text-[20px] font-medium">Quản lý sản phẩm</h2>
          <div className="mt-5 w-full h-[1px] bg-[#c5c5c5]" />
        </div>

        <div className="pt-10 px-4 relative">
          <input
            type="text"
            name="name"
            className="border-1 border-[#c5c5c5] p-1 rounded-2xl pl-10 outline-0"
            placeholder="Tên Ngành Hàng"
          />
          <Search
            className="absolute top-1/2 left-6 transform translate-y-1/2"
            size={20}
          />
        </div>

        <div className="flex md:flex-row gap-10 flex-col pb-5">
          <div className="overflow-y-scroll max-h-[300px] px-4 mt-5 max-w-[250px] w-full">
            {data.map((item) => (
              <div key={item.id}>
                <div
                  onClick={() => {
                    setCategories(item.id);
                  }}
                  className={`relative flex items-center justify-between py-2 border-[#c5c5c5] hover:cursor-pointer hover:bg-[#c5c5c5] hover:text-[#ffffff]`}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      alt=""
                      src={item?.image?.url || ""}
                      width={20}
                      height={20}
                      className="w-[20px] h-[20px] rounded-full"
                    />
                    <p className="text-[14px] font-medium">{item.name}</p>
                  </div>
                  {Categories === item.id && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <Check size={20} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {form.length ? (
            <>
              <div className="overflow-x-auto">
                <h2 className="text-[20px] font-medium mb-1">
                  Thông tin sản phẩm
                </h2>
                <div className="pt-2 px-2 relative w-full mb-5 ">
                  <input
                    type="text"
                    name="name"
                    className="border-1 border-[#c5c5c5] p-2 rounded-2xl pl-10 outline-0 flex-1 w-full"
                    placeholder="Tìm kiếm sản phẩm"
                  />
                  <Search
                    className="absolute top-1/2 left-6 transform -translate-y-1/2"
                    size={20}
                  />
                </div>

                {form.map((i) => (
                  <div key={i.id}>
                    {" "}
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md mb-10">
                      <tbody>
                        <tr className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                          <tr className="md:table-row flex flex-col md:flex-row">
                            <th className="px-4 py-2 text-left text-xs font-semibold text-[#272727] uppercase tracking-wider md:w-2/10">
                              Mã sản phẩm :
                            </th>
                            <td className="px-2 py-2 text-sm text-gray-800 md:w-8/10">
                              {i.id}
                            </td>
                          </tr>
                          <tr className="md:table-row flex flex-col md:flex-row">
                            <th className="px-4 py-2 text-left text-xs font-semibold text-[#272727] uppercase tracking-wider md:w-2/10">
                              Tiêu đề :
                            </th>
                            <td className="px-2 py-2 text-sm text-gray-800 md:w-8/10">
                              {i.title}
                            </td>
                          </tr>
                          <tr className="md:table-row flex flex-col md:flex-row">
                            <th className=" px-4  py-2 text-left text-xs font-semibold text-[#272727]uppercase tracking-wider md:w-2/10">
                              Mô tả :
                            </th>
                            <td className="px-2 py-2 text-sm text-gray-800 md:w-8/10 break-words whitespace-pre-wrap">
                              {i.description}
                            </td>
                          </tr>
                          <tr className="md:table-row flex flex-col md:flex-row">
                            <th className="px-4 py-2 text-left text-xs font-semibold text-[#272727]uppercase tracking-wider md:w-2/10">
                              Hình ảnh:
                            </th>
                            <td className="px-6 py-3 text-sm text-gray-800 md:w-8/10">
                              <div className="flex flex-wrap gap-5">
                                {i.images && i.images.length > 0 ? (
                                  i.images.map((img, index) => (
                                    <div>
                                      {" "}
                                      <Image
                                        width={100}
                                        height={100}
                                        key={index}
                                        alt={`Hình ảnh ${index + 1}`}
                                        src={
                                          img.url || "/placeholder-image.jpg"
                                        }
                                        className="w-12 h-12 object-cover rounded-full border border-gray-200 hover:scale-105 transition-transform duration-200"
                                      />
                                      <p className="text-gray-600 text-[10px] mt-2">
                                        {index === 0
                                          ? "ảnh bìa"
                                          : "Hình ảnh " + index}
                                      </p>
                                    </div>
                                  ))
                                ) : (
                                  <span className="text-gray-500 italic">
                                    Không có hình ảnh
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                          <tr className="md:table-row flex flex-col md:flex-row">
                            <th className="px-4 py-2 text-left text-xs font-semibold text-[#272727] uppercase tracking-wider md:w-2/10">
                              Thương hiệu :
                            </th>
                            <td className="px-4 py-2 text-sm text-gray-800 md:w-8/10">
                              {i.trademark}
                            </td>
                          </tr>
                          <tr className="md:table-row flex flex-col md:flex-row">
                            <th className="px-4 py-2 text-left text-xs font-semibold text-[#272727] uppercase tracking-wider md:w-2/10">
                              Kiểu dáng :
                            </th>
                            <td className="px-4 py-2 text-sm text-gray-800 md:w-8/10">
                              {i.style}
                            </td>
                          </tr>
                          <tr className="md:table-row flex flex-col md:flex-row">
                            <th className="px-4 py-2 text-left text-xs font-semibold text-[#272727] uppercase tracking-wider md:w-2/10">
                              CHẤT LIỆU :
                            </th>
                            <td className="px-4 py-2 text-sm text-gray-800 md:w-8/10">
                              {i.material}
                            </td>
                          </tr>
                          <tr className="md:table-row flex flex-col md:flex-row">
                            <th className="px-4 py-2 text-left text-xs font-semibold text-[#272727] uppercase tracking-wider md:w-2/10">
                              Xuất xứ :
                            </th>
                            <td className="px-4 py-2 text-sm text-gray-800 md:w-8/10">
                              {i.origin}
                            </td>
                          </tr>
                          <tr className="md:table-row flex flex-col md:flex-row">
                            <th className="px-4 py-2 text-left text-xs font-semibold text-[#272727]uppercase tracking-wider md:w-2/10">
                              SKU :
                            </th>
                            <td className="px-4 py-2 text-sm text-gray-800 md:w-8/10">
                              {i.sku}
                            </td>
                          </tr>
                          <tr className="md:table-row flex flex-col md:flex-row">
                            <th className="px-4 py-2 text-left text-xs font-semibold text-[#272727] uppercase tracking-wider md:w-2/10">
                              Số lượng :
                            </th>
                            <td className="px-4 py-2 text-sm text-gray-800 md:w-8/10">
                              {i.quantity} sp
                            </td>
                          </tr>
                          <tr className="md:table-row flex flex-col md:flex-row border-b border-gray-200">
                            <th className="px-4 py-2 text-left text-xs font-semibold text-[#272727] uppercase tracking-wider md:w-2/10">
                              Giá :
                            </th>
                            <td className="px-4 py-2 text-sm text-gray-800 md:w-8/10">
                              {i.price.toLocaleString("vi-VN")} đ
                            </td>
                          </tr>
                          {i?.attributes?.map((attr, index) => (
                            <tr
                              key={index}
                              className="md:table-row flex flex-col md:flex-row border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-150"
                            >
                              <th className="px-6 py-3 text-left text-xs font-semibold text-[#272727] uppercase tracking-wide md:w-1/4">
                                {attr.name}:
                              </th>
                              <td className="px-6 py-3 text-sm text-gray-800 md:w-3/4">
                                <div className="flex flex-col gap-3">
                                  {attr?.attributesValues?.length > 0 ? (
                                    attr?.attributesValues?.map(
                                      (attrValue, idx) => (
                                        <div
                                          key={idx}
                                          className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                        >
                                          <span className="font-medium text-gray-700">
                                            {attrValue.image?.url && (
                                              <Image
                                                alt=""
                                                src={attrValue.image.url || ""}
                                                width={32}
                                                height={32}
                                                className="w-[32px] h-[32px] rounded-full"
                                              />
                                            )}
                                            {attrValue.name}
                                          </span>
                                          {attrValue.price !== 0 && (
                                            <span className="text-green-600 font-semibold">
                                              {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                              }).format(attrValue.price)}
                                            </span>
                                          )}
                                          <span className="text-gray-600">
                                            Số lượng: {attrValue.quantity}
                                          </span>
                                        </div>
                                      )
                                    )
                                  ) : (
                                    <span className="text-gray-500 italic">
                                      Không có giá trị thuộc tính
                                    </span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}

                          <tr className="md:table-row flex flex-col md:flex-row">
                            <td className="px-4 py-2 flex gap-5">
                              <button
                                onClick={() => setIsDelete(i.id)}
                                className="hover:cursor-pointer text-red-600 font-semibold hover:text-red-800 transition-colors duration-200"
                              >
                                Xóa
                              </button>
                              {isDelete === i.id && (
                                <div className="hover:cursor-pointer text-red-600 font-semibold hover:text-red-800 transition-colors duration-200">
                                  <ModalConfirm
                                    handle={handleDeleteProduct}
                                    setClose={() => setIsDelete(-1) as any}
                                    message="sản phẩm"
                                  />
                                </div>
                              )}

                              <button
                                onClick={() => setEditProfile(i.id)}
                                className="hover:cursor-pointer text-green-600 font-semibold hover:text-green-800 transition-colors duration-200"
                              >
                                Sửa
                              </button>
                              {EditProfile === i.id && (
                                <>
                                  {" "}
                                  <div>
                                    <div
                                      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                                      onClick={() => setEditProfile(-1)}
                                    ></div>

                                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                                      <div className="bg-white p-4 w-[800px] h-auto rounded-xl shadow-lg">
                                        <SellerEditProducts
                                          data={i}
                                          setClose={() => setEditProfile(-1)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </td>
                          </tr>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="w-full">
              <LoadingOverlay message="Không có sản phẩm!" isEmsty={true} />
            </div>
          )}
        </div>
      </div>

      {/* Loadding */}
      {isLoading && (
        <>
          <div className="fixed inset-0 bg-black opacity-60 backdrop-blur-sm z-40" />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <LoaddingBox isAVT={false} height="10" width="10" />
          </div>
        </>
      )}
    </div>
  );
}

export default ProductsSellerManagement;
