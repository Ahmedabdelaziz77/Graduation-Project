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
      <div className="w-[15rem] h-[30rem] flex flex-col justify-between bg-white shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition duration-300 ease-in-out transform group-hover:-translate-y-2 mx-auto relative">
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-primary-color text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm z-10">
            {discount}% OFF
          </div>
        )}

        {/* Image Section */}
        <div className="relative">
          <img
            className="w-full h-[13rem] object-contain rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
            src={image}
            alt={name}
          />

          {/* Overlay Link */}
          <Link
            to={`/product-details/${categoryId}/${encodedName}/${id}`}
            className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition duration-300"
          >
            <VisibilityIcon fontSize="large" />
          </Link>
        </div>

        {/* Info Section */}
        <div className="px-4 py-3 text-center flex flex-col justify-between h-[11rem]">
          <p className="text-xs uppercase text-primary-color tracking-wider font-semibold">
            {category?.name}
          </p>

          <p className="text-base font-bold mt-1 text-gray-800 line-clamp-2">
            {name}
          </p>

          <div className="flex justify-center items-center space-x-2 mt-2">
            <p className="text-sm text-gray-400 line-through">E£{price}</p>
            <p className="text-lg text-primary-color font-bold">
              E£{sellingPrice}
            </p>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">* Prices exclude VAT</p>
        </div>

        {/* Button Section */}
        <div className="p-3">
          <button className="w-full py-2 rounded-xl bg-primary-color text-white font-semibold hover:bg-[#00765d] shadow-sm hover:shadow-lg transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default SimilarProductCard;
