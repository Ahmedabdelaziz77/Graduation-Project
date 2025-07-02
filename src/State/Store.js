import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "./authSlice";
import createSellerSlice from "./seller/createSellerSlice";
import sellerProductSlice from "./seller/sellerProductSlice";
import statsSlice from "./seller/statsSlice";
import productSlice from "./customer/productSlice";
import categorySlice from "./customer/categorySlice";
import categoryWithProductsSlice from "./customer/categoryWithProductsSlice";
import cartSlice from "./customer/cartSlice";
import orderSlice from "./customer/orderSlice";
import profieSlice from "./profileSlice";
import couponSlice from "./couponSlice";
import ocrSlice from "./ocrSlice";
import searchSlice from "./searchSlice";
import addressSlice from "./customer/addressSlice";
import aiSlice from "./customer/aiSlice";
import offersSlice from "./customer/offersSlice";
import favouriteSlice from "./customer/favouriteSlice";
import feedbackSlice from "./customer/feedbackSlice";
import appointmentsSlice from "./customer/appointmentsSlice";
import orderItemsSlice from "./customer/orderItemsSlice";
import paymentSlice from "./customer/paymentSlice";
import sellerSlice from "./admin/sellerSlice";

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
  address: addressSlice,
  ai: aiSlice,
  offers: offersSlice,
  favourite: favouriteSlice,
  feedback: feedbackSlice,
  appointments: appointmentsSlice,
  orderItems: orderItemsSlice,
  sellerStats: statsSlice,
  sellers: sellerSlice,
  search: searchSlice,
  payment: paymentSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
export default store;
