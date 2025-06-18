import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../State/customer/categorySlice";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import Spinner from "../../../components/Spinner";
import MiniError from "../../../components/MiniError";
import { useSearchParams } from "react-router-dom";
import { fetchFilteredProducts } from "../../../State/customer/productSlice";
function Product() {
  const dispatch = useDispatch();

  const {
    list: categoriesData,
    loading,
    error,
  } = useSelector((state) => state.categories);
  const {
    list: products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.products);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sortBy") || "";
  const page = parseInt(searchParams.get("page")) || 1;

  const handleSortChange = (event) => {
    searchParams.set("sortBy", event.target.value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handlePageChange = (event, value) => {
    searchParams.set("page", value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!categoriesData.length) return;

    const categoryName = searchParams.get("category") || "all";
    const selectedCategory = categoriesData.find(
      (cat) => cat.name === categoryName
    );
    const categoryId = selectedCategory?.id;

    const price = searchParams.get("price")?.split(",") || [0, 30000];
    const priceRangeMin = Number(price[0]);
    const priceRangeMax = Number(price[1]);

    const discountPrice = Number(searchParams.get("discount")) || 0;
    const sortBy = searchParams.get("sortBy") || "";

    const params = {
      ...(categoryId && categoryId !== "all" && { categoryId }),
      priceRangeMin,
      priceRangeMax,
      discountPrice,
      sortBy,
    };

    dispatch(fetchFilteredProducts(params));
  }, [dispatch, categoriesData, searchParams]);

  if (loading) return <Spinner />;
  if (error) return <MiniError message="Failed to load categories" />;

  const categories = categoriesData?.length
    ? ["all", ...categoriesData.map((item) => item.name)]
    : [];

  const categoryName = searchParams.get("category") || "all";
  const startIndex = (page - 1) * 12;
  const currentPageProducts = products.slice(startIndex, startIndex + 12);
  const pageCount = Math.ceil(products.length / 12);

  return (
    <div className="my-10">
      <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase">
        {categoryName === "all" ? "All Products" : categoryName}
      </h1>

      <div className="flex">
        <section className="hidden lg:block w-[20%]">
          <FilterSection categories={categories} />
        </section>

        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex justify-between items-center px-9  h-[40px] float-right">
            <FormControl size="small" sx={{ width: "200px" }}>
              <InputLabel>Sort</InputLabel>
              <Select value={sort} onChange={handleSortChange} label="Sort">
                <MenuItem value="min">Price: Low - High</MenuItem>
                <MenuItem value="max">Price: High - Low</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Divider />

          <div className="py-5">
            {productsLoading ? (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            ) : productsError ? (
              <MiniError message={productsError} />
            ) : (
              <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center">
                {currentPageProducts.length > 0 ? (
                  currentPageProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="text-center col-span-full">
                    No products found
                  </div>
                )}
              </section>
            )}
          </div>

          {!productsLoading && (
            <div className="flex justify-center py-10">
              <Pagination
                page={page}
                count={pageCount}
                onChange={handlePageChange}
                color="primary"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
