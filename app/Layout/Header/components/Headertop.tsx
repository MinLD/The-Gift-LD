"use client";
import { useState } from "react";
import { dataHeader } from "./contants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import MyLayOut from "@/app/MyLayout/layout";

function HeaderTop() {
  const [index, setIndex] = useState(0);

  const prevText = () => {
    setIndex((prev) => (prev === 0 ? dataHeader.length - 1 : prev - 1));
  };

  const nextText = () => {
    setIndex((prev) => (prev + 1) % dataHeader.length);
  };
  return (
    <div className="w-full h-[45px]  bg-[#39523f] justify-center items-center flex">
      <MyLayOut>
        <div className="flex items-center justify-between max-w-[60vw] mx-auto  text-white text-center">
          <ChevronLeft
            size={20}
            className="cursor-pointer"
            onClick={prevText}
          />
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }} //Trạng thái ban đầu khi phần tử xuất hiện (mờ và trượt xuống 10px).
              animate={{ opacity: 1, y: 0 }} //Trạng thái cuối khi phần tử hiển thị (toàn phần, về vị trí ban đầu).
              exit={{ opacity: 0, y: -10 }} //Trạng thái khi phần tử rời đi (mờ và trượt lên -10px).
              transition={{ duration: 0.5 }} //Thời gian animation là 0.5 giây.
              className="text-[13px]"
            >
              {dataHeader[index].name}
            </motion.p>
          </AnimatePresence>
          <ChevronRight
            size={20}
            className="cursor-pointer"
            onClick={nextText}
          />
        </div>
      </MyLayOut>
    </div>
  );
}

export default HeaderTop;
