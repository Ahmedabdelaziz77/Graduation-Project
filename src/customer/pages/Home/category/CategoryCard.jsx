import { useNavigate } from "react-router-dom";

function CategoryCard({ category }) {
  const { name, image } = category;
  const navigate = useNavigate();

  const handleClick = () => {
    const encodedName = encodeURIComponent(name);
    navigate(`/products?category=${encodedName}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-white/80 backdrop-blur-md border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 w-[120px] sm:w-[140px] flex flex-col items-center hover:bg-teal-50"
    >
      <img
        className="object-contain h-20 mb-3 transition-transform group-hover:scale-105"
        src={image || "/public/category photos/1-cameras.png"}
        alt={name}
      />
      <h2 className="text-sm font-semibold text-gray-700 text-center group-hover:text-primary-color">
        {name || "Category"}
      </h2>
    </div>
  );
}

export default CategoryCard;
