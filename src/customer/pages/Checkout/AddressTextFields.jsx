import { Grid2, TextField } from "@mui/material";

function AddressTextFields({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
  xs,
}) {
  return (
    <Grid2 size={{ xs: xs }}>
      <TextField
        fullWidth={true}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
      />
    </Grid2>
  );
}

export default AddressTextFields;
