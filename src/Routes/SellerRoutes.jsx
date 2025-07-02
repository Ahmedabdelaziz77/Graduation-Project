import { Route, Routes } from "react-router-dom";
import Products from "../seller/pages/Products/products";
import AddProduct from "../seller/pages/Products/AddProduct";
import Orders from "../seller/pages/Orders/Orders";
import Profile from "../seller/pages/Account/Profile";
import Payment from "../seller/pages/Payment/Payment";
import Transaction from "../seller/pages/Payment/Transaction";
import Dashboard from "../seller/pages/SellerDashboard/Dashboard";

function SellerRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        {/* <Route path="/transaction" element={<Transaction />} /> */}
      </Routes>
    </div>
  );
}

export default SellerRoutes;
