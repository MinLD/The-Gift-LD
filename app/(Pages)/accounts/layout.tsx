import FooterOrthers from "@/app/ComponentsOrthers/Layout/Footer";
import HeaderOrthers from "@/app/ComponentsOrthers/Layout/Header";

type Props = {
  children: React.ReactNode;
};
function Layout({ children }: Props) {
  return (
    <>
      <div className="bg-[#f5f5f5] min-h-screen w-full  ">
        <HeaderOrthers />
        <div className="mx-auto w-[92vw] lg:w-[75vw] xl:w-[80vw] py-10">
          {children}
        </div>
        <FooterOrthers />
      </div>
    </>
  );
}

export default Layout;
