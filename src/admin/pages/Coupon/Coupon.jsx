import { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  CircularProgress,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveCoupons, deleteCoupon } from "../../../State/couponSlice";

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

function Coupon() {
  const dispatch = useDispatch();
  const { activeCoupons, loading, error } = useSelector(
    (state) => state.coupon
  );

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    idToDelete: null,
  });

  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchActiveCoupons());
  }, [dispatch]);

  const confirmDelete = (id) => {
    setConfirmDialog({ open: true, idToDelete: id });
  };

  const handleDeleteConfirmed = async () => {
    const { idToDelete } = confirmDialog;
    if (!idToDelete) return;

    setDeleting(true);
    const result = await dispatch(deleteCoupon(idToDelete));
    setDeleting(false);

    if (deleteCoupon.fulfilled.match(result)) {
      setSnackbar({
        open: true,
        message: "Coupon deleted successfully!",
        severity: "success",
      });
      dispatch(fetchActiveCoupons());
    } else {
      setSnackbar({
        open: true,
        message: result.payload || "Delete failed",
        severity: "error",
      });
    }

    setConfirmDialog({ open: false, idToDelete: null });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
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
            {activeCoupons.map((coupon) => (
              <StyledTableRow key={coupon.id}>
                <StyledTableCell>{coupon.code}</StyledTableCell>
                <StyledTableCell>
                  {new Date(coupon.startDate).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(coupon.endDate).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell>${coupon.minOrderValue}</StyledTableCell>
                <StyledTableCell>{coupon.discountPercentage}%</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    size="small"
                    color="error"
                    onClick={() => confirmDelete(coupon.id)}
                  >
                    <Delete />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, idToDelete: null })}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this coupon? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setConfirmDialog({ open: false, idToDelete: null })}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteConfirmed}
            disabled={deleting}
          >
            {deleting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Confirm Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Coupon;
