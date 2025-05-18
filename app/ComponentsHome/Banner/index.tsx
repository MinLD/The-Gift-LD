"use client";
import Carousel from "@/app/ComponentsHome/Carousel";

import Image from "next/image";

function Banner() {
  const slides = [
    {
      name: "Switzerland",
      description: "X-Dev, Transforming code into visual poetry..!",
      image:
        "https://thecrafthouse.vn/cdn/shop/files/TCH_APR_WebBanner2-VN.jpg?v=1746158553&width=2000",
    },
    {
      name: "Finland",
      description: "X-Dev, Transforming code into visual poetry..!",
      image:
        "https://thecrafthouse.vn/cdn/shop/files/TCH_WebBanner_VanhoaViet.png?v=1740021657&width=2000",
    },
    {
      name: "Iceland",
      description: "X-Dev, Transforming code into visual poetry..!",
      image:
        "https://thecrafthouse.vn/cdn/shop/files/TCH_WebBanner_ArtisanBoardgame.png?v=1740021626&width=2000",
    },
    {
      name: "Australia",
      description: "X-Dev, Transforming code into visual poetry..!",
      image:
        "https://thecrafthouse.vn/cdn/shop/files/TCH_WebBanner_YourHome2.jpg?v=1740021733&width=2000",
    },
  ];

  return (
    <div className="w-full mx-auto ">
      <Carousel slides={slides} autoSlide={true} autoSlideInterval={10000}>
        {slides.map((item) => (
          <div key={item.name} className="w-full flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              width={1920}
              height={800}
              className="w-full h-auto object-cover lg:aspect-[10/4] aspect-[3/2]"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Banner;
