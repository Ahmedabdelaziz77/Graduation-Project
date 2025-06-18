import { TextField } from "@mui/material";

function FormStep3({ formik }) {
  return (
    <div className="space-y-5">
      <TextField
        fullWidth
        name="bankDetails.accountNumber"
        label="AccountNumber"
        value={formik.values.bankDetails?.accountNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.bankDetails?.accountNumber &&
          Boolean(formik.errors.bankDetails?.accountNumber)
        }
        helperText={
          formik.touched.bankDetails?.accountNumber &&
          formik.errors.bankDetails?.accountNumber
        }
        type="number"
      />
      <TextField
        fullWidth
        name="bankDetails.SWIFTCode"
        label="SWIFT Code"
        value={formik.values.bankDetails?.SWIFTCode}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.bankDetails?.SWIFTCode &&
          Boolean(formik.errors.bankDetails?.SWIFTCode)
        }
        helperText={
          formik.touched.bankDetails?.SWIFTCode &&
          formik.errors.bankDetails?.SWIFTCode
        }
      />
      <TextField
        fullWidth
        name="bankDetails.accountHolderName"
        label="Account Holder Name"
        value={formik.values.bankDetails?.accountHolderName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.bankDetails?.accountHolderName &&
          Boolean(formik.errors.bankDetails?.accountHolderName)
        }
        helperText={
          formik.touched.bankDetails?.accountHolderName &&
          formik.errors.bankDetails?.accountHolderName
        }
      />
    </div>
  );
}

export default FormStep3;
