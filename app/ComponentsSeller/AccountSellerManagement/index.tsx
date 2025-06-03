"use client";
import LoaddingBox from "@/app/Components/BoxLoadding";
import LoadingOverlay from "@/app/Components/LoaddingOverlay";
import ModalConfirm from "@/app/Components/ModalConfirm";
import AdminCreateUser from "@/app/ComponentsOrthers/AdminCreateUser";
import ProfileEdit from "@/app/ComponentsOrthers/ProfileEdit";
import ProfileSellerEdit from "@/app/ComponentsOrthers/ProfileSellerEdit";
import { DeleteUsers, GetAllUsers } from "@/app/Service/Admin";
import { useProfileStore } from "@/app/zustand/store";
import {
  Code,
  Key,
  Mail,
  Phone,
  RectangleEllipsis,
  SquareChartGantt,
  User2,
} from "lucide-react";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

type DataUser = {
  id: string;
  isActive: boolean;
  code: string;
  profileUser: {
    address: string;
    city: string;
    country: string;
    dob: string;
    gender: string;
    id: number;
    phone: string;
    fullName: string;
    email: string;
  };
  seller: {
    id: number;
    name: string;
    description: string;
    taxCode: string;
    image: {
      url: string;
    };
  };
  roles: {
    name: string;
  }[];
}[];

function AccountSellerManagement() {
  const { User, fetchProfile } = useProfileStore();
  const titleTable = [
    {
      id: 0,
      name: "Hồ sơ của tôi",
      icon: User2,
      value: User?.seller?.name || "[Chưa cập nhật]",
    },
    {
      id: 5,
      name: "Mô Tả",
      icon: RectangleEllipsis,
      value: User?.seller?.description || "[Chưa cập nhật]",
    },
    {
      id: 1,
      name: "Số điện thoại",
      icon: Phone,
      value: User?.seller?.phone || "[Chưa cập nhật]",
    },
    {
      id: 2,
      name: "Email",
      icon: Mail,
      value: User?.profileUser?.email || "[Chưa cập nhật]",
    },
    {
      id: 3,
      name: "TaxCode",
      icon: SquareChartGantt,
      value: User?.seller?.taxCode || "[Chưa cập nhật]",
    },
    {
      id: 4,
      name: "Mật khẩu đăng nhập",
      icon: Key,
      value: "********",
    },
  ];
  const [data, setData] = useState<DataUser>([]);
  const [isEditProfile, setIsEditProfile] = useState<number>(-1);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [ConfirmDelete, setConfirmDelete] = useState<string>("");
  const [EditProfile, setEditProfile] = useState<boolean>(false);

  const handleGetAllUsers = () => {
    setLoading(true);
    GetAllUsers()
      .then((res) => {
        setData(res?.data?.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleDeleteUser = () => {
    setLoading(true);
    DeleteUsers(ConfirmDelete)
      .then(() => {
        toast.success("Xóa người dùng thành công");
        handleGetAllUsers();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    handleGetAllUsers();
  }, []);
  console.log(User);
  return (
    <div className="px-5">
      <div className="w-full h-[auto] bg-[#ffffff] ">
        <div className="p-4">
          <h2 className="text-[20px] font-medium">Tài Khoản</h2>
          <p className="text-[14px] text-[#c5c5c5] mt-2">
            Thay đổi thiết lập cơ bản
          </p>
        </div>

        <div className="mt-2 w-full h-[1px] bg-[#c5c5c5]" />

        {titleTable.map((item) => (
          <>
            <div className="flex justify-between px-8 py-5 items-center">
              <div className="flex justify-center gap-2">
                <div className="flex gap-2 items-center text-[14px] w-[200px]">
                  <item.icon />
                  <p>{item.name}</p>
                </div>

                <div className="flex gap-2 items-center">
                  {item.id === 0 && (
                    <Image
                      alt=""
                      src={User?.seller?.image?.url || ""}
                      width={30}
                      height={30}
                      className="rounded-full border-1 border-gray-200 bg-amber-50"
                    />
                  )}

                  <p>{item?.value}</p>
                </div>
              </div>
            </div>
            <div className=" w-full h-[1px] bg-[#f1f1f1]" />
          </>
        ))}

        <button
          onClick={() => setEditProfile(true)}
          className="text-[14px] mb-5 text-[#c5c5c5]  border-1 border-[#c5c5c5] p-2 bg-[#272727] mt-5 ml-5 hover:cursor-pointer"
        >
          Cập nhật thông tin
        </button>
        {EditProfile && (
          <>
            <div>
              <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={() => setIsEditProfile(-1)}
              ></div>

              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white p-4 w-[800px] h-auto rounded-xl shadow-lg">
                  <ProfileSellerEdit
                    phone={User?.seller?.phone || ""}
                    taxCode={User?.seller?.taxCode || ""}
                    description={User?.seller?.description || ""}
                    name={User?.seller?.name || ""}
                    id={User?.seller?.id || 0}
                    image={User?.seller?.image?.url || ""}
                    setClose={() => setEditProfile(false)}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AccountSellerManagement;
