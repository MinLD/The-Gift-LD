"use client";
import Image from "next/image";
import imag from "../../../public/Banner/GoioisQua.png";
import imag1 from "../../../public/Banner/engraving_.png";
import useScrollHandling from "@/app/Hooks/scroll";

function GiftWrapping() {
  const { scrollPosition } = useScrollHandling();
  console.log(scrollPosition);

  return (
    <section className="text-center mt-30">
      <h3 className="text-[#272727] font-extrabold text-[14px] xl:text-[16px] mb-2">
        Dịch vụ theo yêu cầu
      </h3>
      <h2 className="text-[#272727] font-extralight text-[32px] xl:text-[40px] mx-3">
        Tạo dấu ấn riêng của bạn
      </h2>

      <div className="relative min-h-[600px] w-full">
        <div className="flex justify-center items-center mt-5 sticky top-30 w-full">
          <div className="relative h-[200px] w-full]">
            <Image
              src={imag}
              alt="Gift Wrapping Banner"
              width={333}
              height={193}
              priority
              placeholder="blur"
              className="rounded-2xl w-full h-auto"
            />
            <Image
              src={imag1}
              alt="Engraving Overlay"
              width={233}
              height={493}
              placeholder="blur"
              className="rounded-2xl absolute bottom-0 w-full transition-all duration-350 ease-in-out"
              style={{ height: `${scrollPosition >= 2320 ? 100 : 0}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default GiftWrapping;
