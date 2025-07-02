import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../State/profileSlice";

function Profile() {
  const dispatch = useDispatch();
  const {
    data: sellerProfile,
    loading,
    error,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="60vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!sellerProfile || !sellerProfile.seller) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography color="text.secondary">No profile data found.</Typography>
      </Box>
    );
  }

  const seller = sellerProfile.seller;
  const registeredOn = sellerProfile.createdAt
    ? new Date(sellerProfile.createdAt).toLocaleDateString()
    : "Unknown";

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
            {seller.logo ? null : seller.name?.charAt(0)}
          </Avatar>

          {/* Name */}
          <Typography variant="h6" mt={2} color="primary">
            {seller.name}
          </Typography>

          {/* Personal Info */}
          <Box mt={2} width="100%">
            <Typography variant="body2" color="text.secondary" mb={1}>
              <strong>Email:</strong> {seller.mail || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <strong>Mobile:</strong> {seller.mobile || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <strong>Bank Account:</strong> {seller.bankAccountNumber || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <strong>Account Holder:</strong>{" "}
              {seller.bankAccountHolderName || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <strong>TIN:</strong> {seller.tin || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <strong>SWIFT Code:</strong> {seller.swiftCode || "N/A"}
            </Typography>
            <Typography variant="body2" mt={1} fontWeight={500} color="teal">
              Registered on: {registeredOn}
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
