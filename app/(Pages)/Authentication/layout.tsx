type Props = {
  children: React.ReactNode;
};
function Layout({ children }: Props) {
  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-[#f5f5f5] ">
        <div className=" bg-[#ffffff] shadow-2xl w-[600px] h-auto rounded-2xl pb-10">
          <div className="px-5">
            <div className="mt-10">
              <img
                src="https://cdn.shopify.com/s/files/1/1104/4168/files/Allbirds.Logo.Black.RGB.Large_200x60@2x.png?v=1613734536.webp"
                alt="Logo-SignIn"
                className="w-[200px] h-[60px] mx-auto object-cover"
              />
            </div>
            <div className="mt-5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
