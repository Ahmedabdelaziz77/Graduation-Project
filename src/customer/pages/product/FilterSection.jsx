import { Button, Divider } from "@mui/material";
import Categories from "./Categories";
import Discount from "./Discount";
import PriceSlider from "./PriceSlider";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function FilterSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [selectedDiscount, setSelectedDiscount] = useState(
    Number(searchParams.get("discount")) || 0
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState(
    searchParams.get("price")?.split(",")?.map(Number) || [0, 30000]
  );
  const updateFilterParams = (e) => {
    const { value, name } = e.target;
    if (value) searchParams.set(name, value);
    else searchParams.delete(name);
    setSearchParams(searchParams);
  };
  const handleClearAll = () => {
    setSelectedCategory("All");
    setSelectedDiscount(0);
    setSelectedPriceRange([0, 30000]);
  };
  const clearAllFilter = () => {
    searchParams.forEach((val, key) => {
      searchParams.delete(key);
    });
    handleClearAll();
    setSearchParams(searchParams);
  };
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    updateFilterParams({ target: { value, name: "category" } });
  };

  const handleDiscountChange = (e, value) => {
    setSelectedDiscount(value);
    updateFilterParams({ target: { value, name: "discount" } });
  };

  const handlePriceRangeChange = (value) => {
    setSelectedPriceRange(value);
    updateFilterParams({ target: { value, name: "price" } });
  };

  return (
    <div className="-z-50 bg-white  font-lora">
      <div className="flex items-center justify-between h-[60px] px-9 lg:border-r">
        <p className="text-lg font-semibold">Filters</p>
        <Button
          onClick={clearAllFilter}
          size="small"
          className="text-primary-color/50 cursor-pointer font-semibold"
        >
          clear all
        </Button>
      </div>
      <Divider />
      <div className="px-9">
        <section className="space-y-5 pt-5 ">
          <Categories
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
          <Divider />
          <Discount
            selectedDiscount={selectedDiscount}
            handleDiscountChange={handleDiscountChange}
          />
          <Divider />
          <PriceSlider
            selectedPriceRange={selectedPriceRange}
            handlePriceRangeChange={handlePriceRangeChange}
          />
        </section>
      </div>
    </div>
  );
}

export default FilterSection;
