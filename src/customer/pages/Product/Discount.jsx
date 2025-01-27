import { Radio, FormControlLabel, IconButton } from "@mui/material";
import { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

function Discount({ selectedDiscount, handleDiscountChange }) {
  const discounts = [
    { label: "10% or more", value: 10 },
    { label: "20% or more", value: 20 },
    { label: "50% or more", value: 50 },
  ];
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-medium text-primary-color mb-2">Discount</p>
        <p className="font-bold text-primary-color text-xl pb-1">
          {!isExpanded ? (
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
          !isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } px-2`}
      >
        <div className="space-y-2 flex flex-col">
          {discounts.map((discount) => (
            <FormControlLabel
              key={discount.value}
              control={
                <Radio
                  checked={selectedDiscount === discount.value}
                  onChange={(event) =>
                    handleDiscountChange(event, discount.value)
                  }
                  name="discount"
                />
              }
              label={discount.label}
              className="text-gray-600"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Discount;
