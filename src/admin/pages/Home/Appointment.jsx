import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
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

const appointments = [
  {
    appointment_id: 1,
    user_id: 101,
    services: ["Haircut", "Shampoo"],
  },
  {
    appointment_id: 2,
    user_id: 102,
    services: ["Manicure"],
  },
  {
    appointment_id: 3,
    user_id: 103,
    services: ["Facial", "Massage", "Pedicure"],
  },
];

function Appointment() {
  const [data, setData] = useState(appointments);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
        Appointments
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} aria-label="appointments table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Appointment ID</StyledTableCell>
              <StyledTableCell>User ID</StyledTableCell>
              <StyledTableCell>Services</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((appointment) => (
              <StyledTableRow key={appointment.appointment_id}>
                <StyledTableCell>{appointment.appointment_id}</StyledTableCell>
                <StyledTableCell>{appointment.user_id}</StyledTableCell>
                <StyledTableCell>
                  {appointment.services.map((service, index) => (
                    <Chip
                      key={index}
                      label={service}
                      color="secondary"
                      size="small"
                      sx={{ mr: 1, mb: 0.5 }}
                    />
                  ))}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button variant="outlined" size="small" color="error">
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Appointment;
