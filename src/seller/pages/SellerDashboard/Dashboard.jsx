import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchSellerStats,
  fetchTopSoldCategories,
} from "../../../State/seller/statsSlice";
import { fetchSellerOrderItems } from "../../../State/customer/orderItemsSlice";
import {
  fetchMonthlyRevenue,
  fetchLastPayments,
} from "../../../State/customer/paymentSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, topCategories } = useSelector((state) => state.sellerStats);
  const { items: allOrderItems } = useSelector((state) => state.orderItems);
  const { monthlyRevenue, lastPayments } = useSelector(
    (state) => state.payment
  );

  useEffect(() => {
    dispatch(fetchSellerStats());
    dispatch(fetchTopSoldCategories());
    dispatch(fetchSellerOrderItems());
    dispatch(fetchMonthlyRevenue());
    dispatch(fetchLastPayments());
  }, [dispatch]);

  const recentOrders = [...allOrderItems]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const monthlyLabels = months;
  const monthlyValues = months.map((month) => monthlyRevenue[month] ?? 0);

  const latestPayment = lastPayments?.length
    ? [...lastPayments].sort(
        (a, b) => new Date(b.paymentDate) - new Date(a.paymentDate)
      )[0]
    : null;

  const kpis = [
    {
      title: "Total Earnings",
      value: `E£${stats?.totalEarnings ?? 0}`,
    },
    {
      title: "Orders",
      value: stats?.totalOrders ?? 0,
    },
    {
      title: "Devices Sold",
      value: stats?.totalItemsSold ?? 0,
    },
    {
      title: "Last Payment",
      value: latestPayment
        ? `E£${latestPayment.paymentAmount.toLocaleString()} on ${new Date(
            latestPayment.paymentDate
          ).toLocaleDateString()}`
        : "No payments yet",
    },
  ];

  const doughnutData = {
    labels: topCategories?.map((cat) => cat.categoryName) ?? [],
    datasets: [
      {
        data: topCategories?.map((cat) => cat.totalItemsSold) ?? [],
        backgroundColor: [
          "#5eead4",
          "#14b8a6",
          "#0f766e",
          "#134e4a",
          "#22d3ee",
        ],
      },
    ],
  };

  const barData = {
    labels: topCategories?.map((cat) => cat.categoryName) ?? [],
    datasets: [
      {
        label: "Units Sold",
        data: topCategories?.map((cat) => cat.totalItemsSold) ?? [],
        backgroundColor: "#5eead4",
      },
    ],
  };

  return (
    <Box sx={{ minHeight: "100vh", color: "#d1fae5", p: 3 }}>
      {/* KPI Cards */}
      <Grid container spacing={3} mb={4}>
        {kpis.map(({ title, value }) => (
          <Grid item xs={12} sm={6} md={3} key={title}>
            <Card sx={{ bgcolor: "#134e4a", color: "#d1fae5" }} elevation={3}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ color: "#81e6d9" }}>
                  {title}
                </Typography>
                <Typography variant="h6">{value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Monthly Revenue Line Chart */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12}>
          <Card sx={{ bgcolor: "#134e4a", color: "#d1fae5" }} elevation={3}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Monthly Revenue
              </Typography>
              <Line
                data={{
                  labels: monthlyLabels,
                  datasets: [
                    {
                      label: "Revenue",
                      data: monthlyValues,
                      borderColor: "#5eead4",
                      backgroundColor: "transparent",
                      tension: 0.4,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { labels: { color: "#d1fae5" } } },
                  scales: {
                    x: { ticks: { color: "#d1fae5" } },
                    y: { ticks: { color: "#d1fae5" } },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Orders Table + Doughnut Chart */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Card sx={{ bgcolor: "#134e4a", color: "#d1fae5" }} elevation={3}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Recent Orders
              </Typography>
              <Paper sx={{ bgcolor: "#0f766e", overflow: "auto" }}>
                <Table stickyHeader>
                  <TableHead sx={{ bgcolor: "#0d5543" }}>
                    <TableRow>
                      <TableCell sx={{ color: "#d1fae5" }}>Order ID</TableCell>
                      <TableCell sx={{ color: "#d1fae5" }}>Customer</TableCell>
                      <TableCell sx={{ color: "#d1fae5" }}>Date</TableCell>
                      <TableCell sx={{ color: "#d1fae5" }}>Product</TableCell>
                      <TableCell sx={{ color: "#d1fae5" }} align="right">
                        Amount
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell sx={{ color: "#81e6d9" }}>
                          #{order.orderId}
                        </TableCell>
                        <TableCell sx={{ color: "#81e6d9" }}>
                          {order.userName}
                        </TableCell>
                        <TableCell sx={{ color: "#81e6d9" }}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell sx={{ color: "#81e6d9" }}>
                          {order.product?.name}
                        </TableCell>
                        <TableCell sx={{ color: "#81e6d9" }} align="right">
                          <Box
                            sx={{
                              backgroundColor: "#5eead4",
                              color: "#0f766e",
                              px: 2,
                              borderRadius: 1,
                              fontWeight: 600,
                            }}
                          >
                            E£{order.product?.sellingPrice ?? order.subtotal}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{ bgcolor: "#134e4a", color: "#d1fae5", textAlign: "center" }}
            elevation={3}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Product Category Share
              </Typography>
              <Doughnut data={doughnutData} />
              <Typography variant="body2" sx={{ color: "#81e6d9", mt: 2 }}>
                Based on total units sold
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bar Chart */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ bgcolor: "#134e4a", color: "#d1fae5" }} elevation={3}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Product Sales Volume
              </Typography>
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { labels: { color: "#d1fae5" } },
                  },
                  scales: {
                    x: { ticks: { color: "#d1fae5" } },
                    y: { ticks: { color: "#d1fae5" } },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
