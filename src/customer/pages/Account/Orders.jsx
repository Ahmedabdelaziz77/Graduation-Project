import OrderItem from "./OrderItem";

function Orders() {
  return (
    <div className="text-sm min-h-screen">
      <div className="pb-5">
        <h1 className="font-semibold">All Orders</h1>
        <p>from anytime</p>
      </div>
      <div className="space-y-2 ">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <OrderItem key={item} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
