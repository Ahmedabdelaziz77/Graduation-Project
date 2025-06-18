import { Button, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormStep4 from "./FormStep4";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  createSeller,
  resetCreateSellerState,
} from "../../../State/seller/createSellerSlice";
import { logout, setRoles } from "../../../State/authSlice";
import { useNavigate } from "react-router-dom";

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];

const requiredFields = [
  "mobile",
  "TIN",
  "pickupAddress.name",
  "pickupAddress.mobile",
  "pickupAddress.pinCode",
  "pickupAddress.address",
  "pickupAddress.city",
  "pickupAddress.state",
  "pickupAddress.locality",
  "bankDetails.accountNumber",
  "bankDetails.SWIFTCode",
  "bankDetails.accountHolderName",
  "businessDetails.businessName",
  "sellerName",
  "email",
];

// Simple deep value getter (no need for lodash)
const getFieldValue = (values, path) =>
  path.split(".").reduce((obj, key) => (obj ? obj[key] : undefined), values);

function SellerAccountForm() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.createSeller);

  const formik = useFormik({
    initialValues: {
      mobile: "",
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
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      const finalValues = {
        name: values.sellerName,
        mobile: values.mobile,
        mail: values.email,
        bankAccountNumber: values.bankDetails.accountNumber,
        bankAccountHolderName: values.bankDetails.accountHolderName,
        swiftCode: values.bankDetails.SWIFTCode,
        logo: values.businessDetails.logo,
        banner: values.businessDetails.banner,
        addresses: [
          {
            name: values.pickupAddress.name,
            mobile: values.pickupAddress.mobile,
            zip: values.pickupAddress.pinCode,
            address: values.pickupAddress.address,
            city: values.pickupAddress.city,
            state: values.pickupAddress.state,
            locality: values.pickupAddress.locality,
          },
        ],
        tin: values.TIN,
      };
      dispatch(createSeller(finalValues)).then((result) => {
        if (createSeller.fulfilled.match(result)) {
          dispatch(resetCreateSellerState());
          dispatch(logout());
          navigate("/login");
        }
      });
    },
  });
  const navigate = useNavigate();
  if (loading) return <p>Submitting...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  const handleStep = async (val) => {
    if (val === 1 && activeStep === steps.length - 1) {
      // Final step: manually check for empty required fields
      const missingFields = requiredFields.filter((field) => {
        const value = getFieldValue(formik.values, field);
        return !value || value.toString().trim() === "";
      });

      // if (missingFields.length > 0) {
      //   console.log("⛔ Missing fields:", missingFields);
      //   return; // Don't submit
      // }

      formik.handleSubmit();
    } else if (val === 1) {
      setActiveStep((prev) => prev + 1);
    } else if (val === -1 && activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

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
        <div>
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

export default SellerAccountForm;
