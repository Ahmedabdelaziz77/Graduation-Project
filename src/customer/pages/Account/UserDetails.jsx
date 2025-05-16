import { Divider } from "@mui/material";
import ProfileFieldCard from "../../../components/ProfileFieldCard";

function UserDetails() {
  return (
    <div className="flex justify-center by-10">
      <div className="w-full lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Personal Details</h1>
        </div>
        <div>
          <ProfileFieldCard label="Name" value="Ahmed" />
          <Divider />
          <ProfileFieldCard label="Mobile" value="01015491071" />
          <Divider />
          <ProfileFieldCard label="Email" value="xxzz@gmail.com" />
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
