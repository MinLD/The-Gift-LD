"use client";

import LoadingOverlay from "@/app/Components/LoaddingOverlay";
import ModalConfirm from "@/app/Components/ModalConfirm";

import SellerCreateAddress from "@/app/ComponentsSeller/SellerCreateAddress";
import SellerEditAddress from "@/app/ComponentsSeller/SellerEditAddress";

import { Delete } from "@/app/Service/Seller";
import { useProfileStore } from "@/app/zustand/store";
import { MapPinHouse } from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";

function AddressSellerManagement() {
  const { User, fetchProfile } = useProfileStore();
  const [isLoading, setLoading] = useState<boolean>(true);
  console.log(isLoading);
  const [ConfirmDelete, setConfirmDelete] = useState<number>(-1);
  const [EditProfile, setEditProfile] = useState<number>(-1);
  const [AddAddress, setAddAddress] = useState<boolean>(false);

  const handleDeleteUser = () => {
    setLoading(true);
    Delete(ConfirmDelete)
      .then(() => {
        fetchProfile();
        toast.success("Xóa địa chỉ thành công!");
        setLoading(false);
        setConfirmDelete(-1);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
        setConfirmDelete(-1);
      });
  };

  return (
    <div className="px-2">
      <div className="w-full h-[auto] bg-[#ffffff] ">
        <div className="p-2  flex lg:justify-between flex-col lg:flex-row lg:items-center gap-2">
          <div>
            <h2 className="text-[20px] font-medium">Địa Chỉ</h2>
            <p className="text-[14px] text-[#c5c5c5] mt-2">
              Quản lý việc vận chuyển và địa chỉ giao hàng của bạn
            </p>
          </div>
          <button
            className="bg-[green] text-white px-5 py-2 hover:cursor-pointer lg:w-auto  rounded-md w-2/3"
            onClick={() => {
              setAddAddress(true);
            }}
          >
            Thêm Địa Chỉ Mới
          </button>
          {AddAddress && (
            <>
              {" "}
              <div>
                <div
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                  onClick={() => setAddAddress(false)}
                ></div>

                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="bg-white p-4 w-full max-w-[90%] sm:max-w-[600px] lg:max-w-[800px] h-auto rounded-xl shadow-lg">
                    <SellerCreateAddress
                      setClose={() => setAddAddress(false)}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-2 mb-5 w-full h-[1px] bg-[#c5c5c5]" />

        <div className="flex flex-col  gap-2  px-2 overflow-x-scroll  w-full">
          {User?.addresses?.length ? (
            <>
              {" "}
              {User?.addresses?.map((i) => (
                <div key={i.id}>
                  <div className="flex gap-5 items-center px-2">
                    <MapPinHouse
                      size={50}
                      className="w-8 h-8 sm:w-12 sm:h-12"
                      color="green"
                    />
                    <div className="flex gap-2 flex-col">
                      <Form
                        name={"Họ Và Tên"}
                        value={i.name || "[Chưa cập nhật]"}
                      />
                      <Form
                        name={"Số điện thoại"}
                        value={i.phone || "[Chưa cập nhật]"}
                      />
                      <Form
                        name={"Loại địa chỉ"}
                        value={i.isType || "[Chưa cập nhật]"}
                        defaultt={i.addressDefault}
                      />

                      <Form
                        name={"Địa chi"}
                        value={i.address || "[Chưa cập nhật]"}
                      />
                      <Form
                        name={"Địa chi chi tiết"}
                        value={i.detailsAddress || "[Chưa cập nhật]"}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setEditProfile(i.id)}
                    className="text-[14px] mb-5 text-[blue]  p-2 mt-5 ml-5 hover:cursor-pointer"
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
                            <SellerEditAddress
                              address={i.address}
                              detailsAddress={i.detailsAddress}
                              id={i.id}
                              name={i.name}
                              phone={i.phone}
                              addressDefault={i.addressDefault}
                              isType={i.isType}
                              setClose={() => setEditProfile(-1)}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <button
                    onClick={() => setConfirmDelete(i.id)}
                    className="text-[14px] mb-5 text-[red]  p-2 mt-5 ml-5 hover:cursor-pointer"
                  >
                    Xóa
                  </button>
                  {ConfirmDelete === i.id && (
                    <ModalConfirm
                      setClose={() => setConfirmDelete(-1)}
                      handle={handleDeleteUser}
                      message={i.name}
                    />
                  )}

                  <div className=" w-full h-[1px] bg-[#f1f1f1]" />
                </div>
              ))}
            </>
          ) : (
            <>
              <LoadingOverlay
                message="Bạn chưa cập nhật địa chỉ!"
                isEmsty={true}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddressSellerManagement;

const Form = ({
  defaultt = false,
  name = "",
  value,
}: {
  defaultt?: boolean;
  name?: string;
  value: string;
  details?: string;
  isType?: string;
}) => {
  return (
    <>
      <div className="flex flex-col gap-1 sm:flex-row sm:gap-5 ">
        <p className="text-[#c5c5c5] text-[14px] w-[90px]">{name} </p>

        <p className="text-[13px] sm:text-[14px] ">{value}</p>
        <p className="text-[red] text-[12px]">
          {defaultt && "[Địa chỉ mặc định]"}
        </p>
      </div>
    </>
  );
};
