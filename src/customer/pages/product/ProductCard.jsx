import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../../State/customer/favouriteSlice";
import { useState } from "react";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, image, price, sellingPrice, discountPrice, category, id } =
    product;

  const hasDiscount = discountPrice > 0 && price > sellingPrice;
  const finalPrice = hasDiscount ? sellingPrice : price;
  const percentageOff = hasDiscount
    ? Math.round(((price - sellingPrice) / price) * 100)
    : 0;

  const { list: favourites } = useSelector((state) => state.favourite);
  const initiallyInWishlist = favourites?.some((fav) => fav.id === id);

  const [isInWishlist, setIsInWishlist] = useState(initiallyInWishlist);
  const [loading, setLoading] = useState(false);

  const handleViewDetails = () => {
    navigate(`/product-details/${category?.id}/${name}/${id}`);
  };

  const handleAddToFavourite = async () => {
    try {
      setLoading(true);
      await dispatch(addToFavourites(id)).unwrap();
      toast.success("Added to Wishlist ❤️");
      setIsInWishlist(true); // Immediately hide the button
    } catch (err) {
      toast.error("Failed to add to wishlist");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromFavourite = async () => {
    try {
      setLoading(true);
      await dispatch(removeFromFavourites(id)).unwrap();
      toast.info("Removed from Wishlist 💔");
      setIsInWishlist(false); // Re-enable add button
    } catch (err) {
      toast.error("Failed to remove from wishlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative w-[250px] border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      {/* Product Image */}
      <div className="relative h-[300px] bg-white">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
        />

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-4 transition-opacity duration-300">
          {!isInWishlist ? (
            <Tooltip title="Add to Wishlist">
              <IconButton
                onClick={handleAddToFavourite}
                disabled={loading}
                className="bg-white hover:bg-gray-100 shadow"
              >
                <FavoriteBorder sx={{ color: "#008080", fontSize: 24 }} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Remove from Wishlist">
              <IconButton
                onClick={handleRemoveFromFavourite}
                disabled={loading}
                className="bg-white hover:bg-gray-100 shadow"
              >
                <Favorite sx={{ color: "red", fontSize: 24 }} />
              </IconButton>
            </Tooltip>
          )}

          <IconButton
            onClick={handleViewDetails}
            className="p-2 bg-primary-color rounded-full shadow hover:bg-opacity-80"
          >
            <RemoveRedEye className="text-white" sx={{ fontSize: 24 }} />
          </IconButton>
        </div>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse shadow">
            {percentageOff}% OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="text-center border-t px-4 py-3 bg-white">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {name}
        </h3>
        <div className="flex justify-center items-center gap-2 mt-2">
          <span className="text-lg font-bold text-primary-color">
            EGP {finalPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm line-through text-gray-400">
              EGP {price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
