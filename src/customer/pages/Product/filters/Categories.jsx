import { FormControlLabel, IconButton, Radio, RadioGroup } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

function Categories({
  selectedCategory,
  handleCategoryChange,
  categories = [],
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-medium text-primary-color mb-2">Categories</p>
        <IconButton onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } px-2`}
      >
        <RadioGroup
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {categories.map((category, index) => (
            <FormControlLabel
              key={index}
              value={category}
              control={<Radio size="small" />}
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
