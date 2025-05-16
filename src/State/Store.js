import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { thunk } from "redux-thunk";
import sellerSlice from "./seller/sellerSlice";
const rootReducer = combineReducers({
  seller: sellerSlice,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(thunk),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
export default store;
