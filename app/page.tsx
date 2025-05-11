import Banner from "@/app/ComponentsHome/Banner";
import GiftCart from "@/app/ComponentsHome/GiftCart";
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
      <Banner />
      <GiftCart />
    </>
  );
}
