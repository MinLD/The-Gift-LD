import { Award, RefreshCw, Shield, Truck } from "lucide-react";

function FeaturesSection() {
  return (
    <>
      {/* Features Section */}
      <section className="py-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-10 h-10 text-[#f05626]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Miễn Phí Giao Hàng</h3>
              <p className="text-gray-600">Cho đơn hàng {`>`} 500,000 VND</p>
            </div>
            <div className="text-center">
              <div className=" w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-[#f05626]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Thanh toán an toàn</h3>
              <p className="text-gray-600">
                Thông tin thanh toán của bạn được an toàn
              </p>
            </div>
            <div className="text-center">
              <div className=" w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-[#f05626]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Chất lượng được đảm bảo
              </h3>
              <p className="text-gray-600">Chỉ sản phẩm chất lượng cao cấp</p>
            </div>
            <div className="text-center">
              <div className=" w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-10 h-10 text-[#f05626]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Trả hàng dễ dàng</h3>
              <p className="text-gray-600">Chính sách đổi trả trong 30 ngày</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FeaturesSection;
