import { Radio } from "@mui/material";

function AddressCard() {
  const handleRadioChange = (e) => {
    console.log(e.target.checked);
  };
  return (
    <div className="p-5 border rounded-md flex">
      <div>
        <Radio
          checked={true}
          onChange={handleRadioChange}
          value=""
          name="radio-button"
        />
      </div>
      <div className="space-y-3 pt-3">
        <h1>user_name</h1>
        <p className="w-[320px]">egypt-menoufia-sadat city</p>
        <p>
          <strong>Mobile :</strong>01015491071
        </p>
      </div>
    </div>
  );
}

export default AddressCard;
