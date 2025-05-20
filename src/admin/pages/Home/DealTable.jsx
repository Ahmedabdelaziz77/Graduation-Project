import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Delete, Edit } from "@mui/icons-material";

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

function createData(no, image, category, discount) {
  return { no, image, category, discount };
}

const rows = [
  createData(1, "📦", "Electronics", "15%"),
  createData(2, "📦", "Fashion", "20%"),
  createData(3, "📦", "Home", "25%"),
  createData(4, "📦", "Books", "10%"),
];

function DealTable() {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 900 }} aria-label="deal table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Discount</StyledTableCell>
            <StyledTableCell align="center">Update</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.no}>
              <StyledTableCell>{row.no}</StyledTableCell>
              <StyledTableCell>{row.image}</StyledTableCell>
              <StyledTableCell>{row.category}</StyledTableCell>
              <StyledTableCell>{row.discount}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton color="primary">
                  <Edit />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DealTable;
