import { FormControlLabel, IconButton, Radio, RadioGroup } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
function Categories({ selectedCategory, handleCategoryChange }) {
  const categories = ["All", "Cameras", "sensors", "Network", "smart lighting"];
  const [isExpaned, setIsExpanded] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-medium text-primary-color mb-2">Categories</p>
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
        <RadioGroup
          defaultValue="All"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {categories.map((category, index) => (
            <FormControlLabel
              key={index}
              value={category}
              control={<Radio />}
              label={category}
              className="text-gray-600"
            />
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export default Categories;
