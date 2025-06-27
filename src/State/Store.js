import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "./authSlice";
import createSellerSlice from "./seller/createSellerSlice";
import sellerProductSlice from "./seller/sellerProductSlice";
import productSlice from "./customer/productSlice";
import categorySlice from "./customer/categorySlice";
import categoryWithProductsSlice from "./customer/categoryWithProductsSlice";
import cartSlice from "./customer/cartSlice";
import orderSlice from "./customer/orderSlice";
import profieSlice from "./profileSlice";
import couponSlice from "./couponSlice";
import ocrSlice from "./ocrSlice";
const rootReducer = combineReducers({
  auth: authSlice,
  createSeller: createSellerSlice,
  products: productSlice,
  sellerProducts: sellerProductSlice,
  categories: categorySlice,
  categoryWithProducts: categoryWithProductsSlice,
  cart: cartSlice,
  profile: profieSlice,
  coupon: couponSlice,
  ocr: ocrSlice,
  order: orderSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
export default store;
