import {
  Box,
  Button,
  Chip,
  CircularProgress,
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
import { useEffect, useState } from "react";
import { tableCellClasses } from "@mui/material/TableCell";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../../../components/Spinner";
import { toast } from "react-toastify";
import moment from "moment";
import {
  fetchAllAppointments,
  updateAppointmentStatus,
} from "../../../State/customer/appointmentsSlice";

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

function Appointment() {
  const dispatch = useDispatch();
  const { all, loading } = useSelector((state) => state.appointments);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllAppointments());
  }, [dispatch]);

  const handleChangeStatus = async (appointmentId) => {
    try {
      setUpdatingId(appointmentId);
      await dispatch(
        updateAppointmentStatus({ appointmentId, status: "DONE" })
      ).unwrap();
      toast.success("Status updated to DONE");
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <Spinner />;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
        All Appointments
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} aria-label="appointments table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>User Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Services</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Created At</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {all.map((appointment) => (
              <StyledTableRow key={appointment.id}>
                <StyledTableCell>{appointment.id}</StyledTableCell>
                <StyledTableCell>
                  {appointment.user.firstname} {appointment.user.lastname}
                </StyledTableCell>
                <StyledTableCell>{appointment.user.email}</StyledTableCell>
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
                <StyledTableCell>{appointment.status}</StyledTableCell>
                <StyledTableCell>
                  {moment(appointment.createdAt).format("YYYY-MM-DD HH:mm")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    disabled={
                      appointment.status === "DONE" ||
                      updatingId === appointment.id
                    }
                    onClick={() => handleChangeStatus(appointment.id)}
                    sx={{ minWidth: 160 }}
                  >
                    {updatingId === appointment.id ? (
                      <CircularProgress size={18} sx={{ color: "#fff" }} />
                    ) : (
                      "Mark as Done"
                    )}
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
