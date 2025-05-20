import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { tableCellClasses } from "@mui/material/TableCell";

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

const accountStatuses = [
  { status: "PENDING_VERIFICATION", title: "Pending Verification" },
  { status: "ACTIVE", title: "Active" },
  { status: "SUSPENDED", title: "Suspended" },
  { status: "DEACTIVATED", title: "Deactivated" },
  { status: "BANNED", title: "Banned" },
  { status: "CLOSED", title: "Closed" },
];

const initialRows = [
  {
    name: "Alice Johnson",
    email: "alice@email.com",
    mobile: "1234567890",
    gstin: "22AABCF1234F1Z5",
    business: "Alice Co.",
    status: "ACTIVE",
  },
  {
    name: "Bob Smith",
    email: "bob@email.com",
    mobile: "9876543210",
    gstin: "19BBBCF4321F2X8",
    business: "Bob Ltd.",
    status: "SUSPENDED",
  },
  {
    name: "Clara Adams",
    email: "clara@email.com",
    mobile: "1122334455",
    gstin: "27CCCCF5678F3Y2",
    business: "Clara Ventures",
    status: "PENDING_VERIFICATION",
  },
];

function SellersTable() {
  const [rows, setRows] = useState(initialRows);
  const [editingIndex, setEditingIndex] = useState(null);
  const [accountStatus, setAccountStatus] = useState("ALL");

  const handleChangeStatusFilter = (e) => {
    setAccountStatus(e.target.value);
  };

  const handleStatusChange = (index, newStatus) => {
    const updated = [...rows];
    updated[index].status = newStatus;
    setRows(updated);
    setEditingIndex(null);
  };

  const filteredRows =
    accountStatus === "ALL"
      ? rows
      : rows.filter((row) => row.status === accountStatus);

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ width: 250, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="filter-label">Account Status</InputLabel>
          <Select
            labelId="filter-label"
            value={accountStatus}
            label="Account Status"
            onChange={handleChangeStatusFilter}
          >
            <MenuItem value="ALL">All</MenuItem>
            {accountStatuses.map((item) => (
              <MenuItem key={item.status} value={item.status}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} aria-label="sellers table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Seller Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>
              <StyledTableCell align="right">GSTIN</StyledTableCell>
              <StyledTableCell align="right">Business</StyledTableCell>
              <StyledTableCell align="right">Account Status</StyledTableCell>
              <StyledTableCell align="center">Change Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => {
              const rowIndex = rows.findIndex((r) => r.name === row.name);
              return (
                <StyledTableRow key={row.name}>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.mobile}</StyledTableCell>
                  <StyledTableCell align="right">{row.gstin}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.business}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.status}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Box sx={{ width: 120, height: 35, mx: "auto" }}>
                      {editingIndex === rowIndex ? (
                        <FormControl size="small" fullWidth>
                          <Select
                            value={row.status}
                            onChange={(e) =>
                              handleStatusChange(rowIndex, e.target.value)
                            }
                            autoFocus
                          >
                            {accountStatuses.map((status) => (
                              <MenuItem
                                key={status.status}
                                value={status.status}
                              >
                                {status.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <Button
                          size="small"
                          variant="outlined"
                          fullWidth
                          onClick={() => setEditingIndex(rowIndex)}
                        >
                          Change
                        </Button>
                      )}
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default SellersTable;
