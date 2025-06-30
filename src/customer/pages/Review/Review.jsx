import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Divider } from "@mui/material";
import ReviewCard from "./ReviewCard";
import { fetchProductById } from "../../../State/customer/productSlice";
import { fetchProductFeedbacks } from "../../../State/customer/feedbackSlice";
import Spinner from "../../../components/Spinner";
import MiniError from "../../../components/MiniError";

function Review() {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const { selectedProduct, loading: productLoading } = useSelector(
    (state) => state.products
  );
  const { productFeedbacks, loading: feedbackLoading } = useSelector(
    (state) => state.feedback
  );

  useEffect(() => {
    dispatch(fetchProductById(productId));
    dispatch(fetchProductFeedbacks(productId));
  }, [dispatch, productId]);

  if (productLoading || feedbackLoading) return <Spinner />;
  if (!selectedProduct) return <MiniError message="Product not found" />;

  const { name, image, price, discountPrice, category } = selectedProduct;
  const finalPrice = Math.round(price - (discountPrice / 100) * price);

  return (
    <div className="p-5 lg:px-20 flex flex-col lg:flex-row gap-20">
      {/* Product Info Section */}
      <section className="w-full md:w-1/2 lg:w-[30%] space-y-2">
        <img src={image} alt={name} />
        <div>
          <p className="font-bold text-xl">{category?.name}</p>
          <p className="text-lg text-gray-600">{name}</p>
          <div className="flex items-center gap-3 mt-5 text-2xl">
            <span className="font-lora text-gray-800">E£{finalPrice}</span>
            <span className="font-lora line-through text-gray-400">
              E£{price}
            </span>
            <span className="text-primary-color font-semibold">
              -{discountPrice}% off
            </span>
          </div>
          <p className="text-sm font-lora">
            Inclusive of all taxes. Free Shipping above E£500.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="space-y-5 w-full">
        {productFeedbacks.length === 0 ? (
          <p className="text-sm text-gray-600">No reviews yet.</p>
        ) : (
          productFeedbacks.map((review) => (
            <div className="space-y-3" key={review.id}>
              <ReviewCard review={review} productId={productId} />
              <Divider />
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Review;
