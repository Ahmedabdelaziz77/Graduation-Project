import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

function DealCard({ product, loading }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(
      `/product-details/${product.category.id}/${product.name}/${product.id}`
    );
  };

  if (loading) {
    return (
      <div className="w-full px-3 mb-10 animate-pulse">
        <div className="w-[14rem] mx-auto bg-white shadow rounded-lg overflow-hidden">
          <div className="h-[10rem] bg-gray-300"></div>
          <div className="bg-secondary-color p-3 space-y-2">
            <div className="h-3 bg-gray-300 rounded w-2/3 mx-auto"></div>
            <div className="h-4 bg-gray-400 rounded w-3/4 mx-auto"></div>
            <div className="flex justify-center space-x-2">
              <div className="h-3 bg-gray-300 rounded w-1/4"></div>
              <div className="h-3 bg-gray-400 rounded w-1/4"></div>
            </div>
            <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="h-10 bg-gray-400 rounded mt-2 mx-3"></div>
        </div>
      </div>
    );
  }

  const hasDiscount = product.discountPrice > 0;
  const discountedPrice = (
    product.price -
    (product.price * (product.discountPrice || 0)) / 100
  ).toFixed(2);

  return (
    <div className="w-full px-3 group">
      <div className="w-[14rem] mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative group-hover:shadow-teal-400/50 group-hover:-translate-y-2 transition-all duration-300">
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 z-10 bg-primary-color text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
            {product.discountPrice}% OFF
          </div>
        )}

        {/* HOT Badge */}
        {hasDiscount && (
          <div className="absolute top-2 right-2 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-[10px] font-bold shadow animate-bounce">
            HOT 🔥
          </div>
        )}

        {/* Product Image */}
        <div className="relative h-[250px] overflow-hidden group">
          <img
            className="w-full h-full object-contain rounded-t-lg transition-transform duration-500 group-hover:scale-110"
            src={product.image || "/category photos/5-smart speakers.webp"}
            alt={product.name || "Product"}
          />
          <div
            onClick={handleViewDetails}
            className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition duration-300 cursor-pointer"
          >
            <VisibilityIcon fontSize="large" />
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-secondary-color text-center text-gray-800 px-4 py-3 h-[150px]">
          <p className="text-sm font-medium text-gray-500 font-lora">
            {product.category?.name}
          </p>
          <p className="text-sm font-semibold mt-1 line-clamp-2">
            {product.name}
          </p>
          <div className="flex justify-center items-center space-x-2 mt-2">
            {hasDiscount && (
              <p className="text-sm text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </p>
            )}
            <p className="text-lg font-bold text-primary-color animate-pulse">
              ${hasDiscount ? discountedPrice : product.price.toFixed(2)}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-1">Excluding VAT</p>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
        <button className="w-full bg-primary-color text-white py-2 rounded-md font-semibold shadow hover:bg-[#00765d] hover:shadow-lg transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default DealCard;
