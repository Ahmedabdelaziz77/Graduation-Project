import { Button, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import FormStep1 from "./FormStep1";
import { useFormik } from "formik";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormStep4 from "./FormStep4";

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];
function SellerAccountFrom() {
  const [activeStep, setActiveStep] = useState(0);
  const handleStep = (val) => {
    (activeStep < steps.length - 1 || (activeStep > 0 && val === -1)) &&
      setActiveStep(activeStep + val);
    activeStep == steps.length - 1 && handleCreateAccount();
  };
  const handleCreateAccount = () => {
    console.log("account created");
  };
  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      // It is issued by the Egyptian Tax Authority and is required for tax filing and compliance.
      // Format: Usually 9 to 15 digits, assigned to individuals and businesses for tax purposes.
      TIN: "",
      pickupAddress: {
        name: "",
        mobile: "",
        pinCode: "",
        address: "",
        city: "",
        state: "",
      },
      bankDetails: {
        accountNumber: "",
        // Egyptian banks use the SWIFT Code (Society for Worldwide Interbank Financial Telecommunication Code) for international and domestic bank transactions.
        SWIFTCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        businessAddress: "",
        logo: "",
        banner: "",
      },
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <section className="mt-20 space-y-10">
        <div className="">
          {activeStep === 0 && <FormStep1 formik={formik} />}
          {activeStep === 1 && <FormStep2 formik={formik} />}
          {activeStep === 2 && <FormStep3 formik={formik} />}
          {activeStep === 3 && <FormStep4 formik={formik} />}
        </div>
        <div className="flex items-center justify-between">
          <Button
            onClick={() => handleStep(-1)}
            variant="contained"
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button onClick={() => handleStep(1)} variant="contained">
            {activeStep === steps.length - 1 ? "Create Account" : "Continue"}
          </Button>
        </div>
      </section>
    </div>
  );
}

export default SellerAccountFrom;
