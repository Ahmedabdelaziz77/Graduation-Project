import { IconButton, Slider } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
function PriceSlider({ selectedPriceRange, handlePriceRangeChange }) {
  const [isExpaned, setIsExpanded] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-medium text-primary-color mb-2">Price Range</p>
        <p className="font-bold text-primary-color text-xl pb-1">
          {!isExpaned ? (
            <IconButton onClick={() => setIsExpanded(true)}>
              <RemoveIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => setIsExpanded(false)}>
              <AddIcon />
            </IconButton>
          )}
        </p>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          !isExpaned ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } px-2`}
      >
        <div className="px-2">
          <Slider
            value={selectedPriceRange}
            onChange={(e, value) => handlePriceRangeChange(value)}
            defaultValue={[0, 30000]}
            min={0}
            max={30000}
            step={10}
            valueLabelDisplay="auto"
            className="text-primary-color"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2 pb-2">
            <span className="text-gray-700">EGP 0.00</span>
            <span className="text-gray-700">EGP 30,000.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceSlider;
