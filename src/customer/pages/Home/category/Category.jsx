import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import CategoryCard from "./CategoryCard";
import { fetchCategories } from "../../../../State/customer/categorySlice";
import SpinnerMini from "../../../../components/SpinnerMini";
import MiniError from "../../../../components/MiniError";

function Category() {
  const dispatch = useAppDispatch();
  const {
    list: categories,
    loading,
    error,
  } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-32">
        <SpinnerMini />
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-32 text-red-500">
        <MiniError />
        <p className="mt-2">Error while showing categories</p>
      </div>
    );

  return (
    <div className="py-6 px-4 lg:px-20 pl-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-20">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Category;
