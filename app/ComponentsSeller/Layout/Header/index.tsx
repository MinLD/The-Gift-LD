import MyLayOut from "@/app/MyLayout/layout";
import Image from "next/image";
import logo from "@/public/logo2.png";
function HeaderSeller() {
  return (
    <div className="w-full h-[70px] items-center flex justify-center">
      <MyLayOut>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 justify-center items-center">
            <div className="flex items-center justify-center w-[60px] h-[70px]">
              <Image
                src={logo.src}
                alt="logo"
                className="w-[60px] h-[45px]"
                width={60}
                height={45}
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-[12px] sm:text-[14px] text-[#39523f]">Đăng ký bán hàng</h2>
              <h2 className="text-[10px] sm:text-[12px] font-bold text-[#39523f] text-center">
                TheCraftLD
              </h2>
            </div>
          </div>
          <p className="text-[#39523f] text-[12px] sm:text-[14px]">Bạn cần giúp đỡ?</p>
        </div>
      </MyLayOut>
    </div>
  );
}

export default HeaderSeller;
