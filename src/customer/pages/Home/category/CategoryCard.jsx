function CategoryCard({ category }) {
  const { id, name, image } = category;
  return (
    <div className="flex justify-center items-center flex-col">
      <img
        className="object-contain h-20"
        src={image || "/public/category photos/1-cameras.png"}
        alt=""
      />
      <h2 className="font-semibold text-sm">{name || "category_name"}</h2>
    </div>
  );
}

export default CategoryCard;
