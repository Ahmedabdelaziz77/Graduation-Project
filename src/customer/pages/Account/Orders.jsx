import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../../State/customer/orderSlice";
import OrderItem from "./OrderItem";

function Orders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!orders.length) return <p>No orders found</p>;
  console.log(orders);
  return (
    <div className="text-sm min-h-screen">
      <div className="pb-5">
        <h1 className="font-semibold">All Orders</h1>
        <p>from anytime</p>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="space-y-2">
          {orders?.length > 0 ? (
            orders.map((order) => <OrderItem key={order.id} order={order} />)
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;
