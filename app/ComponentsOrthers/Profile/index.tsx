"use client";
import AddressEdit from "@/app/ComponentsOrthers/AddressEdit";
import InputBox from "@/app/ComponentsOrthers/InputBox";
import ProfileEdit from "@/app/ComponentsOrthers/ProfileEdit";
import { useProfileStore } from "@/app/zustand/store";
import { CircleAlert, Pencil, X } from "lucide-react";
import { useState } from "react";

function Profile() {
  const { User } = useProfileStore();
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [typeEdit, setTypeEdit] = useState<string>("");
  const hadProfile =
    User?.profileUser.address ||
    User?.profileUser.city ||
    User?.profileUser.country
      ? true
      : false;

  return (
    <div>
      <h2 className="text-xl font-bold">Profile </h2>
      <div className="w-full h-auto bg-[#ffffff] mt-10 rounded-2xl p-4">
        <div className="flex  gap-2 items-center">
          <p className="font-black">{User?.fullName}</p>
          <div className="hover:cursor-pointer ">
            <Pencil
              size={15}
              onClick={() => {
                setShowProfile(true);
                setTypeEdit("profile");
              }}
            />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-gray-500">Email</p>
          <p>{User?.email}</p>
        </div>
      </div>

      <div className="w-full h-auto bg-[#ffffff] mt-10 rounded-2xl p-4">
        <div className="flex  gap-4 items-center">
          <p className="font-medium text-3xl ">Address</p>

          <div
            className="font-bold flex gap-2 items-center hover:cursor-pointer"
            onClick={() => {
              setShowProfile(true);
              setTypeEdit("address");
            }}
          >
            + Add
          </div>
        </div>
        <div>
          {hadProfile ? (
            <div className="flex flex-col gap-2 mt-5">
              <h2 className="text-md text-gray-500 ">Default address</h2>
              <p className="">{User?.profileUser?.city}</p>
              <p>{User?.profileUser?.address}</p>
              <p>{User?.profileUser?.country}</p>
            </div>
          ) : (
            <div className="mt-3 bg-[#f5f5f5] p-4 rounded-lg w-full h-[50px] border-1 flex items-center mb-3">
              <div className="flex gap-2 items-center">
                <div>
                  <CircleAlert size={20} />
                </div>
                <div>No addresses added</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showProfile && (
        <div>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setShowProfile(false)}
          ></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-4 w-[800px] h-auto rounded-xl shadow-lg">
              {typeEdit === "profile" && (
                <div>
                  <ProfileEdit
                    id={User?.profileUser?.id || 0}
                    setClose={() => setShowProfile(false)}
                    email={User?.email}
                    fullName={User?.fullName}
                    phone={User?.profileUser?.phone}
                    dob={User?.profileUser?.dob}
                    gender={User?.profileUser?.gender}
                  />
                </div>
              )}
              {typeEdit === "address" && (
                <AddressEdit
                  setClose={() => setShowProfile(false)}
                  country={User?.profileUser?.country || ""}
                  id={User?.profileUser?.id || 0}
                  city={User?.profileUser?.city || ""}
                  address={User?.profileUser?.address || ""}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
