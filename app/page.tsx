import Banner from "@/app/ComponentsHome/Banner";
import Category from "@/app/ComponentsHome/Category";
import GiftCart from "@/app/ComponentsHome/GiftCart";
import MyLayOut from "@/app/MyLayout/layout";

export default async function Home() {
  return (
    <>
      <MyLayOut>
        <Banner />
        <Category title="Bộ Sưu Tập Quà Tặng" />
        <Category
          type="product"
          title="Quà Tặng Bán Chạy"
          description="Mỗi sản phẩm quà tặng trong bộ sưu tập của chúng tôi được chế tác công phu, tôn vinh từng chi tiết tinh xảo và lấy cảm hứng từ sự đa dạng của các truyền thống văn hóa."
        />
      </MyLayOut>

      <GiftCart />
    </>
  );
}
