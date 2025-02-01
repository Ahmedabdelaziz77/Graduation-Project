import { useState } from "react";
import SellerAccountFrom from "./SellerAccountFrom";
import SellerLoginForm from "./SellerLoginForm";
import { Button } from "@mui/material";

function BecomeSeller() {
  const [isLogin, setIsLogin] = useState(false);
  const handleShowPage = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="grid md:gap-10 grid-cols-3 min-h-screen font-lora">
      <section className="lg:col-span-1 md:col-span-2 col-span-3  p-10 shadow-lg rounded-b-md">
        {!isLogin ? <SellerAccountFrom /> : <SellerLoginForm />}
        <div className="mt-10 space-y-2">
          <h1 className="text-center text-sm font-medium">
            Don&apos;t have account ?
          </h1>
          <Button
            onClick={handleShowPage}
            fullWidth
            sx={{ py: "11px" }}
            variant="outlined"
          >
            {isLogin ? "Register" : "Login"}
          </Button>
        </div>
      </section>
      <section className="hidden md:flex md:col-span-1 lg:col-span-2 justify-center items-center">
        <div className="lg:w-[75%] px-5 space-y-2">
          <div className="space-y-1 font-bold text-center">
            <p className="text-2xl">Join the Marketplace Revolution</p>
            <p className="text-lg text-primary-color">Boost your sales today</p>
          </div>
          <img src="/public/become a seller.webp" alt="" />
        </div>
      </section>
    </div>
  );
}

export default BecomeSeller;
