import { Favorite, RemoveRedEye } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { name, image, price, sellingPrice, discountPrice, category, id } =
    product;

  const hasDiscount = discountPrice > 0;
  const showDiscountBadge = hasDiscount && price > sellingPrice;
  const finalPrice = hasDiscount ? sellingPrice : price;
  const percentageOff = Math.round(((price - sellingPrice) / price) * 100);

  const handleViewDetails = () => {
    navigate(`/product-details/${category.id}/${name}/${id}`);
  };

  return (
    <div className="group relative w-[250px] border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      {/* Product Image with Overlay */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
          src={image}
          alt={name}
        />

        {/* Hover Action Icons */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col-reverse justify-center items-center gap-4">
          <button
            onClick={() => alert("Add to favorites")}
            className="py-1 px-2 bg-white rounded shadow hover:bg-gray-100 transition"
          >
            <Favorite
              className="text-primary-color"
              sx={{ width: 25, height: 25 }}
            />
          </button>
          <button
            onClick={handleViewDetails}
            className="py-1 px-2 bg-primary-color rounded shadow hover:bg-opacity-80 transition"
          >
            <RemoveRedEye
              className="text-white"
              sx={{ width: 25, height: 25 }}
            />
          </button>
        </div>

        {/* Discount Badge */}
        {showDiscountBadge && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md animate-bounce">
            {percentageOff}% OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="text-center border-t border-gray-200 p-4 group-hover:translate-y-1 transition-transform duration-300">
        <h3 className="text-sm text-gray-700 font-medium line-clamp-2">
          {name}
        </h3>

        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-lg font-bold text-black">
            ${finalPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-sm line-through text-gray-500">
                ${price.toFixed(2)}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
