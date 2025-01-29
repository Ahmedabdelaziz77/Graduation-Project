import { Divider } from "@mui/material";

function ProfileFieldCard({ label, value }) {
  return (
    <div className="p-5 flex items-center bg-slate-50">
      <p className="w-20 lg:w-36 pr-5 font-lora">{label}</p>
      <Divider flexItem orientation="vertical" />
      <p className="pl-4 lg:pl-10 font-semibold font-lora lg:text-lg">
        {value}
      </p>
    </div>
  );
}

export default ProfileFieldCard;
