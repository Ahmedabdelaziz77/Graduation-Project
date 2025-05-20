import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";

const seller = {
  name: "John Doe",
  mail: "john@example.com",
  mobile: "+1234567890",
  bank_account_number: "123456789",
  bank_account_holder_name: "John Doe",
  TIN: "TIN1234567",
  swift_code: "SWFTCODE",
  logo: "", // can be a valid URL to show image instead of initial
  banner: "https://via.placeholder.com/600x200",
  created_at: "2024-05-15T10:00:00Z",
};

function Profile() {
  return (
    <Box display="flex" justifyContent="center" p={3} width="100%">
      <Card
        sx={{
          width: "100%",
          maxWidth: 720,
          borderRadius: 3,
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        <CardContent
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Avatar */}
          <Avatar
            src={seller.logo}
            alt={seller.name}
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#14b8a6",
              fontSize: 28,
            }}
          >
            {seller.logo ? null : seller.name.charAt(0)}
          </Avatar>

          {/* Name */}
          <Typography variant="h6" mt={2} color="primary">
            {seller.name}
          </Typography>

          {/* Personal Info */}
          <Box mt={2} width="100%">
            <Typography variant="body2" color="text.secondary" mb={1}>
              <strong>Email:</strong> {seller.mail}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <strong>Mobile:</strong> {seller.mobile}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <strong>Bank Account:</strong> {seller.bank_account_number}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <strong>Account Holder:</strong> {seller.bank_account_holder_name}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <strong>TIN:</strong> {seller.TIN}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <strong>SWIFT Code:</strong> {seller.swift_code}
            </Typography>
            <Typography variant="body2" mt={1} fontWeight={500} color="teal">
              Registered on: {new Date(seller.created_at).toLocaleDateString()}
            </Typography>
          </Box>

          {/* Banner */}
          {seller.banner && (
            <>
              <Divider sx={{ my: 3, width: "100%" }} />
              <Box
                component="img"
                src={seller.banner}
                alt="Seller banner"
                sx={{
                  width: "100%",
                  maxHeight: 200,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Profile;
