import { Favorite, RemoveRedEye } from "@mui/icons-material";

function ProductCard() {
  return (
    <div className="group relative w-[250px] border-gray-200 border rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl ">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
          src="/public/category photos/1-cameras.png"
          alt="Product"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col-reverse justify-center items-center gap-8">
          <button className="py-1 px-2 bg-white rounded-sm shadow-sm hover:bg-white/75 transition">
            <Favorite
              className="text-primary-color"
              sx={{ width: "25px", height: "25px" }}
            />
          </button>

          <button className="py-1 px-2 bg-primary-color rounded-sm shadow-md hover:bg-primary-color/75 transition">
            <RemoveRedEye
              className="text-white"
              sx={{ width: "25px", height: "25px" }}
            />
          </button>
        </div>
      </div>

      <div className="text-center border-t border-gray-500/5 p-4 group-hover:translate-y-1 transition duration-300">
        <h3 className="text-sm text-gray-700 font-medium">
          Smart Control Panel
        </h3>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-lg font-semibold text-black">$49.99</span>
          <span className="text-sm line-through text-gray-500">$69.99</span>
          <span className="text-sm font-medium text-primary-color">-28%</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
