import HeaderBottom from "@/app/Layout/Header/components/HeaderBottom";
import HeaderTop from "@/app/Layout/Header/components/Headertop";

function MyHeader() {
  return (
    <div className="z-50">
      <HeaderTop />
      <div className="shadow-md transition-all duration-800 ease-in-out sticky top-0 z-50 w-full bg-white ">
        <HeaderBottom />
      </div>
    </div>
  );
}

export default MyHeader;
