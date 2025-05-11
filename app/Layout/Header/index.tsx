import HeaderBottom from "@/app/Layout/Header/components/HeaderBottom";
import HeaderTop from "@/app/Layout/Header/components/Headertop";

function MyHeader() {
  return (
    <>
      <HeaderTop />
      <div className="sticky top-0 z-50 w-full bg-white shadow-md transition-all duration-800 ease-in-out">
        <HeaderBottom />
      </div>
    </>
  );
}

export default MyHeader;
