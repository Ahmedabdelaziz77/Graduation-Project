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
  const kpis = [
    { title: "Total Sales", value: "$125,400", change: "+12%" },
    { title: "Orders", value: "1,243", change: "+8%" },
    { title: "Devices Sold", value: "3,410", change: "+16%" },
    { title: "Store Visitors", value: "8,900", change: "+5%" },
  ];

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1450, 1300, 1600, 1850, 2000],
        borderColor: "#5eead4",
        backgroundColor: "transparent",
        tension: 0.4,
      },
    ],
  };

  // Category share
  const doughnutData = {
    labels: [
      "Smart Lights",
      "Smart Hubs",
      "Security Cameras",
      "Plugs",
      "Sensors",
    ],
    datasets: [
      {
        data: [35, 25, 20, 10, 10],
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

  // Product sales bar
  const barData = {
    labels: ["Lights", "Hubs", "Cameras", "Thermostats", "Plugs"],
    datasets: [
      {
        label: "Units Sold",
        data: [850, 650, 500, 300, 450],
        backgroundColor: "#5eead4",
      },
    ],
  };

  // Orders table
  const orders = [
    {
      id: "#ORD1001",
      customer: "Alice",
      date: "2025-05-18",
      product: "Smart Hub",
      amount: "$89.99",
    },
    {
      id: "#ORD1002",
      customer: "Bob",
      date: "2025-05-18",
      product: "Smart Light x2",
      amount: "$59.98",
    },
    {
      id: "#ORD1003",
      customer: "Carol",
      date: "2025-05-17",
      product: "Camera Kit",
      amount: "$129.00",
    },
    {
      id: "#ORD1004",
      customer: "David",
      date: "2025-05-17",
      product: "Smart Plug",
      amount: "$19.99",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", color: "#d1fae5", p: 3 }}>
      {/* KPI Cards */}
      <Grid container spacing={3} mb={4}>
        {kpis.map(({ title, value, change }) => (
          <Grid item xs={12} sm={6} md={3} key={title}>
            <Card sx={{ bgcolor: "#134e4a", color: "#d1fae5" }} elevation={3}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ color: "#81e6d9" }}>
                  {title}
                </Typography>
                <Typography variant="h6">
                  {value}{" "}
                  <Typography
                    component="span"
                    sx={{
                      color: change.startsWith("+") ? "#86efac" : "#f87171",
                      fontWeight: 600,
                    }}
                  >
                    {change}
                  </Typography>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Revenue Chart */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12}>
          <Card sx={{ bgcolor: "#134e4a", color: "#d1fae5" }} elevation={3}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Monthly Revenue
              </Typography>
              <Line
                data={lineData}
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

      {/* Orders Table */}
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
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell sx={{ color: "#81e6d9" }}>
                          {order.id}
                        </TableCell>
                        <TableCell sx={{ color: "#81e6d9" }}>
                          {order.customer}
                        </TableCell>
                        <TableCell sx={{ color: "#81e6d9" }}>
                          {order.date}
                        </TableCell>
                        <TableCell sx={{ color: "#81e6d9" }}>
                          {order.product}
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
                            {order.amount}
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

        {/* Doughnut Chart */}
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
