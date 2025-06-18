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
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import MiniError from "../../../components/MiniError";
import { fetchProductById } from "../../../State/customer/productSlice";
import SimilarProduct from "./SimilarProduct/SimilarProduct";
import ReviewCard from "../Review/ReviewCard";
import AddReviewForm from "./AddReviewForm";
import { addToCart } from "../../../State/customer/cartSlice";

function ProductDetails() {
  const { productId, categoryId, name } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const {
    selectedProduct: product,
    loading,
    error,
  } = useSelector((state) => state.products);
  const { loading: cartLoading } = useSelector((state) => state.cart);
  useEffect(() => {
    if (productId) dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (loading) return <Spinner />;
  if (error || !product) return <MiniError message="Failed to load product" />;

  const {
    name: productName,
    image,
    price,
    description,
    category,
    reviews = [
      {
        userName: "Ahmed Mostafa",
        rating: 4.5,
        comment: "Value for money! Highly recommended.",
        createdAt: "2024-10-27T23:16:07.478333",
        image:
          "https://images.unsplash.com/photo-1606813902804-fd2ef464c229?auto=format&fit=crop&w=400&q=80",
      },
      {
        userName: "Mona Ali",
        rating: 4,
        comment: "Loved the packaging and delivery speed!",
        createdAt: "2024-09-10T14:30:00.000Z",
        image: "",
      },
      {
        userName: "Youssef",
        rating: 5,
        comment: "Best purchase this month. 🔥",
        createdAt: "2024-08-05T08:45:00.000Z",
        image:
          "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400&q=80",
      },
      {
        userName: "Nour El Din",
        rating: 3.5,
        comment: "Good but could be cheaper.",
        createdAt: "2024-07-15T11:15:00.000Z",
        image: null,
      },
      {
        userName: "Fatma",
        rating: 5,
        comment: "Perfect for my needs, thank you!",
        createdAt: "2024-06-22T19:22:00.000Z",
        image: "",
      },
      {
        userName: "Ahmed Mostafa",
        rating: 4.5,
        comment: "Value for money! Highly recommended.",
        createdAt: "2024-10-27T23:16:07.478333",
        image:
          "https://images.unsplash.com/photo-1606813902804-fd2ef464c229?auto=format&fit=crop&w=400&q=80",
      },
    ],
  } = product;

  const DiscountedPrice = Math.round(
    price - (product.discountPrice / 100) * price
  );
  const firstFiveReviews = reviews.slice(0, 5);
  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart({ productId, quantity })).unwrap();
      navigate("/cart");
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };
  return (
    <div className="px-5 lg:px-28 pt-10 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[85%]">
            <img
              className="w-full rounded-xl object-contain h-[400px] shadow-lg transition-transform duration-300 hover:scale-105"
              src={image}
              alt={productName}
            />
          </div>
        </section>

        {/* Details */}
        <section className="space-y-5">
          <div>
            <h1 className="font-bold text-xl text-primary-color uppercase tracking-wide">
              {category?.name || `Category ${categoryId}`}
            </h1>
            <p className="text-gray-600 font-semibold text-2xl">
              {decodeURIComponent(name)}
            </p>
          </div>

          <div className="flex items-center gap-4 py-2 border w-max px-4 rounded-md shadow-sm bg-gray-50">
            <div className="flex gap-1 items-center text-sm text-gray-700">
              <span>4</span>
              <StarIcon sx={{ color: teal[500], fontSize: "18px" }} />
            </div>
            <Divider orientation="vertical" flexItem />
            <span className="text-sm text-gray-600">234 ratings</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 text-3xl font-lora">
            <span className="text-gray-800">
              E£{DiscountedPrice > 0 ? DiscountedPrice : price}
            </span>
            {DiscountedPrice > 0 && (
              <>
                <span className="line-through text-gray-400 text-xl">
                  E£{price}
                </span>
                <span className="text-primary-color text-base font-semibold">
                  -{product.discountPrice}%
                </span>
              </>
            )}
          </div>
          <p className="text-sm text-gray-500">
            Inclusive of all taxes. Free Shipping above E£500.
          </p>

          {/* Features */}
          <div className="grid gap-3">
            {[
              [
                <Shield key={1} sx={{ color: teal[500] }} />,
                "Authentic & Quality Assured",
              ],
              [
                <WorkspacePremium key={2} sx={{ color: teal[500] }} />,
                "100% money back guaranteed",
              ],
              [
                <LocalShipping key={3} sx={{ color: teal[500] }} />,
                "Free Shipping & Returns",
              ],
              [
                <Wallet key={4} sx={{ color: teal[500] }} />,
                "Pay on delivery might be available",
              ],
            ].map(([icon, text], idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-sm text-gray-700"
              >
                {icon}
                <p>{text}</p>
              </div>
            ))}
          </div>

          {/* Quantity */}
          <div>
            <h2 className="uppercase text-sm mb-1">Quantity</h2>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-1 w-fit">
              <Button
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity === 1}
              >
                <Remove fontSize="small" />
              </Button>
              <span>{quantity}</span>
              <Button onClick={() => setQuantity(quantity + 1)}>
                <Add fontSize="small" />
              </Button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddShoppingCart />}
              sx={{ py: 1.5 }}
              onClick={handleAddToCart}
              disabled={cartLoading}
            >
              Add To Cart
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FavoriteBorder />}
              sx={{ py: 1.5 }}
            >
              Wishlist
            </Button>
          </div>

          {/* Description */}
          <div>
            <h2 className="font-semibold text-md mb-1">Description</h2>
            <p className="text-sm text-gray-700">{description}</p>
          </div>

          {/* Reviews */}
          <div className="mt-8 space-y-4">
            <h2 className="font-semibold text-lg">Customer Reviews</h2>
            {firstFiveReviews.length > 0 ? (
              firstFiveReviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))
            ) : (
              <p className="text-sm text-gray-500">No reviews yet.</p>
            )}

            {reviews.length > 5 && (
              <div className="text-right">
                <Link
                  to={`/reviews/${product.id}`}
                  className="text-primary-color text-sm font-semibold hover:underline"
                >
                  Show All Reviews →
                </Link>
              </div>
            )}
            <Divider />
          </div>

          {/* Add Review */}
          <AddReviewForm />
        </section>
      </div>

      {/* Similar Products */}
      <div className="mt-16">
        <SimilarProduct />
      </div>
    </div>
  );
}

export default ProductDetails;
