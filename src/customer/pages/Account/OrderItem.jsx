import { ElectricBolt } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

function OrderItem({ order }) {
  const { status, orderItems, orderDate } = order;
  const navigate = useNavigate();
  return (
    <div className="text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer">
      <div className="flex items-center gap-5">
        <Avatar sizes="small" sx={{ bgcolor: teal[500] }}>
          <ElectricBolt />
        </Avatar>
        <div>
          <h1 className="font-bold text-primary-color">{status}</h1>
          <p>Placed on {new Date(orderDate).toDateString()}</p>
        </div>
      </div>

      {orderItems.map((item) => (
        <div
          key={item.id}
          className="p-5 bg-teal-50 flex gap-3"
          onClick={() => {
            navigate(`/account/order/${item.orderId}/${item.id}`);
          }}
        >
          <img
            className="w-[70px] object-cover"
            src={item.product.image}
            alt={item.productName}
          />
          <div className="w-full space-y-2">
            <h1 className="font-bold">{item.productName}</h1>
            <p>Quantity: {item.quantity}</p>
            <p>
              <strong>Price:</strong> {item.unitPrice} EGP
            </p>
            <p>
              <strong>Total:</strong> {item.subtotal} EGP
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderItem;
