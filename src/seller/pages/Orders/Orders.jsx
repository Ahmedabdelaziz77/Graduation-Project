import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderTable from "./OrderTable";
import { CircularProgress } from "@mui/material";
import { fetchSellerOrderItems } from "../../../State/customer/orderItemsSlice";

function Orders() {
  const dispatch = useDispatch();
  const { items: orderItems, loading } = useSelector(
    (state) => state.orderItems
  );

  useEffect(() => {
    dispatch(fetchSellerOrderItems());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="font-bold mb-5 text-2xl text-primary-color">All Orders</h1>

      {loading ? (
        <div className="flex justify-center mt-10">
          <CircularProgress />
        </div>
      ) : (
        <OrderTable orderItems={orderItems} />
      )}
    </div>
  );
}

export default Orders;
