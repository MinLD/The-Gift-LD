import Banner from "@/app/ComponentsHome/Banner";
import Category from "@/app/ComponentsHome/Category";
import GiftCart from "@/app/ComponentsHome/GiftCart";
import MyLayOut from "@/app/MyLayout/layout";
import { myInfo } from "@/app/Service/User";

export default async function Home() {
  const hanlde = () => {
    myInfo()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  hanlde();

  return (
    <>
      <MyLayOut>
        <Banner />
        <Category />
      </MyLayOut>

      <GiftCart />
    </>
  );
}
