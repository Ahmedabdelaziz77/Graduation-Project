import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

function SimilarProductCard({ product }) {
  const { id, name, image, price, sellingPrice, discountPrice, category } =
    product;

  const discount = Math.round(discountPrice);
  const categoryId = category?.id || "unknown";
  const encodedName = encodeURIComponent(name);

  return (
    <div className="w-full px-3 group">
      <div className="w-[14rem] mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative group-hover:shadow-2xl group-hover:-translate-y-2 duration-300">
        {discount > 0 && (
          <div className="absolute z-10 top-2 left-2 bg-primary-color text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
            {discount}% OFF
          </div>
        )}

        <div className="relative">
          <img
            className="w-full h-[12rem] object-contain rounded-t-lg"
            src={image}
            alt={name}
          />

          <Link
            to={`/product-details/${categoryId}/${encodedName}/${id}`}
            className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition duration-300"
          >
            <VisibilityIcon />
          </Link>
        </div>

        <div className="bg-secondary-color text-gray-800 p-4 text-center">
          <p className="text-sm font-medium text-gray-500 font-lora">
            {category?.name}
          </p>
          <p className="text-lg font-semibold mt-1">{name}</p>
          <div className="flex justify-center items-center space-x-2 mt-2">
            <p className="text-sm text-gray-400 line-through">E£{price}</p>
            <p className="text-lg font-bold text-primary-color">
              E£{sellingPrice}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-1">Excluding VAT</p>
        </div>
      </div>

      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="w-full bg-primary-color text-white py-2 rounded-md font-semibold shadow-md transition duration-300 hover:bg-[#00765d] hover:shadow-lg">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default SimilarProductCard;
