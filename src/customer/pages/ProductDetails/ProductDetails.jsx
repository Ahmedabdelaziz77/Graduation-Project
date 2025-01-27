import {
  Add,
  AddShoppingCart,
  FavoriteBorder,
  LocalShipping,
  Remove,
  Shield,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import { Button, Divider } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useState } from "react";
import SimilarProduct from "./SimilarProduct/SimilarProduct";
import ReviewCard from "../Review/ReviewCard";
function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="px-5 lg:px-28 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[85%]">
            <img
              className="w-full rounded-md"
              src="/public/category photos/1-cameras.png"
              alt=""
            />
          </div>
        </section>
        <section className="">
          <h1 className="font-bold text-lg text-primary-color">
            sensors & smart locking
          </h1>
          <p className="text-gray-500 font-semibold">product_name</p>
          <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
            <div className="flex gap-1 items-center">
              <span>4</span>
              <StarIcon sx={{ color: teal[500], fontSize: "17px" }} />
            </div>
            <Divider orientation="vertical" flexItem />
            <span>234 ratings</span>
          </div>
          {/* prices */}
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
          {/* Features */}
          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-4">
              <Shield sx={{ color: teal[500] }} />
              <p>Authentic & Quality Assured</p>
            </div>
            <div className="flex items-center gap-4">
              <WorkspacePremium sx={{ color: teal[500] }} />
              <p>100% money back guranteed</p>
            </div>
            <div className="flex items-center gap-4">
              <LocalShipping sx={{ color: teal[500] }} />
              <p>Free Shipping & Returns</p>
            </div>
            <div className="flex items-center gap-4">
              <Wallet sx={{ color: teal[500] }} />
              <p>Pay on delivery might be available</p>
            </div>
          </div>
          {/* Quantity */}
          <div className="mt-7 space-y-2">
            <h1 className="uppercase"> Quantity</h1>
            <div className="flex items-center gap-2 w-[140px] justify-between">
              <Button
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity === 1}
              >
                <Remove />
              </Button>
              <span>{quantity}</span>
              <Button onClick={() => setQuantity(quantity + 1)}>
                <Add />
              </Button>
            </div>
          </div>
          {/* two buttons */}
          <div className="mt-12 flex items-center gap-5">
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddShoppingCart />}
              sx={{ py: "1rem" }}
            >
              Add To Cart
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FavoriteBorder />}
              sx={{ py: "1rem" }}
            >
              Wishlist
            </Button>
          </div>
          {/* description */}
          <div className="mt-5 text-sm text-gray-700">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className="mt-12 space-y-5">
            <ReviewCard />
            <Divider />
          </div>
        </section>
      </div>
      <SimilarProduct />
    </div>
  );
}

export default ProductDetails;
