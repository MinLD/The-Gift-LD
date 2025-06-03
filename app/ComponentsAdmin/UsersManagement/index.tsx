"use client";
import LoaddingBox from "@/app/Components/BoxLoadding";
import LoadingOverlay from "@/app/Components/LoaddingOverlay";
import ModalConfirm from "@/app/Components/ModalConfirm";
import AdminCreateUser from "@/app/ComponentsOrthers/AdminCreateUser";
import ProfileEdit from "@/app/ComponentsOrthers/ProfileEdit";
import ProfileSellerEdit from "@/app/ComponentsOrthers/ProfileSellerEdit";
import { DeleteUsers, GetAllUsers } from "@/app/Service/Admin";
import { useEffect, useState } from "react";
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
    phone: string;
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

function UsersManagement() {
  const titleTable = [
    {
      id: 0,
      name: "ID",
    },
    {
      id: 1,
      name: "Họ Tên",
    },
    {
      id: 2,
      name: "Email",
    },
    {
      id: 3,
      name: "Vai Trò",
    },
    {
      id: 4,
      name: "Trạng Thái",
    },
    {
      id: 5,
      name: "Hành Động",
    },
  ];
  const [data, setData] = useState<DataUser>([]);
  const [isEditProfile, setIsEditProfile] = useState<number>(-1);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [ConfirmDelete, setConfirmDelete] = useState<string>("");
  const [AddUser, setAddUser] = useState<boolean>(false);

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

  return (
    <>
      <div className="container mx-auto py-2 ">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 sm:text-center">
          Quản Lý Người Dùng
        </h1>

        <div className="flex flex-col xl:flex-row justify-between mb-6 gap-4">
          <div className="relative  sm:w-2/3 w-4/5">
            <input
              type="text"
              id="searchInput"
              placeholder="Tìm kiếm người dùng..."
              className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            className="w-3/4 sm:w-2/5  bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            onClick={() => setAddUser(true)}
          >
            Thêm Người Dùng
          </button>
          {AddUser && (
            <div>
              <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={() => setIsEditProfile(-1)}
              ></div>

              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white p-4 w-[800px] h-auto rounded-xl shadow-lg">
                  <AdminCreateUser setClose={() => setAddUser(false)} />
                </div>
              </div>
            </div>
          )}
        </div>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div className="max-w-[100vw] overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {titleTable.map((item) => (
                    <th
                      key={item.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {item.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, k) => (
                  <tr key={k || item?.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item?.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.profileUser?.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.profileUser?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.roles[0]?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.isActive ? "Hoạt động" : "Không hoạt động"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2 cursor-pointer"
                        onClick={() => {
                          setIsEditProfile(k);
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={() => setConfirmDelete(item?.id)}
                      >
                        Xóa
                      </button>
                      {ConfirmDelete === item?.id && (
                        <ModalConfirm
                          setClose={() => setConfirmDelete("")}
                          handle={() => handleDeleteUser()}
                        />
                      )}

                      {isEditProfile === k && (
                        <div>
                          <div
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                            onClick={() => setIsEditProfile(-1)}
                          ></div>

                          <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <div className="bg-white p-4 w-[800px] h-auto rounded-xl shadow-lg">
                              {item?.roles[0]?.name === "SELLER" ? (
                                <ProfileSellerEdit
                                  phone={item?.seller?.phone}
                                  id={item.seller?.id || 0}
                                  setClose={() => setIsEditProfile(-1)}
                                  image={item?.seller?.image?.url}
                                  description={item?.seller?.description}
                                  name={item?.seller?.name}
                                  taxCode={item?.seller?.taxCode}
                                />
                              ) : (
                                <ProfileEdit
                                  id={item?.profileUser?.id || 0}
                                  setClose={() => setIsEditProfile(-1)}
                                  email={item?.profileUser?.email}
                                  fullName={item?.profileUser?.fullName}
                                  phone={item?.profileUser?.phone}
                                  dob={item?.profileUser?.dob}
                                  gender={item?.profileUser?.gender}
                                  type="admin"
                                  country={item?.profileUser?.country}
                                  city={item?.profileUser?.city}
                                  address={item?.profileUser?.address}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default UsersManagement;
