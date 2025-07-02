import {
  Box,
  Card,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLastPayments,
  fetchTotalRevenue,
} from "../../../State/customer/paymentSlice";
import Spinner from "../../../components/Spinner";

function Payment() {
  const dispatch = useDispatch();
  const { lastPayments, totalRevenue, loading } = useSelector(
    (state) => state.payment
  );

  useEffect(() => {
    dispatch(fetchLastPayments());
    dispatch(fetchTotalRevenue());
  }, [dispatch]);

  const sortedPayments = [...lastPayments].sort(
    (a, b) => new Date(b.paymentDate) - new Date(a.paymentDate)
  );

  const lastPayment = sortedPayments[0];
  if (loading) return <Spinner />;
  return (
    <Box className="space-y-6">
      {/* Total Earnings Card */}
      <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="subtitle1" color="text.secondary" fontWeight={500}>
          Total Earnings
        </Typography>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {`E£${(totalRevenue ?? 0).toLocaleString()}`}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary">
          Last Payment:&nbsp;
          <Typography
            component="span"
            variant="body2"
            fontWeight="600"
            color="text.primary"
          >
            {lastPayment
              ? `E£${lastPayment.paymentAmount.toLocaleString()} on ${new Date(
                  lastPayment.paymentDate
                ).toLocaleDateString()} to ${lastPayment.user.firstname} ${
                  lastPayment.user.lastname
                }`
              : "—"}
          </Typography>
        </Typography>
      </Card>

      {/* Recent Payments List */}
      <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Recent Payments
        </Typography>
        <List>
          {sortedPayments.map((payment, index) => (
            <ListItem key={index} disablePadding sx={{ py: 1 }}>
              <ListItemText
                primary={`E£${payment.paymentAmount.toLocaleString()}`}
                secondary={`Paid on ${new Date(
                  payment.paymentDate
                ).toLocaleString()} 
                to ${payment.user.firstname} ${payment.user.lastname} (${
                  payment.user.email
                })`}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>
          ))}
        </List>
      </Card>
    </Box>
  );
}

export default Payment;
