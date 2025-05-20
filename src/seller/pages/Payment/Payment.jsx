import { Box, Card, Divider, Typography } from "@mui/material";
import Transaction from "./Transaction";

function Payment() {
  return (
    <Box className="space-y-6">
      {/* Earnings Summary */}
      <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="subtitle1" color="text.secondary" fontWeight={500}>
          Total Earnings
        </Typography>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          E£12,230
        </Typography>

        <Divider />

        <Typography variant="body2" color="text.secondary" sx={{ pt: 2 }}>
          Last Payment:&nbsp;
          <Typography
            component="span"
            variant="body2"
            fontWeight="600"
            color="text.primary"
          >
            E£0
          </Typography>
        </Typography>
      </Card>

      {/* Transaction Section */}
      <Box sx={{ pt: 8 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Recent Transactions
        </Typography>

        <Transaction />
      </Box>
    </Box>
  );
}

export default Payment;
