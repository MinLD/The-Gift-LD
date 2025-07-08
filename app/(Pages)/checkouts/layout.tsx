import { ShoppingBasket } from "lucide-react";

type Props = { children: React.ReactNode };
function Layout({ children }: Props) {
  return (
    <>
      <div className="h-[70px] border-b-1 border-[#d8d8d8] w-full">
        <div className="w-[92vw] lg:w-[75vw] xl:w-[80vw] mx-auto flex items-center justify-between h-full px-5 ">
          <div className="text-2xl font-bold">The Gift LD</div>
          <div className="text-3xl font-bold">
            <ShoppingBasket color="#1773b0" strokeWidth={1} size={30} />
          </div>
        </div>
      </div>
      <div className="w-[92vw] lg:w-[75vw] xl:w-[80vw] mx-auto flex items-center justify-between h-full px-5 ">
        {children}
      </div>
      <div className="mt-10 mb-10 w-[92vw] lg:w-[75vw] xl:w-[80vw] mx-auto flex items-center justify-between h-full px-5 border-t-1 border-[#d8d8d8] ">
        <div className="text-sm text-[#1773b0] mt-4 ">chính sách riêng tư</div>
      </div>
    </>
  );
}

export default Layout;
