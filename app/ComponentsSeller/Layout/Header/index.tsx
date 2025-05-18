import MyLayOut from "@/app/MyLayout/layout";
import Image from "next/image";
import logo from "@/public/logo2.png";
function HeaderSeller() {
  return (
    <div className="w-full h-[70px] items-center flex justify-center">
      <MyLayOut>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 justify-center items-center">
            <div className="flex items-center justify-center w-[100px] h-[70px]">
              <Image
                src={logo.src}
                alt="logo"
                className="w-[60px] h-[45px]"
                width={60}
                height={45}
              />
            </div>
            <h2 className="text-[20px]  text-[#39523f]">
              Đăng ký trở thành Người bán TheCraftLD
            </h2>
          </div>
          <p className="text-[#39523f]">Bạn cần giúp đỡ?</p>
        </div>
      </MyLayOut>
    </div>
  );
}

export default HeaderSeller;
