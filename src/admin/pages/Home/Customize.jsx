import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchOffers,
  updateOfferStatus,
} from "../../../State/customer/offersSlice";
import Spinner from "../../../components/Spinner";

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

function OffersDashboard() {
  const dispatch = useDispatch();
  const { offers, loading } = useSelector((state) => state.offers);
  const [open, setOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const handleView = (offer) => {
    setSelectedOffer(offer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOffer(null);
  };

  const handleStatusChange = async (id) => {
    try {
      setUpdatingId(id);
      await dispatch(
        updateOfferStatus({ offerId: id, status: "DONE" })
      ).unwrap();
      toast.success("Status updated successfully!");
      dispatch(fetchOffers());
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <Spinner />;
  console.log(offers);
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 1000 }} aria-label="offers table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Mobile</StyledTableCell>
              <StyledTableCell>Home Type</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Rooms</StyledTableCell>
              <StyledTableCell>Install Date</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((offer) => (
              <StyledTableRow key={offer.id}>
                <StyledTableCell>{offer.id}</StyledTableCell>
                <StyledTableCell>
                  {offer.firstName || "—"} {offer.lastName || ""}
                </StyledTableCell>
                <StyledTableCell>{offer.email || "—"}</StyledTableCell>
                <StyledTableCell>{offer.mobile || "—"}</StyledTableCell>
                <StyledTableCell>{offer.homeType || "—"}</StyledTableCell>
                <StyledTableCell>{offer.status || "—"}</StyledTableCell>
                <StyledTableCell>{offer.numberOfRooms || "—"}</StyledTableCell>
                <StyledTableCell>
                  {offer.installationDate
                    ? new Date(offer.installationDate)
                        .toISOString()
                        .split("T")[0]
                    : "—"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleView(offer)}
                  >
                    <Visibility />
                  </Button>
                  <Button
                    size="small"
                    color="success"
                    variant="outlined"
                    sx={{ ml: 1 }}
                    disabled={
                      updatingId === offer.id || offer.status === "DONE"
                    }
                    onClick={() => handleStatusChange(offer.id)}
                  >
                    {updatingId === offer.id ? (
                      <CircularProgress size={18} />
                    ) : (
                      "Mark Done"
                    )}
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for full details */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Offer Details</DialogTitle>
        <DialogContent dividers>
          {selectedOffer && (
            <>
              <Typography variant="body1">
                <strong>Name:</strong> {selectedOffer.firstName}{" "}
                {selectedOffer.lastName}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {selectedOffer.email}
              </Typography>
              <Typography variant="body1">
                <strong>Mobile:</strong> {selectedOffer.mobile}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong>{" "}
                {selectedOffer.address
                  ? `${selectedOffer.address.street}, ${selectedOffer.address.city}, ${selectedOffer.address.state} ${selectedOffer.address.zipcode}`
                  : "—"}
              </Typography>
              <Typography variant="body1">
                <strong>Home Type:</strong> {selectedOffer.homeType || "—"}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {selectedOffer.status || "—"}
              </Typography>
              <Typography variant="body1">
                <strong>Rooms:</strong> {selectedOffer.numberOfRooms || "—"}
              </Typography>
              <Typography variant="body1">
                <strong>Installation Date:</strong>{" "}
                {selectedOffer.installationDate
                  ? new Date(selectedOffer.installationDate)
                      .toISOString()
                      .split("T")[0]
                  : "—"}
              </Typography>
              <Typography variant="body1">
                <strong>Requirements:</strong>{" "}
                {selectedOffer.requirements || "—"}
              </Typography>
              <Typography variant="body1">
                <strong>Home Size:</strong> {selectedOffer.homeSize || "—"} m²
              </Typography>
              <Typography variant="body1">
                <strong>Number of Levels:</strong>{" "}
                {selectedOffer.numberOfLevels || "—"}
              </Typography>
              <Typography variant="body1">
                <strong>Smart Sensors:</strong>{" "}
                {selectedOffer.smartSensors?.join(", ") || "—"}
              </Typography>
              <Typography variant="body1">
                <strong>Optional Features:</strong>{" "}
                {selectedOffer.optionalFeatures
                  ? JSON.stringify(selectedOffer.optionalFeatures, null, 2)
                  : "—"}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default OffersDashboard;
