import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
const steps = [
  { name: "Order Placed", description: "on FRI, 7 Jul", value: "PLACED" },
  {
    name: "Packed",
    description: "Item Packed in Dispatch Warehouse",
    value: "CONFIRMED",
  },
  { name: "Shipped", description: "by FRI, 7 Jul", value: "SHIPPED" },
  { name: "Arriving", description: "by FRI, 7 Jul", value: "Arriving" },
  { name: "Arrived", description: "by FRI, 7 Jul", value: "DELIVERED" },
];
const currentStep = 2;
const canceledStep = [
  {
    name: "Order Placed",
    description: "on FRI, 7 Jul",
    value: "PLACED",
  },
  {
    name: "Order Canceled",
    description: "on FRI, 7 Jul",
    value: "CANCELED",
  },
];
function OrderStepper({ orderStatus }) {
  const [statusStep, setStatusStep] = useState(steps);
  useEffect(() => {
    if (orderStatus === "CANCELED") {
      setStatusStep(canceledStep);
    } else {
      setStatusStep(steps);
    }
  }, [orderStatus]);
  return (
    <Box className="my-10">
      {statusStep.map((step, index) => {
        return (
          <>
            <div key={index} className="flex px-4">
              <div className="flex flex-col items-center">
                <Box
                  sx={{ zIndex: -1 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? "bg-gray-200 text-teal-500"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step.value === orderStatus ? (
                    <CheckCircleIcon />
                  ) : (
                    <FiberManualRecordIcon sx={{ zIndex: -1 }} />
                  )}
                </Box>
                {index < statusStep.length - 1 && (
                  <div
                    className={`border h-20 w-[2px] ${
                      index < currentStep
                        ? "bg-primary-color"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  ></div>
                )}
              </div>
              <div className="ml-2 w-full">
                <div
                  className={`${
                    step.value === orderStatus
                      ? "bg-primary-color p-2 text-white font-medium rounded-md -translate-y-3"
                      : ""
                  } ${
                    orderStatus === "CANCELED" && step.value === orderStatus
                      ? "bg-red-500"
                      : ""
                  } w-full`}
                >
                  <p>{step.name}</p>
                  <p
                    className={`${
                      step.value === orderStatus
                        ? "text-gray-200"
                        : "text-gray-500"
                    } text-xs`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </Box>
  );
}

export default OrderStepper;
