import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../State/customer/categorySlice";
import { fetchFilteredProducts } from "../../../State/customer/productSlice";
import { useSearchParams } from "react-router-dom";
import FilterSection from "./filters/FilterSection";
import ProductCard from "./ProductCard";
import Spinner from "../../../components/Spinner";
import MiniError from "../../../components/MiniError";

function Product() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    list: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  const {
    list: products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.products);

  const sort = searchParams.get("sortBy") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const pageSize = 12;

  const categoryName = searchParams.get("category") || "all";
  const discountPrice = Number(searchParams.get("discount")) || 0;

  // Always fetch categories once if not loaded
  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  // Wait until categories are fetched to resolve categoryId
  const categoryId = useMemo(() => {
    if (!categories.length || categoryName === "all") return undefined;
    const found = categories.find((cat) => cat.name === categoryName);
    return found?.id;
  }, [categories, categoryName]);

  // Fetch products after categories are fetched and categoryId resolved
  useEffect(() => {
    // Don't fetch until we either have categoryId or it's 'all'
    if (categoryName !== "all" && !categoryId) return;

    const priceParam = searchParams.get("price");
    const [min, max] = priceParam
      ? priceParam.split(",").map(Number)
      : [0, 30000];

    dispatch(
      fetchFilteredProducts({
        ...(categoryId && { categoryId }),
        priceRangeMin: min,
        priceRangeMax: max,
        discountPrice,
        sortBy: sort,
      })
    );
  }, [dispatch, categoryId, discountPrice, sort, categoryName, searchParams]);

  const handleSortChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handlePageChange = (event, value) => {
    searchParams.set("page", value);
    setSearchParams(searchParams);
  };

  const categoriesNames = useMemo(
    () => ["all", ...categories.map((cat) => cat.name)],
    [categories]
  );

  const startIndex = (page - 1) * pageSize;
  const currentPageProducts = products.slice(startIndex, startIndex + pageSize);
  const pageCount = Math.ceil(products.length / pageSize);

  if (categoriesLoading) return <Spinner />;
  if (categoriesError)
    return <MiniError message="❌ Failed to load categories" />;

  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold text-gray-700 text-center uppercase pb-5 px-4">
        {categoryName === "all" ? "All Products" : categoryName}
      </h1>

      <div className="flex">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-[20%]">
          <FilterSection categories={categoriesNames} />
        </aside>

        {/* Main Products Section */}
        <main className="w-full lg:w-[80%] px-4 space-y-6">
          {/* Sorting Bar */}
          <div className="flex justify-end">
            <FormControl size="small" sx={{ width: 200 }}>
              <InputLabel>Sort</InputLabel>
              <Select value={sort} onChange={handleSortChange} label="Sort">
                <MenuItem value="min">Price: Low - High</MenuItem>
                <MenuItem value="max">Price: High - Low</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Divider />

          {/* Product Grid */}
          <div className="py-5">
            {productsLoading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : productsError ? (
              <MiniError message={productsError} />
            ) : currentPageProducts.length === 0 ? (
              <p className="text-center text-gray-500">No products found</p>
            ) : (
              <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
                {currentPageProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </section>
            )}
          </div>

          {/* Pagination */}
          {!productsLoading && pageCount > 1 && (
            <div className="flex justify-center py-10">
              <Pagination
                page={page}
                count={pageCount}
                onChange={handlePageChange}
                color="primary"
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Product;
