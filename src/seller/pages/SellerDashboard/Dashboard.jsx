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
  const lineData = {
    labels: [
      "plane",
      "helicopter",
      "boat",
      "train",
      "subway",
      "bus",
      "car",
      "moto",
      "bicycle",
      "horse",
      "skateboard",
      "others",
    ],
    datasets: [
      {
        label: "US",
        data: [450, 380, 420, 300, 200, 460, 390, 510, 480, 350, 420, 410],
        borderColor: "#5eead4",
        backgroundColor: "transparent",
        tension: 0.4,
      },
      {
        label: "France",
        data: [350, 320, 350, 180, 90, 390, 320, 410, 380, 260, 350, 330],
        borderColor: "#14b8a6",
        backgroundColor: "transparent",
        tension: 0.4,
      },
      {
        label: "Japan",
        data: [150, 100, 130, 90, 40, 160, 120, 180, 150, 110, 130, 140],
        borderColor: "#0f766e",
        backgroundColor: "transparent",
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: ["Donut", "Fries", "Kebab", "Sandwich", "Burger", "Hot dog"],
    datasets: [
      {
        data: [50, 30, 40, 20, 60, 45],
        backgroundColor: [
          "#5eead4",
          "#14b8a6",
          "#0f766e",
          "#134e4a",
          "#22c55e",
          "#22d3ee",
        ],
      },
    ],
  };

  const barData = {
    labels: ["AD", "AE", "AF", "AG", "AI", "AL", "AM"],
    datasets: [
      {
        label: "Donut",
        data: [120, 80, 150, 100, 180, 130, 110],
        backgroundColor: "#5eead4",
      },
      {
        label: "Fries",
        data: [90, 70, 120, 80, 140, 100, 90],
        backgroundColor: "#14b8a6",
      },
      {
        label: "Kebab",
        data: [60, 50, 80, 50, 100, 70, 60],
        backgroundColor: "#0f766e",
      },
      {
        label: "Sandwich",
        data: [50, 40, 70, 40, 90, 60, 50],
        backgroundColor: "#134e4a",
      },
      {
        label: "Burger",
        data: [40, 30, 60, 30, 80, 50, 40],
        backgroundColor: "#22c55e",
      },
      {
        label: "Hot dog",
        data: [30, 20, 50, 20, 70, 40, 30],
        backgroundColor: "#22d3ee",
      },
    ],
  };

  const transactions = [
    {
      id: "01e4dsa",
      user: "johndoe",
      date: "2021-09-01",
      amount: "$43.95",
    },
    {
      id: "0315dsaa",
      user: "jackdower",
      date: "2022-04-01",
      amount: "$133.45",
    },
    {
      id: "01e4dsa",
      user: "aberdohnny",
      date: "2021-09-01",
      amount: "$43.95",
    },
    {
      id: "51034szv",
      user: "exampleuser",
      date: "2023-11-06",
      amount: "$63.45",
    },
  ];

  return (
    <Box className="min-h-screen font-sans" sx={{ color: "#d1fae5" }}>
      <Grid container spacing={3} className="mb-6">
        {[
          {
            title: "Emails Sent",
            value: "12,361",
            change: "+4%",
          },
          {
            title: "Sales Obtained",
            value: "431,225",
            change: "+21%",
          },
          {
            title: "New Clients",
            value: "32,441",
            change: "+5%",
          },
          {
            title: "Traffic Received",
            value: "1,325,134",
            change: "+43%",
          },
        ].map(({ title, value, change }) => (
          <Grid item xs={12} sm={6} md={3} key={title}>
            <Card
              elevation={3}
              sx={{
                bgcolor: "#134e4a",
                color: "#d1fae5",
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" sx={{ color: "#81e6d9" }}>
                  {title}
                </Typography>
                <Typography variant="h6" className="flex items-center gap-2">
                  <span>{value}</span>
                  <span
                    className={`text-sm font-semibold ${
                      change.startsWith("+") ? "text-green-300" : "text-red-400"
                    }`}
                  >
                    {change}
                  </span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} className="mb-6" direction="column">
        <Grid item xs={12}>
          <Card
            elevation={3}
            sx={{
              bgcolor: "#134e4a",
              color: "#d1fae5",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Revenue Generated
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: "#5eead4", fontWeight: "bold", mb: 3 }}
              >
                $59,342.32
              </Typography>
              <Line
                data={lineData}
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

        <Grid item xs={12}>
          <Card
            elevation={3}
            sx={{
              bgcolor: "#134e4a",
              color: "#d1fae5",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Recent Transactions
              </Typography>
              <Paper
                sx={{ maxHeight: 320, overflow: "auto", bgcolor: "#0f766e" }}
              >
                <Table stickyHeader>
                  <TableHead sx={{ bgcolor: "#0d5543", fontWeight: "bold" }}>
                    <TableRow>
                      <TableCell sx={{ color: "#0d5543" }}>ID</TableCell>
                      <TableCell sx={{ color: "#0d5543" }}>User</TableCell>
                      <TableCell sx={{ color: "#0d5543" }}>Date</TableCell>
                      <TableCell sx={{ color: "#0d5543" }} align="right">
                        Amount
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((tx, idx) => (
                      <TableRow key={idx} sx={{ borderColor: "#0a4e3c" }}>
                        <TableCell sx={{ color: "#81e6d9" }}>{tx.id}</TableCell>
                        <TableCell sx={{ color: "#81e6d9" }}>
                          {tx.user}
                        </TableCell>
                        <TableCell sx={{ color: "#81e6d9" }}>
                          {tx.date}
                        </TableCell>
                        <TableCell sx={{ color: "#81e6d9" }} align="right">
                          <Box
                            component="span"
                            sx={{
                              backgroundColor: "#5eead4",
                              color: "#0f766e",
                              px: 2,
                              borderRadius: 1,
                              fontWeight: "600",
                            }}
                          >
                            {tx.amount}
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
      </Grid>

      <Grid container spacing={3} className="mb-6">
        <Grid item xs={12} md={4}>
          <Card
            elevation={3}
            sx={{
              bgcolor: "#134e4a",
              color: "#d1fae5",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardContent>
              <Doughnut data={doughnutData} />
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#5eead4",
                  fontWeight: "bold",
                  mt: 3,
                  textAlign: "center",
                }}
              >
                $48,352 revenue generated
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#81e6d9", textAlign: "center" }}
              >
                Includes extra misc expenditures and costs
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card
            elevation={3}
            sx={{
              bgcolor: "#134e4a",
              color: "#d1fae5",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Sales Quantity
              </Typography>
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  scales: {
                    x: { stacked: true, ticks: { color: "#d1fae5" } },
                    y: { stacked: true, ticks: { color: "#d1fae5" } },
                  },
                  plugins: {
                    legend: { labels: { color: "#d1fae5" } },
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
