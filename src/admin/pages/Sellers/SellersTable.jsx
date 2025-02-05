import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const accountStatuses = [
  {
    status: "PENDING_VERIFICATION",
    title: "Pending Verification",
    description:
      "The account is awaiting verification. The user has signed up but has not yet completed the required verification steps (e.g., email or phone verification).",
  },
  {
    status: "ACTIVE",
    title: "Active",
    description:
      "The account is fully verified and active. The user can access all features and services associated with their account.",
  },
  {
    status: "SUSPENDED",
    title: "Suspended",
    description:
      "The account has been temporarily suspended due to a violation of terms of service or suspicious activity. The user cannot access their account during this period.",
  },
  {
    status: "DEACTIVATED",
    title: "Deactivated",
    description:
      "The account has been deactivated by the user or the system. It is no longer accessible, but the data may still be retained for a certain period.",
  },
  {
    status: "BANNED",
    title: "Banned",
    description:
      "The account has been permanently banned due to severe violations of terms of service. The user can no longer access the account or create new accounts.",
  },
  {
    status: "CLOSED",
    title: "Closed",
    description:
      "The account has been permanently closed, either by the user or the system. All associated data may be deleted or anonymized.",
  },
];
function SellersTable() {
  const [accountStatus, setAccountStatus] = useState("ACTIVE");
  const handleChange = (e) => {
    setAccountStatus(e.target.value);
  };
  return (
    <>
      <div className="pb-5 w-60">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Account Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accountStatus}
            label="Account Status"
            onChange={handleChange}
          >
            {accountStatuses.map((item) => (
              <MenuItem key={item} value={item.status}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Seller Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>
              <StyledTableCell align="right">GSTIN</StyledTableCell>
              <StyledTableCell align="right">Business Name</StyledTableCell>
              <StyledTableCell align="right">Account Status</StyledTableCell>
              <StyledTableCell align="right">Change Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button>Change</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SellersTable;
