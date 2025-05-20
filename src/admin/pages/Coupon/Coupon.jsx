import { Button, Paper } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
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

function createData(code, start, end, minOrder, discount) {
  return { code, start, end, minOrder, discount };
}

const rows = [
  createData("SAVE10", "2024-06-01", "2024-06-30", "$50", "10%"),
  createData("FREESHIP", "2024-06-10", "2024-07-10", "$30", "0%"),
  createData("WELCOME15", "2024-05-01", "2024-06-15", "$75", "15%"),
  createData("JULYDEAL", "2024-07-01", "2024-07-31", "$100", "20%"),
];

function Coupon() {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table sx={{ minWidth: 1000 }} aria-label="coupon table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Coupon Code</StyledTableCell>
            <StyledTableCell>Start Date</StyledTableCell>
            <StyledTableCell>End Date</StyledTableCell>
            <StyledTableCell>Min Order Value</StyledTableCell>
            <StyledTableCell>Discount %</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.code}>
              <StyledTableCell>{row.code}</StyledTableCell>
              <StyledTableCell>{row.start}</StyledTableCell>
              <StyledTableCell>{row.end}</StyledTableCell>
              <StyledTableCell>{row.minOrder}</StyledTableCell>
              <StyledTableCell>{row.discount}</StyledTableCell>
              <StyledTableCell align="center">
                <Button size="small" color="error">
                  <Delete />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Coupon;
