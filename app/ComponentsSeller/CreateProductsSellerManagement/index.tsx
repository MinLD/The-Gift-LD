"use client";

import LoaddingBox from "@/app/Components/BoxLoadding";
import LoadingOverlay from "@/app/Components/LoaddingOverlay";
import { GetAllCategories } from "@/app/Service/Admin";
import {
  CreateAttributesValue,
  CreateNameAttributes,
  CreateProduct,
  DeleteProduct,
} from "@/app/Service/Seller";

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
  name: string;
  description: string;
  price: number;
  category: number;
  trademark: string;
  origin: string;
  style: string;
  material: string;
  quantity: number;
  images: { id: number; image: File | null; url?: string }[];
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
function CreateProductsSellerManagement() {
  const [isOpenClassification, setIsOpenClassification] = useState<number>(0);
  const [classification, setClassification] = useState<classification[]>([
    {
      name: "",
      data: [],
    },
  ]);
  const dataDetails = [
    { id: 0, name: "trademark", label: "Thương hiệu" },
    { id: 1, name: "origin", label: "Xuất xứ" },
    { id: 2, name: "style", label: "Kiểu dáng" },
    { id: 3, name: "material", label: "Vật liệu" },
  ];
  const titleTable = [
    { id: 0, name: "Ảnh Bìa" },
    { id: 1, name: "Ảnh 1" },
    { id: 2, name: "Ảnh 2" },
    { id: 3, name: "Ảnh 3" },
    { id: 4, name: "Ảnh 4" },
  ];
  const validTypes = ["image/jpeg", "image/png"];
  let count = 0;
  const [data, setData] = useState<DataCategories>([]);
  const [Categories, setCategories] = useState<number>(-1);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [form, setForm] = useState<dataProduct>({
    name: "",
    description: "",
    price: 0,
    category: Categories,
    trademark: "",
    origin: "",
    style: "",
    material: "",
    quantity: 0,
    images: titleTable.map((item) => ({ id: item.id, image: null })),
  });
  const [newDataName, setNewDataNames] = useState<string[]>([""]); // Trạng thái tạm cho input "Tên phân loại"
  const [newDataPrices, setNewDataPrices] = useState<number[]>([0]);
  const [newDataQuantities, setNewDataQuantities] = useState<number[]>([0]);
  const [newDataImages, setNewDataImages] = useState<(File | null)[]>([null]);
  // Hàm thêm nhóm phân loại mới
  const handleAddClassification = () => {
    setIsOpenClassification((prev) => prev + 1);
    setClassification((prev) => [
      ...prev,
      {
        name: "",
        data: [],
      },
    ]);
    setNewDataNames((prev) => [...prev, ""]); // Thêm giá trị rỗng cho input mới
    setNewDataPrices((prev) => [...prev, 0]);
    setNewDataQuantities((prev) => [...prev, 0]);
    setNewDataImages((prev) => [...prev, null]);
  };

  // Hàm cập nhật tên nhóm phân loại
  const handleClassificationNameChange = (index: number, value: string) => {
    setClassification((prev) =>
      prev.map((item, i) => (i === index ? { ...item, name: value } : item))
    );
  };

  const handleDataNameChange = (index: number, value: string) => {
    setNewDataNames((prev) =>
      prev.map((name, i) => (i === index ? value : name))
    ); // Cập nhật giá trị tạm theo index
  };
  const handleDataPriceChange = (index: number, value: string) => {
    const price = parseFloat(value) || 0;
    setNewDataPrices((prev) => prev.map((p, i) => (i === index ? price : p)));
  };

  const handleDataQuantityChange = (index: number, value: string) => {
    const quantity = parseInt(value) || 0;
    setNewDataQuantities((prev) =>
      prev.map((q, i) => (i === index ? quantity : q))
    );
  };

  const handleDataImageChange = (index: number, file: File | null) => {
    setNewDataImages((prev) =>
      prev.map((img, i) => (i === index ? file : img))
    );
  };

  const handleAddDataItem = (index: number) => {
    const newName = newDataName[index]?.trim();
    const newPrice = newDataPrices[index] || 0;
    const newQuantity = newDataQuantities[index] || 0;
    const newImage = newDataImages[index] || null;
    if (!newName) return; // Không thêm nếu rỗng
    setClassification((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              data: [
                ...item.data,
                {
                  name: newName,
                  price: newPrice,
                  image: newImage,
                  quantity: newQuantity,
                },
              ],
            }
          : item
      )
    );
    setNewDataNames((prev) => prev.map((name, i) => (i === index ? "" : name))); // Reset chỉ input của nhóm đó
    setNewDataPrices((prev) => prev.map((p, i) => (i === index ? 0 : p)));
    setNewDataQuantities((prev) => prev.map((q, i) => (i === index ? 0 : q)));
    setNewDataImages((prev) =>
      prev.map((img, i) => (i === index ? null : img))
    );
  };

  const handleRemoveClassification = (index: number) => {
    if (classification.length <= 1) return;
    setClassification((prev) => prev.filter((_, i) => i !== index));
    setIsOpenClassification((prev) => prev - 1);
    setNewDataNames((prev) => prev.filter((_, i) => i !== index)); // Xóa giá trị tạm tương ứng
    setNewDataPrices((prev) => prev.filter((_, i) => i !== index));
    setNewDataQuantities((prev) => prev.filter((_, i) => i !== index));
    setNewDataImages((prev) => prev.filter((_, i) => i !== index));
  };
  const handleChangePic = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImage = e.target.files[0];
      if (!validTypes.includes(newImage.type)) {
        toast.error("Vui lòng chọn file ảnh định dạng JPG hoặc PNG!");
        return;
      }
      if (newImage.size > 5 * 1024 * 1024) {
        // Giới hạn 5MB
        toast.error("File ảnh không được vượt quá 5MB!");
        return;
      }

      const imageUrl = URL.createObjectURL(newImage); // Tạo URL để hiển thị ảnh
      setForm((prev) => ({
        ...prev,
        images: prev.images.map((img) =>
          img.id === id ? { ...img, image: newImage, url: imageUrl } : img
        ),
      }));
    }
  };

  const handleGetAllCategories = async () => {
    setLoading(true);
    GetAllCategories()
      .then((res) => {
        setData(res?.data?.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleCreateProduct = async () => {
    setIsShowError(false);
    if (
      !form.name.length ||
      !form.description ||
      !form.price ||
      !form.trademark ||
      !form.origin ||
      !form.style ||
      !form.quantity ||
      !form.material
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      setIsShowError(true);
      return;
    }
    if (form.category === -1) {
      toast.warning("Vui lòng chọn danh sách sản phẩm!");
      setIsShowError(true);
      return;
    }
    if (form.name.length < 5) {
      toast.warning("Tiêu đề phải lớn hơn 5 ký tự");
      setIsShowError(true);
      return;
    }
    if (form.description.length < 250) {
      toast.warning("Mô tả phải lớn hơn 250 ký tự");
      setIsShowError(true);
      return;
    }
    setLoading(true);
    let productId;
    try {
      // Tạo FormData
      const formData = new FormData();
      formData.append("title", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price.toString());
      formData.append("discount", "1"); // Sử dụng giá trị động
      formData.append("trademark", form.trademark);
      formData.append("origin", form.origin);
      formData.append("style", form.style);
      formData.append("quantity", form.quantity.toString());
      formData.append("material", form.material);
      form.images.forEach((element) => {
        if (element.image) {
          formData.append("images", element.image);
        }
      });

      // Gọi API tạo sản phẩm
      const productRes = await CreateProduct(formData, form.category);
      productId = productRes?.data?.result?.id;

      if (!productId) {
        toast.error(productRes?.data?.response?.message);
      }
      if (classification[0].name && productId) {
        // Xử lý classification (tuần tự hoặc song song tùy yêu cầu)
        const attributeIds = [];
        for (const element of classification) {
          try {
            const attrRes: any = await CreateNameAttributes(
              element.name,
              productId
            );
            const attrId = attrRes?.data?.result?.id;
            if (attrId) {
              attributeIds.push({
                id: attrId,
                name: element.name,
                data: element.data,
              });
            }
          } catch (err: any) {
            toast.error(
              err?.response?.data?.message || "Something went wrong."
            );
            try {
              const deleres = await DeleteProduct(productId);
              if (!deleres?.data?.success) {
                toast.error(
                  "Không thể xóa sản phẩm sau khi tạo thuộc tính thất bại."
                );
              }
            } catch (deleteErr: any) {
              toast.error(
                "Lỗi khi xóa sản phẩm: " + deleteErr?.response?.data?.message
              );
            }

            setLoading(false);
            return;
          }
        }

        // Xử lý attribute values
        const attributeValueIds: string[] = [];
        for (const attribute of attributeIds) {
          for (const value of attribute.data) {
            // Tạo FormData cho giá trị thuộc tính
            const valueFormData = new FormData();
            valueFormData.append("name", value.name);
            valueFormData.append("price", value.price.toString());
            valueFormData.append("quantity", value.quantity.toString());

            if (value.image) {
              valueFormData.append("image", value.image);
            }

            valueFormData.forEach((element) => {
              console.log(element);
            });

            try {
              const attrValueRes = await CreateAttributesValue(
                valueFormData,
                attribute.id
              );

              count++;
              console.log("API response for attribute value:", attrValueRes);
              const valueId = attrValueRes?.data?.result?.id;

              if (valueId && count === attribute.data.length) {
                attributeValueIds.push(valueId);
                toast.success("Tạo sản phẩm thành công");

                setLoading(false);
                return;
              } else if (!valueId && count === attribute.data.length) {
                toast.error(
                  attrValueRes?.data?.response?.message ||
                    "Something went wrong."
                );
                setLoading(false);
              }
            } catch (err: any) {
              try {
                const deleres = await DeleteProduct(productId);
              } catch (deleteErr: any) {
                toast.error(
                  "Lỗi khi xóa sản phẩm: " + deleteErr?.response?.data?.message
                );
              }

              setLoading(false);
              toast.error(
                err?.response?.data?.message || "Something went wrong."
              );
            }
          }
        }
      } else if (classification.length === 1 && productId) {
        toast.success("Tạo sản phẩm thành công");
        setLoading(false);

        return;
      }
    } catch (err: any) {
      if (err?.response?.data?.code === 1016) {
        toast.error("Vui lòng chọn ngành hàng");
        setLoading(false);

        return;
      }
      toast.error(err?.response?.data?.message || "Something went wrong.");
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    handleGetAllCategories();
    // Cleanup URLs khi component unmount
    return () => {
      form.images.forEach((img) => {
        if (img.url) URL.revokeObjectURL(img.url);
      });
    };
  }, []);
  const handleShowLength = (e: string) => {
    return e.length;
  };
  return (
    <div className="px-2">
      {/* /*Thông tin cơ bản  */}
      <div className="w-full h-[auto] bg-[#ffffff] px-2">
        <div className="p-2">
          <h2 className="text-[20px] font-medium">Thêm 1 sản phẩm mới</h2>
          <p className="text-[14px] text-[#c5c5c5] mt-2">
            Vui lòng chọn ngành hàng phù hợp cho sản phẩm của bạn
          </p>
          <div className="mt-5 w-full h-[1px] bg-[#c5c5c5]" />
        </div>

        <div className="flex gap-2 mt-5 relative  ">
          <button className="text-[14px] text-[#c5c5c5] border-1 border-[#c5c5c5] p-2 bg-[#272727] hover:cursor-pointer">
            Tên sản phẩm
          </button>

          <input
            type="text"
            name="name"
            className="border-1 border-[#c5c5c5] flex-1 p-2 outline-0"
            placeholder="Nhập vào"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <p className="text-[14px] text-[#c5c5c5] absolute right-5 transform translate-y-1/2 ">
            {handleShowLength(form.name)} / 20
          </p>
        </div>
        {isShowError && form.name.length < 20 && (
          <p className="text-[12px] text-[red] leading-6  mt-2">
            * Vui lòng nhập đầy đủ thông tin!
          </p>
        )}

        <div className="pt-10 px-4 relative">
          <input
            type="text"
            name="name"
            className="border-1 border-[#c5c5c5] p-1 rounded-2xl pl-10 outline-0"
            placeholder="Tên Ngành Hàng"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Search
            className="absolute top-1/2 left-6 transform translate-y-1/2"
            size={20}
          />
        </div>

        <div className="flex sm:flex-row gap-10 flex-col pb-5">
          <div className="overflow-y-scroll max-h-[300px] px-4 mt-5 max-w-[250px] w-full">
            {data.map((item) => (
              <div key={item.id}>
                <div
                  onClick={() => {
                    setCategories(item.id);
                    setForm({ ...form, category: item.id });
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
          <div className="flex-1 ">
            <h2 className="text-[20px] font-medium">Thông tin cơ bản</h2>
            <h2 className="text-[15px] text-[#c5c5c5] mt-4 mb-2">
              Hình ảnh sản phẩm {form.images.length} / (5 hình ảnh)
            </h2>
            <div className="flex gap-2 col-span-2">
              {titleTable.map((item) => (
                <div key={item.id} className="flex items-center flex-col">
                  <label className="w-[60px] h-[60px] flex justify-center items-center border-1 border-dashed border-[#c5c5c5] hover:cursor-pointer">
                    {form.images.find((img) => img.id === item.id)?.url ? (
                      <Image
                        src={
                          form.images.find((img) => img.id === item.id)?.url ||
                          ""
                        }
                        alt={item.name}
                        width={60}
                        height={60}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Plus size={30} />
                    )}
                    <input
                      accept="image/*"
                      type="file"
                      className="hidden"
                      onChange={(e) => handleChangePic(e, item.id)}
                    />
                  </label>
                  <h3 className="text-[11px] text-[#c5c5c5] mt-1">
                    {item.name}
                  </h3>
                </div>
              ))}
            </div>

            <h2 className="text-[15px] text-[#c5c5c5] mt-4 mb-2">
              Mô tả sản phẩm: {handleShowLength(form.description)} / 200
            </h2>

            <div className="flex gap-2">
              <textarea
                name="description"
                className="border-1 border-[#c5c5c5] flex-1 p-2 outline-0 h-[200px] break-words whitespace-pre-wrap "
                placeholder="Nhập vào"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            {isShowError && form.description.length < 200 && (
              <p className="text-[12px] text-[red] leading-6">
                * Vui lòng nhập đầy đủ thông tin!
              </p>
            )}
            <div className="flex gap-2 mt-5 mb-2">
              <button className="text-[14px] text-[#c5c5c5] border-1 border-[#c5c5c5] p-2 bg-[#272727] hover:cursor-pointer">
                Giá sản phẩm
              </button>
              <input
                name="price"
                type="number"
                className="border-1 border-[#c5c5c5] flex-1 p-2 outline-0"
                placeholder="Nhập vào"
                onChange={(e) =>
                  setForm({ ...form, price: e.target.valueAsNumber })
                }
              />
            </div>
            {isShowError && !form.price && (
              <p className="text-[12px] text-[red] leading-6">
                * Vui lòng nhập đầy đủ thông tin!
              </p>
            )}
            <div className="flex gap-2 mt-5 mb-2">
              <button className="text-[14px] text-[#c5c5c5] border-1 border-[#c5c5c5] p-2 bg-[#272727] hover:cursor-pointer">
                Tổng tồn kho
              </button>
              <input
                name="quantity"
                type="number"
                className="border-1 border-[#c5c5c5] flex-1 p-2 outline-0"
                placeholder="Nhập vào"
                onChange={(e) =>
                  setForm({ ...form, quantity: e.target.valueAsNumber })
                }
              />
            </div>
            {isShowError && !form.quantity && (
              <p className="text-[12px] text-[red] leading-6 mb-10">
                * Vui lòng nhập đầy đủ thông tin!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Thông tin chi tiết */}
      <div className="w-full h-[auto] bg-[#ffffff] px-2 mt-5 pb-5">
        <div className="p-2">
          <h2 className="text-[20px] font-medium">Thông tin chi tiết</h2>
          <p className="text-[14px] text-[#c5c5c5] mt-2">
            Vui lòng hoàn thành thông tin để tăng mức độ hiển thị cho sản phẩm
          </p>
          <div className="mt-5 w-full h-[1px] bg-[#c5c5c5]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-5 w-full">
            {dataDetails.map((item) => (
              <div className="">
                <div key={item.id} className="flex gap-2 mt-5 flex-col ">
                  <p className="text-[14px] text-[#c5c5c5] w-[100px] ">
                    {item.label}
                  </p>
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="border-1 flex-1 border-[#c5c5c5]  p-2 outline-0 w-full  "
                      placeholder="Nhập vào"
                      name={item.name}
                      onChange={(e) =>
                        setForm({ ...form, [item.name]: e.target.value })
                      }
                    />
                    <p className="absolute -translate-y-1/2 right-2 transform top-1/2  text-[#c5c5c5]">
                      {handleShowLength((form as any)[item.name])}
                    </p>
                  </div>
                </div>
                {isShowError && !form[item.name as keyof typeof form] && (
                  <p className="text-[12px] text-[red] leading-6 ">
                    * Vui lòng nhập đầy đủ thông tin!
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thông tin bán hàng */}
      <div className="w-full h-[auto] bg-[#ffffff] px-2 mt-5 pb-5">
        <div className="p-2">
          <h2 className="text-[20px] font-medium">Thông tin bán hàng</h2>
          <p className="text-[14px] text-[#c5c5c5] mt-2">
            Vui lòng hoàn thành thông tin để tăng mức độ hiển thị cho sản phẩm
          </p>

          <div className="mt-5 w-full h-[1px] bg-[#c5c5c5]" />
          <div>
            <div>
              <div
                onClick={handleAddClassification}
                className="mt-5 max-w-[300px] flex-1 rounded gap-2 border-1 border-[#0f5cbb] p-2 border-dashed bg-[#d7ddf3] flex items-center justify-center cursor-pointer"
              >
                <CirclePlus color="#0f5cbb" />
                <p className="text-[14px] text-[#0f5cbb]">
                  Thêm nhóm phân loại
                </p>
              </div>

              {classification.map((_, i) => (
                <div key={i} className="mt-5">
                  <p className="w-[150px]">Phân loại hàng {i + 1}</p>
                  <div className="flex gap-2 mt-5 flex-col sm:flex-row">
                    <p className="w-[150px]">Tên nhóm phân loại</p>
                    <input
                      name="name"
                      onChange={(e) =>
                        handleClassificationNameChange(i, e.target.value)
                      }
                      value={classification[i].name}
                      type="text"
                      className="border-1 border-[#c5c5c5] flex-1 p-2 outline-0"
                      placeholder="Nhập tên nhóm phân loại vd: màu sắc, kích thước..."
                    />
                  </div>
                  {classification[i].name && (
                    <div>
                      <div className="flex gap-2 mt-5 ">
                        <p className="w-[150px]">Tên phân loại</p>
                        <input
                          type="text"
                          value={newDataName[i] || ""} // Sử dụng giá trị tạm của nhóm đó
                          onChange={(e) =>
                            handleDataNameChange(i, e.target.value)
                          }
                          className="border-1 border-[#c5c5c5] flex-1 p-2 outline-0"
                          placeholder="Nhập tên phân loại vd: đỏ, đen, xanh..."
                        />
                      </div>
                      <div className="flex gap-2 mt-5 ">
                        <div className="flex gap-2 mt-2">
                          <p className="w-[150px]">Giá</p>
                          <input
                            type="number"
                            value={newDataPrices[i] || 0}
                            onChange={(e) =>
                              handleDataPriceChange(i, e.target.value)
                            }
                            className="border-1 border-[#c5c5c5] flex-1 p-2 outline-0"
                            placeholder="Nhập giá (VD: 100000)"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-5 ">
                        <p className="w-[150px]">Số lượng</p>
                        <input
                          type="number"
                          value={newDataQuantities[i] || 0}
                          onChange={(e) =>
                            handleDataQuantityChange(i, e.target.value)
                          }
                          className="border-1 border-[#c5c5c5] flex-1 p-2 outline-0"
                          placeholder="Nhập số lượng (VD: 50)"
                        />
                      </div>
                      <div className="flex gap-2 mt-2">
                        <p className="w-[150px]">Ảnh</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleDataImageChange(
                              i,
                              e.target.files?.[0] || null
                            )
                          }
                          className="border-1 border-[#c5c5c5] flex-1 p-2 outline-0"
                        />
                      </div>

                      <button
                        onClick={() => handleAddDataItem(i)}
                        className="ml-2 p-2 bg-blue-500 text-white rounded"
                      >
                        Thêm
                      </button>
                      {/* Hiển thị danh sách các phân loại đã thêm */}
                      {classification[i].data.length > 0 && (
                        <div className="mt-5">
                          <p className="w-[150px] font-bold">
                            Danh sách phân loại:
                          </p>
                          <ul className="mt-2">
                            {classification[i].data.map((item, idx) => (
                              <li key={idx} className="flex gap-2 items-center">
                                <span>Tên: {item.name}</span> |
                                <span>Giá: {item.price}</span> |
                                <span>Số lượng: </span> |
                                <span>
                                  Ảnh:{" "}
                                  {item.image
                                    ? item.image.name
                                    : "Không có ảnh"}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {classification.length > 1 && (
                    <button
                      onClick={() => handleRemoveClassification(i)}
                      className="mt-2 text-red-500"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-2 mb-5">
                <button
                  className="bg-[#f4a300] text-[#ffffff] py-1 px-5 mt-2"
                  onClick={handleCreateProduct}
                >
                  {isLoading ? "Đang tạo..." : "Tạo"}
                </button>
                <button className="bg-[#d8d8d8] text-[#ffffff] py-1 px-5 mt-2">
                  Hủy
                </button>
              </div>
            </div>
          </div>
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

export default CreateProductsSellerManagement;
