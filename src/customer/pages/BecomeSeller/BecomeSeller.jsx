import SellerAccountFrom from "./SellerAccountFrom";
function BecomeSeller() {
  return (
    <div className="grid grid-cols-3 font-lora min-h-screen">
      <section className="lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md">
        <SellerAccountFrom />
      </section>
      <section className="hidden lg:flex lg:col-span-2 justify-center items-center relative">
        {/* <div className="lg:w-[75%] px-5 space-y-2"> */}
        {/* <div className="space-y-1 font-bold text-center">
            <p className="text-2xl">Join the Marketplace Revolution</p>
            <p className="text-lg text-primary-color">Boost your sales today</p>
          </div> */}
        <img
          src="/public/become a seller.webp"
          alt=""
          className="absolute w-full h-full"
        />
        {/* </div> */}
      </section>
    </div>
  );
}

export default BecomeSeller;
