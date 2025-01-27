import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Divider, IconButton } from "@mui/material";

function CartItem() {
  const handleUpdateQuantity = () => {};
  return (
    <div className="border rounded-md relative">
      <div className="p-5 flex gap-3 items-center">
        <div className="">
          <img
            className="w-[90px] rounded-md"
            src="/public/category photos/5-smart speakers.webp"
            alt=""
          />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-lg">category_name</h1>
          <p className="text-gray-600 font-medium text-sm">product_name</p>
          <p className="text-gray-400 text-xs">
            <strong>Sold by: </strong>seller_name
          </p>
          <p className="text-sm">7 days replacement available</p>
          <p className="text-sm text-gray-500">
            <strong>quantity: </strong>5
          </p>
        </div>
      </div>
      <Divider />
      <div className="flex items-center justify-between font-lora">
        <div className="px-5 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2 w-[140px] justify-between">
            <Button onClick={() => handleUpdateQuantity}>
              <Remove />
            </Button>
            <span>{5}</span>
            <Button onClick={() => handleUpdateQuantity}>
              <Add />
            </Button>
          </div>
        </div>
        <div className="px-5 py-2">
          <p className="text-gray-700 font-medium ">E£547</p>
        </div>
      </div>
      <div className="absolute top-1 right-1">
        <IconButton color="primary">
          <Close />
        </IconButton>
      </div>
    </div>
  );
}

export default CartItem;
