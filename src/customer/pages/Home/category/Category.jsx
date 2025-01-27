import CategoryCard from "./CategoryCard";

function Category() {
  return (
    <div className="flex flex-wrap justify-between py-5 lg:px-20 border-b">
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <CategoryCard key={item} />
      ))}
    </div>
  );
}

export default Category;
