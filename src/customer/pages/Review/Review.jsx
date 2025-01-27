import { Divider } from "@mui/material";
import ReviewCard from "./ReviewCard";

function Review() {
  return (
    <div className="p-5 lg:px-20 flex flex-col lg:flex-row gap-20">
      <section className="w-full md:w-1/2 lg:w-[30%] space-y-2">
        <img src="/public/category photos/1-cameras.png" alt="" />
        <div>
          <div>
            <p className="font-bold text-xl">category_name</p>
            <p className="text-lg text-gray-600">product_name</p>
          </div>
          <div className="">
            <div className="flex items-center gap-3 mt-5 text-2xl">
              <span className="font-lora text-gray-800">E£280</span>
              <span className="font-lora line-through text-gray-400">
                E£899
              </span>
              <span className="text-primary-color font-semibold">70% off</span>
            </div>
            <p className="text-sm font-lora ">
              Inclusive of all taxes. Free Shipping above E£500.
            </p>
          </div>
        </div>
      </section>
      <section className="space-y-5 w-full">
        {[1, 2, 3, 4, 5].map((item) => (
          <div className="space-y-3" key={item}>
            <ReviewCard />
            <Divider />
          </div>
        ))}
      </section>
    </div>
  );
}

export default Review;
