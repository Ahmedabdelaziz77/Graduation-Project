import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateOrderItemStatus } from "../../../State/customer/orderItemsSlice";

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    verticalAlign: "middle",
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

const statusOptions = [
  "PROCESSING",
  "PACKED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const ROWS_PER_PAGE = 8;

function OrderTable({ orderItems }) {
  const dispatch = useDispatch();
  const [editingIndex, setEditingIndex] = useState(null);
  const [updatedStatuses, setUpdatedStatuses] = useState({});
  const [updatingId, setUpdatingId] = useState(null);
  const [page, setPage] = useState(1);

  const handleStatusChange = (id, value) => {
    setUpdatedStatuses((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveStatus = (orderItem, index) => {
    const newStatus = updatedStatuses[orderItem.id] || orderItem.status;
    setUpdatingId(orderItem.id);

    dispatch(updateOrderItemStatus({ id: orderItem.id, status: newStatus }))
      .unwrap()
      .then(() => {
        toast.success("Status updated successfully");
        setEditingIndex(null);
        setUpdatingId(null);
      })
      .catch(() => {
        toast.error("Failed to update status");
        setUpdatingId(null);
      });
  };

  const paginatedItems = orderItems.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  const totalPages = Math.ceil(orderItems.length / ROWS_PER_PAGE);

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 900 }} aria-label="order table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order ID</StyledTableCell>
              <StyledTableCell>Product</StyledTableCell>
              <StyledTableCell>Shipping Address</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="center">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.map((orderItem, index) => {
              const globalIndex = (page - 1) * ROWS_PER_PAGE + index;
              const address = orderItem.product.seller.user.addresses?.[0];
              const shippingAddress = address
                ? `${address.street}, ${address.city}, ${address.state ?? ""} ${
                    address.zipcode ?? ""
                  }`
                : "No address provided";

              return (
                <StyledTableRow key={orderItem.id}>
                  <StyledTableCell>#{orderItem.orderId}</StyledTableCell>
                  <StyledTableCell>{orderItem.product.name} ×1</StyledTableCell>
                  <StyledTableCell>{shippingAddress}</StyledTableCell>
                  <StyledTableCell>
                    {editingIndex === globalIndex ? (
                      <FormControl fullWidth size="small">
                        <Select
                          value={
                            updatedStatuses[orderItem.id] || orderItem.status
                          }
                          onChange={(e) =>
                            handleStatusChange(orderItem.id, e.target.value)
                          }
                        >
                          {statusOptions.map((status) => (
                            <MenuItem key={status} value={status}>
                              {status}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      orderItem.status.charAt(0).toUpperCase() +
                      orderItem.status.slice(1).toLowerCase()
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {editingIndex === globalIndex ? (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleSaveStatus(orderItem, globalIndex)}
                        disabled={updatingId === orderItem.id}
                        startIcon={
                          updatingId === orderItem.id && (
                            <CircularProgress color="inherit" size={16} />
                          )
                        }
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setEditingIndex(globalIndex)}
                      >
                        Update
                      </Button>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Control */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </div>
      )}
    </>
  );
}

export default OrderTable;
