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
import { useEffect, useState } from "react";
import { tableCellClasses } from "@mui/material/TableCell";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSellers,
  fetchSellerStatuses,
  fetchSellersByStatus,
  updateSellerStatus,
} from "../../../State/admin/sellerSlice";
import truncateTextWithTooltip from "../../../components/truncateTextWithTooltip";
import MiniEmpty from "../../../components/MiniEmpty";
import Spinner from "../../../components/Spinner";
import { toast } from "react-toastify";

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

function SellersTable() {
  const dispatch = useDispatch();
  const [accountStatus, setAccountStatus] = useState("ALL");
  const [editingId, setEditingId] = useState(null);
  const [changingId, setChangingId] = useState(null);

  const {
    list: sellers,
    statuses: statusList,
    loading,
  } = useSelector((state) => state.sellers);

  useEffect(() => {
    dispatch(fetchAllSellers());
    dispatch(fetchSellerStatuses());
  }, [dispatch]);

  const handleChangeStatusFilter = (e) => {
    const value = e.target.value;
    setAccountStatus(value);
    if (value === "ALL") {
      dispatch(fetchAllSellers());
    } else {
      dispatch(fetchSellersByStatus(value));
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setChangingId(id);
      await dispatch(updateSellerStatus({ id, status: newStatus })).unwrap();
      toast.success("Seller status updated");
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setChangingId(null);
      setEditingId(null);
    }
  };

  const filteredSellers =
    accountStatus === "ALL" || accountStatus === ""
      ? sellers
      : sellers.filter((s) => s.status === accountStatus);

  if (loading) {
    return <Spinner />;
  }

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
            {statusList?.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
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
              <StyledTableCell align="right">TIN</StyledTableCell>
              <StyledTableCell align="right">Business</StyledTableCell>
              <StyledTableCell align="right">Account Status</StyledTableCell>
              <StyledTableCell align="center">Change Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSellers.length > 0 ? (
              filteredSellers.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>
                    {truncateTextWithTooltip(row.name || "-")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {truncateTextWithTooltip(row.mail || "-")}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.mobile}</StyledTableCell>
                  <StyledTableCell align="right">
                    {truncateTextWithTooltip(row.tin || "-")}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {truncateTextWithTooltip(row.businessName || "-")}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.status || "N/A"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Box sx={{ width: 120, height: 35, mx: "auto" }}>
                      {editingId === row.id ? (
                        <FormControl
                          size="small"
                          fullWidth
                          disabled={changingId === row.id}
                        >
                          <Select
                            value={row.status || ""}
                            onChange={(e) =>
                              handleStatusChange(row.id, e.target.value)
                            }
                            autoFocus
                          >
                            {statusList?.map((status) => (
                              <MenuItem key={status} value={status}>
                                {status}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <Button
                          size="small"
                          variant="outlined"
                          fullWidth
                          onClick={() => setEditingId(row.id)}
                          disabled={changingId === row.id}
                        >
                          {changingId === row.id ? (
                            <Spinner size={18} />
                          ) : (
                            "Change"
                          )}
                        </Button>
                      )}
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>
                  <MiniEmpty
                    whatIsEmpty="No sellers found."
                    WhatToDo="Try a different status or refresh."
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default SellersTable;
