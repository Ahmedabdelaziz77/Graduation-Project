import VisibilityIcon from "@mui/icons-material/Visibility";

function SimilarProductCard() {
  return (
    <div className="w-full px-3 group">
      <div className="w-[14rem] mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative group-hover:shadow-2xl group-hover:-translate-y-2 duration-300">
        <div className="absolute z-10 top-2 left-2 bg-primary-color text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
          20% OFF
        </div>

        <div className="relative">
          <img
            className="w-full h-[12rem] object-cover rounded-t-lg"
            src="/category photos/5-smart speakers.webp"
            alt="Smart Speaker"
          />

          <a
            href="/product-details"
            className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition duration-300"
          >
            <VisibilityIcon />
          </a>
        </div>

        <div className="bg-secondary-color text-gray-800 p-4 text-center">
          <p className="text-sm font-medium text-gray-500 font-lora">
            Smart Wireless Speaker
          </p>
          <p className="text-lg font-semibold mt-1 ">Blink Outdoor Camera</p>
          <div className="flex justify-center items-center space-x-2 mt-2">
            <p className="text-sm text-gray-400 line-through">$100</p>
            <p className="text-lg font-bold text-primary-color">$80</p>
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
