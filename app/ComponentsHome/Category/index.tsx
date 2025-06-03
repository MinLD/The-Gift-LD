"use client";
import { GetAllCategories } from "@/app/Service/Admin";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
type category = {
  id: number;
  name: string;
  description: string;
  image: {
    url: string | null;
  };
};
type categoryPush = {
  id: number;
  name: string;
  description: string;
};
function Category() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState<number>(6);
  const router = useRouter();
  const [DataCategories, setDataCategories] = useState<category[]>([]);
  const [PushData, setPushData] = useState<categoryPush>({
    id: 0,
    name: "",
    description: "",
  });

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current?.scrollBy({ left: -273, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current?.scrollBy({ left: 273, behavior: "smooth" });
    }
  };

  const handlePushCategory = (
    id: number,
    name: string,
    description: string
  ) => {
    const query = new URLSearchParams({
      aa: id.toString(),
      bb: name,
      cc: description,
    });
    router.push(`/collections?${query}`);
  };

  const handleGetAllCategories = async () => {
    GetAllCategories()
      .then((res) => {
        console.log(res);
        setDataCategories(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
  };
  useEffect(() => {
    handleGetAllCategories();
  }, []);
  console.log(DataCategories);

  return (
    <div className="p-4">
      <h2 className=" text-[25px] sm:text-[30px] font-bold xl:text-[47px] text-[#272727] mt-10 text-left">
        Bộ Sưu Tập Quà Tặng
      </h2>

      <div className="w-full relative mt-10">
        <div
          onClick={scrollRight}
          className={`
          
          hover:cursor-pointer transition-all ease-in-out duration-100 hover:scale-110 z-10 right-[-25px] absolute top-1/2 transform -translate-y-1/2 w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] rounded-full flex items-center justify-center bg-[#f05626]`}
        >
          <ChevronRight size={20} aria-label="Next slide" color="#fff" />
        </div>
        <div
          onClick={scrollLeft}
          className={`
           
         hover:cursor-pointer transition-all ease-in-out duration-100 hover:scale-110 z-10 left-[-25px] absolute top-1/2 transform -translate-y-1/2 w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] rounded-full flex items-center justify-center bg-[#f05626]`}
        >
          <ChevronLeft size={20} aria-label="Previous slide" color="#fff" />
        </div>
        <div
          ref={scrollRef}
          className="grid gap-[16px] overflow-x-auto auto-cols-[calc(100%/2-11px)] sm:auto-cols-[calc(100%/3-11px)] lg:auto-cols-[calc(100%/4-11px)] xl:auto-cols-[calc(100%/5-11px)]  "
          style={{
            gridAutoFlow: "column",

            scrollbarWidth: "none",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
          }}
        >
          {DataCategories.map((slide, index) => (
            <div
              key={index}
              className="overflow-hidden bg-[#d8d8d8] rounded-3xl"
              style={{
                scrollSnapAlign: "start",
              }}
              onClick={() =>
                handlePushCategory(slide?.id, slide?.name, slide?.description)
              }
            >
              <div
                className="h-[200px] rounded-3xl p-5 relative hover:cursor-pointer overflow-hidden group"
                aria-label="Board Games Category"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110 "
                  style={{
                    backgroundImage: `url(${slide?.image?.url})`,
                  }}
                ></div>
                <div className="absolute bottom-2 left-5 right-5 flex justify-between items-center z-10">
                  <h2 className="text-[17px] text-[#ffffff] font-medium">
                    {slide?.name}
                  </h2>
                  <div className="w-[25px] h-[25px] bg-[#ffffff] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight size={10} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
