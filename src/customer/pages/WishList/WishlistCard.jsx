import { Favorite } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { removeFromFavourites } from "../../../State/customer/favouriteSlice";
import TransparentSpinner from "../../../components/TransparentSpinner";

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const WishlistCard = ({ product, onRemove }) => {
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);

  if (!product || !product.id || !product.name || !product.category)
    return null;

  const handleRemove = async (e) => {
    e.preventDefault(); // Prevent navigation
    try {
      setIsRemoving(true);
      await dispatch(removeFromFavourites(product.id)).unwrap();
      toast.success("Removed from wishlist");
      onRemove?.(product.id); // Update local UI
    } catch (err) {
      toast.error("Failed to remove from wishlist");
    } finally {
      setIsRemoving(false);
    }
  };

  const productUrl = `/product-details/${product.category?.id || 0}/${slugify(
    product.name
  )}/${product.id}`;

  return (
    <Link
      to={productUrl}
      className="relative block bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden max-w-xs w-full transform hover:scale-[1.02]"
    >
      {isRemoving && <TransparentSpinner />}

      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-contain"
        />
        <IconButton
          onClick={handleRemove}
          className="!absolute top-2 right-2 bg-white/80 hover:bg-red-100 z-20"
        >
          <Favorite className="text-red-500" />
        </IconButton>
      </div>

      <div className="p-4 space-y-1">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {product.name}
        </h2>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description || "No description available."}
        </p>

        <div className="flex justify-between items-center pt-1">
          <span className="text-primary-color font-bold text-lg">
            EGP {product.sellingPrice?.toLocaleString?.() || "0"}
          </span>
          {product.discountPrice > 0 && (
            <span className="text-xs text-red-500 line-through">
              EGP {product.price?.toLocaleString?.() || "0"}
            </span>
          )}
        </div>

        <div className="text-xs text-gray-600 pt-1">
          <strong>Category:</strong> {product.category?.name || "Unknown"}
        </div>
        <div className="text-xs text-gray-500">
          <strong>Seller:</strong> {product.seller?.user?.firstname || "N/A"}
        </div>
      </div>
    </Link>
  );
};

export default WishlistCard;
