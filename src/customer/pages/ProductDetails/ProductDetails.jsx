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
import {
  addToFavourites,
  removeFromFavourites,
  fetchFavourites,
} from "../../../State/customer/favouriteSlice";
import { toast } from "react-toastify";
import { fetchProductFeedbacks } from "../../../State/customer/feedbackSlice";

function ProductDetails() {
  const { productId, categoryId, name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const {
    selectedProduct: product,
    loading,
    error,
  } = useSelector((state) => state.products);

  const { list: favourites } = useSelector((state) => state.favourite);
  const { loading: cartLoading } = useSelector((state) => state.cart);
  const { productFeedbacks, loading: feedbackLoading } = useSelector(
    (state) => state.feedback
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
      dispatch(fetchFavourites());
      dispatch(fetchProductFeedbacks(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setIsInWishlist(favourites.some((fav) => fav.id === product.id));
    }
  }, [favourites, product]);

  const handleWishlistToggle = async () => {
    if (!product) return;
    try {
      setWishlistLoading(true);
      if (isInWishlist) {
        await dispatch(removeFromFavourites(product.id)).unwrap();
        toast.info("Removed from Wishlist 💔");
      } else {
        await dispatch(addToFavourites(product.id)).unwrap();
        toast.success("Added to Wishlist ❤️");
      }
      await dispatch(fetchFavourites()).unwrap();
    } catch (err) {
      toast.error("Failed to update Wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart({ productId, quantity })).unwrap();
      navigate("/cart");
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  if (loading || !product) return <Spinner />;
  if (error) return <MiniError message="Failed to load product" />;

  const {
    name: productName,
    image,
    price,
    discountPrice,
    description,
    category,
  } = product;

  const discountedPrice = Math.round(price - (discountPrice / 100) * price);
  const reviews = productFeedbacks;
  const firstFiveReviews = reviews.slice(0, 5);

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

          <div className="flex items-center gap-4 text-3xl font-lora">
            <span className="text-gray-800">
              E£{discountedPrice > 0 ? discountedPrice : price}
            </span>
            {discountedPrice > 0 && (
              <>
                <span className="line-through text-gray-400 text-xl">
                  E£{price}
                </span>
                <span className="text-primary-color text-base font-semibold">
                  -{discountPrice}%
                </span>
              </>
            )}
          </div>

          <p className="text-sm text-gray-500">
            Inclusive of all taxes. Free Shipping above E£500.
          </p>

          <div className="grid gap-3">
            {[
              [
                <Shield key="a" sx={{ color: teal[500] }} />,
                "Authentic & Quality Assured",
              ],
              [
                <WorkspacePremium key="b" sx={{ color: teal[500] }} />,
                "100% money back guaranteed",
              ],
              [
                <LocalShipping key="c" sx={{ color: teal[500] }} />,
                "Free Shipping & Returns",
              ],
              [
                <Wallet key="d" sx={{ color: teal[500] }} />,
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
              variant={isInWishlist ? "contained" : "outlined"}
              color={isInWishlist ? "error" : "primary"}
              startIcon={<FavoriteBorder />}
              sx={{ py: 1.5 }}
              onClick={handleWishlistToggle}
              disabled={wishlistLoading}
            >
              {wishlistLoading
                ? "Loading..."
                : isInWishlist
                ? "In Wishlist - Remove"
                : "Add to Wishlist"}
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
            {feedbackLoading ? (
              <p className="text-sm text-gray-500">Loading reviews...</p>
            ) : firstFiveReviews.length > 0 ? (
              firstFiveReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
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
          <AddReviewForm productId={product.id} />
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
