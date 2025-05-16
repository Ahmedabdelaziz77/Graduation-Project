import { Card, CardContent } from "@mui/material";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";

const seller = {
  name: "John Doe",
  mail: "john@example.com",
  mobile: "+1234567890",
  bank_account_number: "123456789",
  bank_account_holder_name: "John Doe",
  TIN: "TIN1234567",
  swift_code: "SWFTCODE",
  logo: "",
  banner: "https://via.placeholder.com/600x200",
  created_at: "2024-05-15T10:00:00Z",
};

function Profile() {
  return (
    <div className="flex justify-center items-start w-full p-4">
      <Card className="bg-white text-teal-800 shadow rounded-xl w-full max-w-3xl">
        <CardContent className="flex flex-col items-center py-8 px-6">
          <Avatar sx={{ width: 64, height: 64, bgcolor: "#14b8a6" }}>
            {seller.name.charAt(0)}
          </Avatar>
          <Typography variant="h6" className="text-teal-900 mt-4">
            {seller.name}
          </Typography>
          <div className="text-center mt-2 space-y-1 text-sm">
            <p>Email: {seller.mail}</p>
            <p>Mobile: {seller.mobile}</p>
            <p>Bank Account: {seller.bank_account_number}</p>
            <p>Account Holder: {seller.bank_account_holder_name}</p>
            <p>TIN: {seller.TIN}</p>
            <p>SWIFT Code: {seller.swift_code}</p>
            <p className="text-teal-600">
              Registered on: {new Date(seller.created_at).toLocaleDateString()}
            </p>
          </div>
          {seller.banner && (
            <img
              src={seller.banner}
              alt="Banner"
              className="rounded-xl mt-6 w-full max-h-48 object-cover"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
