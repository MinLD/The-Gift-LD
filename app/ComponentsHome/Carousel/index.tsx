// Carousel.tsx
import { useEffect, useState } from "react";

import { ChevronLeft } from "lucide-react";

type Props = {
  children?: React.ReactNode;
  slides: { name: string; description: string; image: string }[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
};

function Carousel({
  children,
  slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}: Props) {
  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr(curr === 0 ? slides.length - 1 : curr - 1);
  };

  const next = () => {
    setCurr(curr === slides.length - 1 ? 0 : curr + 1);
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(() => {
      setCurr((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, slides.length]);

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {children}
      </div>

      <div className="absolute right-10 bottom-10 flex gap-2">
        <button
          className="text-white border border-white w-10 h-10 md:w-15  md:h-15 rounded-full flex items-center justify-center"
          onClick={prev}
        >
          <ChevronLeft size={24} className="md:w-6 md:h-6" />
        </button>
        <button
          className="text-white border border-white w-10 h-10 md:w-15  md:h-15 rounded-full flex items-center justify-center"
          onClick={next}
        >
          <ChevronLeft className="rotate-180 md:w-6 md:h-6" size={24} />
        </button>
      </div>

      <div className="bottom-2 md:bottom-4 right-0 left-0 absolute">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`transition-all w-3 h-3 rounded-full bg-white ${
                curr === idx ? "p-2" : "bg-opacity-50"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
