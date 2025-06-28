import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const steps = [
  {
    name: "Order Placed",
    description: "We’ve received your order",
    value: "PLACED",
  },
  { name: "Packed", description: "Item packed in warehouse", value: "PACKED" },
  { name: "Paid", description: "Payment confirmed", value: "PAID" },
  { name: "Shipped", description: "Order has been shipped", value: "SHIPPED" },
  {
    name: "Delivered",
    description: "Delivered to your address",
    value: "DELIVERED",
  },
];

const canceledStep = [
  {
    name: "Order Placed",
    description: "We’ve received your order",
    value: "PLACED",
  },
  {
    name: "Order Cancelled",
    description: "Your order was cancelled",
    value: "CANCELLED",
  },
];

function OrderStepper({ orderStatus }) {
  const [statusSteps, setStatusSteps] = useState(steps);
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    if (orderStatus === "CANCELLED") {
      setStatusSteps(canceledStep);
    } else {
      setStatusSteps(steps);
      const stepIndex = steps.findIndex((step) => step.value === orderStatus);
      setCurrentStep(stepIndex);
    }
  }, [orderStatus]);

  return (
    <Box className="my-10">
      {statusSteps.map((step, index) => (
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
            {index < statusSteps.length - 1 && (
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
                orderStatus === "CANCELLED" && step.value === orderStatus
                  ? "bg-red-500"
                  : ""
              } w-full`}
            >
              <p>{step.name}</p>
              <p
                className={`${
                  step.value === orderStatus ? "text-gray-200" : "text-gray-500"
                } text-xs`}
              >
                {step.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Box>
  );
}

export default OrderStepper;
