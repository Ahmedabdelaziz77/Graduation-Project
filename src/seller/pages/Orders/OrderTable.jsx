import { useState } from "react";
import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    verticalAlign: "middle",
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

const initialRows = [
  {
    orderId: "#ORD1023",
    products: "Smart Hub x1, Light Bulb x2",
    address: "123 Maple St, New York, NY",
    status: "Processing",
  },
  {
    orderId: "#ORD1024",
    products: "Security Camera x1",
    address: "456 Oak Dr, San Jose, CA",
    status: "Shipped",
  },
  {
    orderId: "#ORD1025",
    products: "Thermostat x1, Motion Sensor x3",
    address: "789 Pine Ln, Austin, TX",
    status: "Delivered",
  },
  {
    orderId: "#ORD1026",
    products: "Smart Plug x2",
    address: "321 Elm Ave, Seattle, WA",
    status: "Cancelled",
  },
];

const statusOptions = ["Processing", "Shipped", "Delivered", "Cancelled"];

function OrderTable() {
  const [orders, setOrders] = useState(initialRows);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...orders];
    updated[index].status = newStatus;
    setOrders(updated);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table
        sx={{ minWidth: 900, tableLayout: "fixed" }}
        aria-label="order table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Order ID</StyledTableCell>
            <StyledTableCell>Products</StyledTableCell>
            <StyledTableCell>Shipping Address</StyledTableCell>
            <StyledTableCell>Order Status</StyledTableCell>
            <StyledTableCell align="center">Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row, index) => (
            <StyledTableRow key={row.orderId}>
              <StyledTableCell>{row.orderId}</StyledTableCell>
              <StyledTableCell>{row.products}</StyledTableCell>
              <StyledTableCell>{row.address}</StyledTableCell>
              <StyledTableCell>
                {editingIndex === index ? (
                  <FormControl
                    fullWidth
                    size="small"
                    sx={{
                      minHeight: 40,
                      "& .MuiSelect-select": {
                        py: "6px",
                      },
                    }}
                  >
                    <Select
                      value={row.status}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                      autoFocus
                      size="small"
                    >
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  row.status
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {editingIndex === index ? (
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    onClick={() => setEditingIndex(null)}
                    sx={{ minWidth: 100, height: 40 }}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setEditingIndex(index)}
                    sx={{ minWidth: 100, height: 40 }}
                  >
                    Update
                  </Button>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;
