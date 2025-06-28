import { Radio } from "@mui/material";

function AddressCard({ address, fullName, mobile, checked, onSelect }) {
  const handleRadioChange = (e) => {
    onSelect && onSelect(e);
  };

  return (
    <div className="p-5 border rounded-md flex items-start gap-3">
      <Radio
        checked={checked}
        onChange={handleRadioChange}
        value={`${address.street}-${address.city}-${address.state}-${address.zipcode}`}
        name="radio-button"
      />
      <div className="space-y-2 pt-1 text-sm">
        <h1 className="font-semibold text-base">{fullName}</h1>
        <p className="text-gray-600">
          {address.address} - {address.city} - {address.state} -{" "}
          {address.locality}
          {address.zipcode}
        </p>
        <p className="text-gray-700">
          <strong>Mobile:</strong> {mobile}
        </p>
      </div>
    </div>
  );
}

export default AddressCard;
