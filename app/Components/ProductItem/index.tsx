import Image from "next/image";

type props = {
  image1: string;
  image2: string;
  title: string;
  price: number;
  discount: number;
};
function ProductItem({ image1, image2, title, price, discount }: props) {
  return (
    <div className="w-full h-[400px] rounded-xl">
      <div className="relative w-full h-2/3 hover:cursor-pointer">
        {image1 && image2 ? (
          <div>
            <Image
              alt={`Hình ảnh của sản phẩm ${title}`}
              src={image1 || "/fallback-image.jpg"}
              width={300}
              height={300}
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-t-xl transition-opacity duration-300 hover:opacity-0"
            />
            {image2 && (
              <Image
                alt={`Hình ảnh phụ của sản phẩm ${title}`}
                src={image2}
                width={300}
                height={300}
                loading="lazy"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-t-xl opacity-0 transition-opacity duration-300 hover:opacity-100"
              />
            )}
          </div>
        ) : (
          <Image
            alt={`Hình ảnh mặc định của sản phẩm ${title}`}
            src="/fallback-image.jpg"
            width={300}
            height={300}
            loading="lazy"
            className="w-full h-full object-cover rounded-t-xl"
          />
        )}
      </div>
      <div className="w-full h-1/3 flex flex-col gap-2 mt-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <p className="text-[#F15D2F]">
            {typeof price === "number" ? price.toLocaleString() + "đ" : "N/A"}
          </p>
          <p className="text-[#7c7c7c] line-through">
            {typeof price === "number"
              ? (price * 1.3).toLocaleString() + "đ"
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
