import { ThemeProvider } from "@mui/material";
import Navbar from "./customer/components/Navbar/Navbar";
import customTheme from "./theme/customTheme";
import Home from "./customer/pages/Home/Home";
import Product from "./customer/pages/Product/Product";
import ProductDetails from "./customer/pages/ProductDetails/ProductDetails";
import Review from "./customer/pages/Review/Review";
import Cart from "./customer/pages/Cart/Cart";
import Checkout from "./customer/pages/Checkout/Checkout";
import Account from "./customer/pages/Account/Account";
import { Route, Routes } from "react-router-dom";

import OfferCustomize from "./customer/pages/offerCustomize/OfferCustomize";
import SmartApp from "./customer/pages/offerCustomize/SmartApp";
import LastPageCustomize from "./customer/pages/offerCustomize/LastPageCustomize";
import Appointment from "./customer/pages/Appointment/Appointment";
import BecomeSeller from "./customer/pages/BecomeSeller/BecomeSeller";
import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard";
import AdminDashboard from "./admin/pages/Dashboard/AdminDashboard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./State/Store";
import Auth from "./customer/pages/Auth/Auth";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import { fetchCategorysWithProducts } from "./State/customer/categoryWithProductsSlice";
import Spinner from "./components/Spinner";
import MiniError from "./components/MiniError";
import OCR from "./customer/pages/OCR/OCR";
function App() {
  const dispatch = useAppDispatch();
  const { loading, error, data } = useAppSelector(
    (state) => state.categoryWithProducts
  );

  useEffect(() => {
    dispatch(fetchCategorysWithProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500">
        <MiniError />
        <p className="mt-2 text-center max-w-md">
          Failed to load categories and products. Please try again later.
        </p>
      </div>
    );
  }
  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Navbar categories={data} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/products" element={<Product />} />
          <Route path="/shop" element={<Product />} />
          <Route path="/ocr" element={<OCR />} />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route
            path="/product-details/:categoryId/:name/:productId"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={
              <RoleProtectedRoute rolesAllowed={["ROLE_USER", "ROLE_SELLER"]}>
                <Cart />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <RoleProtectedRoute rolesAllowed={["ROLE_USER"]}>
                <Checkout />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/account/*"
            element={
              <RoleProtectedRoute rolesAllowed={["ROLE_USER"]}>
                <Account />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/offerCustomize"
            element={
              <RoleProtectedRoute rolesAllowed={["ROLE_USER"]}>
                <OfferCustomize />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/smartApp"
            element={
              <RoleProtectedRoute rolesAllowed={["ROLE_USER"]}>
                <SmartApp />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/lastPage"
            element={
              <RoleProtectedRoute rolesAllowed={["ROLE_USER"]}>
                <LastPageCustomize />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/appointment"
            element={
              <RoleProtectedRoute rolesAllowed={["ROLE_USER"]}>
                <Appointment />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/become-seller"
            element={
              <RoleProtectedRoute rolesAllowed={["ROLE_USER"]}>
                <BecomeSeller />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/seller/*"
            element={
              <RoleProtectedRoute rolesAllowed={["ROLE_SELLER"]}>
                <SellerDashboard />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/admin/*"
            element={
              <RoleProtectedRoute rolesAllowed={["ROLE_ADMIN"]}>
                <AdminDashboard />
              </RoleProtectedRoute>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
