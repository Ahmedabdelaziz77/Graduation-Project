import { ElectricBolt } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { teal } from "@mui/material/colors";

function OrderItem() {
  return (
    <div className="text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer">
      <div className="flex items-center gap-5">
        <div>
          <Avatar sizes="small" sx={{ bgcolor: teal[500] }}>
            <ElectricBolt />
          </Avatar>
        </div>
        <div>
          <h1 className="font-bold text-primary-color">PENDING</h1>
          <p>Arriving by Wed, 17 OCT</p>
        </div>
      </div>
      <div className="p-5 bg-teal-50 flex gap-3">
        <div>
          <img
            className="w-[70px] object-cover"
            src="/public/category photos/1-cameras.png"
            alt=""
          />
        </div>
        <div className="w-full space-y-2">
          <h1 className="font-bold">camera zz</h1>
          <p> h | a | r | d | w | a | r | e | specification</p>
          <p>
            <strong>main information : xx </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
