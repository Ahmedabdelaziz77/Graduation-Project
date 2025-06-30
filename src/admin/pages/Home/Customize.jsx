import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";

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

const offers = [
  {
    id: 1,
    name: "John Doe",
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    mobile: "1234567890",
    homeType: "House",
    home_size: 240,
    number_of_levels: 2,
    smart_sensors: ["Smoke", "Temperature", "Motion"],
    optional_features: {
      security: true,
      garden: false,
      solar: true,
    },
    status: "Finished",
    rooms: 5,
    installDate: "2025-06-15",
    address: "123 Main St",
    requirements: "Solar panel setup and smart sensors",
  },
  {
    id: 2,
    name: "Jane Smith",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane@example.com",
    mobile: "0987654321",
    homeType: "Apartment",
    home_size: 130,
    number_of_levels: 1,
    smart_sensors: ["Smoke"],
    optional_features: {
      security: false,
      garden: true,
      solar: false,
    },
    status: "Under Construction",
    rooms: 3,
    installDate: "2025-07-01",
    address: "456 Park Ave",
    requirements: "Smart thermostat only",
  },
];

function OffersDashboard() {
  const [open, setOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleView = (offer) => {
    setSelectedOffer(offer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOffer(null);
  };

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
                <StyledTableCell>{offer.name}</StyledTableCell>
                <StyledTableCell>{offer.email}</StyledTableCell>
                <StyledTableCell>{offer.mobile}</StyledTableCell>
                <StyledTableCell>{offer.homeType}</StyledTableCell>
                <StyledTableCell>{offer.status}</StyledTableCell>
                <StyledTableCell>{offer.rooms}</StyledTableCell>
                <StyledTableCell>{offer.installDate}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleView(offer)}
                  >
                    <Visibility />
                  </Button>
                  <Button size="small" color="error">
                    <Delete />
                  </Button>
                  <Button
                    size="small"
                    color="success"
                    variant="outlined"
                    sx={{ ml: 1 }}
                  >
                    Done
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Offer Details</DialogTitle>
        <DialogContent dividers>
          {selectedOffer && (
            <>
              <Typography variant="body1">
                <strong>Name:</strong> {selectedOffer.name}
              </Typography>
              <Typography variant="body1">
                <strong>First Name:</strong> {selectedOffer.first_name}
              </Typography>
              <Typography variant="body1">
                <strong>Last Name:</strong> {selectedOffer.last_name}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {selectedOffer.email}
              </Typography>
              <Typography variant="body1">
                <strong>Mobile:</strong> {selectedOffer.mobile}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {selectedOffer.address}
              </Typography>
              <Typography variant="body1">
                <strong>Home Type:</strong> {selectedOffer.homeType}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {selectedOffer.status}
              </Typography>
              <Typography variant="body1">
                <strong>Rooms:</strong> {selectedOffer.rooms}
              </Typography>
              <Typography variant="body1">
                <strong>Installation Date:</strong> {selectedOffer.installDate}
              </Typography>
              <Typography variant="body1">
                <strong>Requirements:</strong> {selectedOffer.requirements}
              </Typography>
              <Typography variant="body1">
                <strong>Home Size:</strong> {selectedOffer.home_size} m²
              </Typography>
              <Typography variant="body1">
                <strong>Number of Levels:</strong>{" "}
                {selectedOffer.number_of_levels}
              </Typography>
              <Typography variant="body1">
                <strong>Smart Sensors:</strong>{" "}
                {selectedOffer.smart_sensors?.join(", ") || "—"}
              </Typography>
              <Typography variant="body1">
                <strong>Optional Features:</strong>{" "}
                {selectedOffer.optional_features
                  ? JSON.stringify(selectedOffer.optional_features, null, 2)
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
