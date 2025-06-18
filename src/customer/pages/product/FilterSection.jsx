import { Button, Divider } from "@mui/material";
import Categories from "./Categories";
import Discount from "./Discount";
import PriceSlider from "./PriceSlider";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function FilterSection({ categories }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [selectedDiscount, setSelectedDiscount] = useState(
    Number(searchParams.get("discount")) || 0
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState(
    searchParams.get("price")?.split(",")?.map(Number) || [0, 30000]
  );

  const updateFilterParams = (key, value) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }

    searchParams.set("page", 1);

    setSearchParams(searchParams);
  };

  const handleClearAll = () => {
    setSelectedCategory("all");
    setSelectedDiscount(0);
    setSelectedPriceRange([0, 30000]);
    searchParams.forEach((_, key) => searchParams.delete(key));
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-white font-lora">
      <div className="flex justify-between items-center h-[60px] px-9 border-r">
        <p className="text-lg font-semibold">Filters</p>
        <Button
          onClick={handleClearAll}
          size="small"
          className="text-primary-color/50 font-semibold"
        >
          Clear All
        </Button>
      </div>
      <Divider />
      <div className="px-9">
        <section className="space-y-5 pt-5">
          <Categories
            selectedCategory={selectedCategory}
            handleCategoryChange={(value) => {
              setSelectedCategory(value);
              updateFilterParams("category", value);
            }}
            categories={categories}
          />
          <Divider />
          <Discount
            selectedDiscount={selectedDiscount}
            handleDiscountChange={(e, value) => {
              setSelectedDiscount(value);
              updateFilterParams("discount", value);
            }}
          />
          <Divider />
          <PriceSlider
            selectedPriceRange={selectedPriceRange}
            handlePriceRangeChange={(value) => {
              setSelectedPriceRange(value);
              updateFilterParams("price", value.join(","));
            }}
          />
        </section>
      </div>
    </div>
  );
}

export default FilterSection;
