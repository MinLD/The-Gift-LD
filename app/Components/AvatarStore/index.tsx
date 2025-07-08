"use client";
import { MessageSquareText, Store } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  image: string;
  name: string;
  id: number;
};

function AvatarStore({ image, name, id }: Props) {
  const router = useRouter();
  const handlePushMall = () => {
    const query = new URLSearchParams({
      idSeller: id.toString(),
      nameSeller: name,
    });
    router.push(`/mall/?${query}`);
  };
  return (
    <div className="w-full h-auto flex gap-5 bg-[#ffffff] mt-10 items-center">
      <div className="w-[80px] h-[80px] border-1 border-[#d8d8d8] rounded-full relative">
        <Image
          placeholder="empty"
          quality={85}
          priority
          alt=""
          src={image}
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-full"
        />
        <div className="text-xs w-[70px] h-5 bg-[#EE4D2D] text-white  flex items-center justify-center absolute bottom-0 left-1/2 -translate-x-1/2 rounded-sm">
          Yêu Thích
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-[16px] text-[#272727] font-medium "> {name}</h2>
        <h2 className="text-[14px] text-[#9999A9]  "> Online 6 phút trước</h2>
        <div className="flex  gap-2">
          <div className="text-[16px] flex gap-2 items-center bg-[#FFEEE8] p-1 border border-[#EE4D2D] hover:cursor-pointer  hover:text-white">
            <MessageSquareText size={20} color="#EE4D2D" />{" "}
            <span className="text-[#EE4D2D]">Chat Ngay</span>
          </div>
          <div
            onClick={() => handlePushMall()}
            className="text-[16px] flex gap-2 items-center p-1 border border-[#c5c5c5] hover:cursor-pointer "
          >
            <Store size={20} /> Xem Shop
          </div>
        </div>
      </div>

      <div className="w-[1px] opacity-15 h-[50px] bg-[#9999A9] rounded-2xl" />

      <div></div>
    </div>
  );
}

export default AvatarStore;
