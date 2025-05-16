import { Route, Routes } from "react-router-dom";
import SellersTable from "../admin/pages/Sellers/SellersTable";
import Coupon from "../admin/pages/Coupon/Coupon";
import AddNewCoupon from "../admin/pages/Coupon/AddNewCoupon";
import ShopByCategory from "../admin/pages/Home/ShopByCategory";
import Deal from "../admin/pages/Home/Deal";
import Customize from "../admin/pages/Home/Customize";
import Appointment from "../admin/pages/Home/Appointment";
function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SellersTable />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/add-coupon" element={<AddNewCoupon />} />
        <Route path="/shop-by-category" element={<ShopByCategory />} />
        <Route path="/deals" element={<Deal />} />
        <Route path="/customize-requests" element={<Customize />} />
        <Route path="/appointments" element={<Appointment />} />
      </Routes>
    </div>
  );
}

export default AdminRoutes;
