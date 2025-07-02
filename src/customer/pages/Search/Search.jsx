import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  CircularProgress,
  Typography,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearSearchResults, searchProducts } from "../../../State/searchSlice";

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

function Search() {
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector((state) => state.search);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length >= 2) {
      const delayDebounce = setTimeout(() => {
        dispatch(searchProducts(query));
      }, 500);
      return () => clearTimeout(delayDebounce);
    } else {
      dispatch(clearSearchResults());
    }
  }, [query, dispatch]);

  return (
    <Box sx={{ p: 4 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Search products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {results.map((product) => {
          const productUrl = `/product-details/${
            product.category?.id || 0
          }/${slugify(product.name)}/${product.id}`;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Link
                to={productUrl}
                className="relative block bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden w-full h-[420px] max-w-[280px] mx-auto transform hover:scale-[1.02]"
              >
                <div className="relative h-[180px] w-full bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="p-4 space-y-1 h-[240px] flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {product.description || "No description available."}
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-primary-color font-bold text-lg">
                        EGP {product.sellingPrice?.toLocaleString?.() || "0"}
                      </span>
                      {product.discountPrice > 0 && (
                        <span className="text-xs text-red-500 line-through">
                          EGP {product.price?.toLocaleString?.() || "0"}
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-gray-600 pt-1">
                      <strong>Category:</strong>{" "}
                      {product.category?.name || "Unknown"}
                    </div>
                    <div className="text-xs text-gray-500">
                      <strong>Seller:</strong>{" "}
                      {product.seller?.user?.firstname || "N/A"}
                    </div>
                  </div>
                </div>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Search;
