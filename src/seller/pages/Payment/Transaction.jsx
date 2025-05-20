import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const transactions = [
  {
    date: "2025-05-01",
    customer: "John Doe",
    orderId: "#ORD1021",
    amount: 1200.5,
  },
  {
    date: "2025-05-03",
    customer: "Sarah Khan",
    orderId: "#ORD1022",
    amount: 245.75,
  },
  {
    date: "2025-05-05",
    customer: "Mohamed Ali",
    orderId: "#ORD1023",
    amount: 980.0,
  },
  {
    date: "2025-05-08",
    customer: "Lina Ashraf",
    orderId: "#ORD1024",
    amount: 150.0,
  },
];

function Transaction() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="transaction table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Customer</StyledTableCell>
            <StyledTableCell>Order ID</StyledTableCell>
            <StyledTableCell align="right">Amount (E£)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx, idx) => (
            <StyledTableRow key={idx}>
              <StyledTableCell>{tx.date}</StyledTableCell>
              <StyledTableCell>{tx.customer}</StyledTableCell>
              <StyledTableCell>{tx.orderId}</StyledTableCell>
              <StyledTableCell align="right">
                {tx.amount.toLocaleString("en-EG", {
                  style: "currency",
                  currency: "EGP",
                })}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Transaction;
