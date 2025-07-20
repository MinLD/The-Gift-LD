"use client";
import ProductItem from "@/app/Components/ProductItem";
import { GetAllCategories } from "@/app/Service/Admin";
import { GetTop5ViewProducts } from "@/app/Service/products";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

type product = {
  sku: string;
  id: number;
  title: string;
  description: string;
  price: number;
  views: number;
  images: {
    url: string | null;
  }[];
  discount: number;
};

type Props = {
  title: string;
  description?: string;
  type?: string;
};

function Category({ title, description = "", type = "category" }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isShowScroll, setIsShowScroll] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const router = useRouter();
  const [DataCategories, setDataCategories] = useState<category[]>([]);
  const [products, setProducts] = useState<product[]>([]);

  // Kiểm tra trạng thái cuộn để hiển thị/ẩn nút
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // Chỉ hiển thị nút nếu danh sách có thể cuộn
      const canScroll = scrollWidth > clientWidth;
      setIsShowScroll(canScroll);
      // Ẩn nút trái khi ở đầu danh sách
      setCanScrollLeft(scrollLeft > 0);
      // Ẩn nút phải khi ở cuối danh sách (sai số nhỏ để xử lý giá trị thập phân)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  // Gắn sự kiện cuộn và resize
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll); // Kiểm tra lại khi thay đổi kích thước màn hình
      checkScroll(); // Kiểm tra ban đầu
      return () => {
        scrollElement.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [DataCategories, products]); // Cập nhật khi dữ liệu thay đổi

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -273, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 273, behavior: "smooth" });
    }
  };

  const handlePushDetailProduct = (id_Product: number, title: string) => {
    const query = new URLSearchParams({
      aa: id_Product.toString(),
      bb: title,
    });
    router.push(`/collections/product?${query}`);
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
        setDataCategories(res?.data?.result || []);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.response?.data?.message || "Lỗi khi lấy danh mục");
      });
  };

  const handleGetTop5ViewProducts = async () => {
    GetTop5ViewProducts()
      .then((res) => {
        setProducts(res?.data?.result || []);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.response?.data?.message || "Lỗi khi lấy sản phẩm");
      });
  };

  useEffect(() => {
    if (type === "product") {
      handleGetTop5ViewProducts();
    } else if (type === "category") {
      handleGetAllCategories();
    }
  }, [type]);

  return (
    <div className="p-1">
      <h2 className="text-[25px] sm:text-[30px] font-bold xl:text-[47px] text-[#272727] mt-20 text-left">
        {title}
      </h2>
      <h2 className="text-[12px] sm:text-[15px] xl:text-[17px] text-[#272727] mt-2 text-left max-w-[900px]">
        {description}
      </h2>

      <div
        className="w-full relative mt-10"
        onMouseEnter={() => setIsShowScroll(true)}
        onMouseLeave={() => setIsShowScroll(false)}
      >
        {isShowScroll && (
          <>
            {canScrollLeft && (
              <div
                onClick={scrollLeft}
                className="hover:opacity-100 opacity-100 hover:cursor-pointer transition-all ease-in-out duration-100 hover:scale-110 z-10 left-[-25px] absolute top-1/2 transform -translate-y-1/2 w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] md:w-[40px] md:h-[50px] rounded-full flex items-center justify-center bg-[#6c6b6b53]"
              >
                <ChevronLeft
                  size={20}
                  aria-label="Previous slide"
                  color="#fff"
                />
              </div>
            )}
            {canScrollRight && (
              <div
                onClick={scrollRight}
                className="hover:opacity-100 opacity-100 hover:cursor-pointer transition-all ease-in-out duration-100 hover:scale-110 z-10 right-[-25px] absolute top-1/2 transform -translate-y-1/2 w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] md:w-[40px] md:h-[50px] rounded-full flex items-center justify-center bg-[#6c6b6b53]"
              >
                <ChevronRight size={20} aria-label="Next slide" color="#fff" />
              </div>
            )}
          </>
        )}
        <div
          ref={scrollRef}
          className=" grid gap-[16px] overflow-x-auto auto-cols-[calc(100%/2-11px)] sm:auto-cols-[calc(100%/3-11px)] lg:auto-cols-[calc(100%/4-11px)] xl:auto-cols-[calc(100%/5-11px)]"
          style={{
            gridAutoFlow: "column",
            scrollbarWidth: "none",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
          }}
        >
          {type === "category" && (
            <>
              {DataCategories.map((slide, index) => (
                <div
                  key={index}
                  className="overflow-hidden bg-[#d8d8d8] rounded-3xl"
                  style={{ scrollSnapAlign: "start" }}
                  onClick={() =>
                    handlePushCategory(
                      slide?.id,
                      slide?.name,
                      slide?.description
                    )
                  }
                >
                  <div
                    className="h-[200px] rounded-3xl p-5 relative hover:cursor-pointer overflow-hidden group"
                    aria-label={`${slide?.name} Category`}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${
                          slide?.image?.url || "/fallback-image.jpg"
                        })`,
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
            </>
          )}
          {type === "product" && (
            <>
              {products.map((slide, index) => (
                <div
                  key={index}
                  style={{ scrollSnapAlign: "start" }}
                  onClick={() => handlePushDetailProduct(slide.id, slide.title)}
                >
                  <ProductItem
                    sku={slide?.sku || ""}
                    image1={slide?.images[0]?.url || "/fallback-image.jpg"}
                    image2={slide?.images[1]?.url || "/fallback-image.jpg"}
                    title={slide?.title}
                    price={slide?.price}
                    discount={slide?.discount}
                    views={slide?.views}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
