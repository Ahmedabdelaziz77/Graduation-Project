import { useState } from "react";
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
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

const initialRows = [
  {
    id: 1,
    title: "Smart Hub",
    image: "https://via.placeholder.com/40",
    mrp: 120,
    sellingPrice: 99,
    version: "v2.1",
    stock: 30,
  },
  {
    id: 2,
    title: "Smart Bulb",
    image: "https://via.placeholder.com/40",
    mrp: 25,
    sellingPrice: 18.5,
    version: "v1.3",
    stock: 120,
  },
  {
    id: 3,
    title: "Motion Sensor",
    image: "https://via.placeholder.com/40",
    mrp: 40,
    sellingPrice: 33,
    version: "v3.0",
    stock: 75,
  },
];

function ProductsTable() {
  const [rows, setRows] = useState(initialRows);
  const [editRow, setEditRow] = useState(null); // The product being edited

  const handleOpenEdit = (row) => setEditRow({ ...row });
  const handleCloseEdit = () => setEditRow(null);

  const handleEditChange = (field, value) => {
    setEditRow((prev) => ({
      ...prev,
      [field]: field === "title" || field === "version" ? value : Number(value),
    }));
  };

  const handleSaveEdit = () => {
    setRows((prev) => prev.map((r) => (r.id === editRow.id ? editRow : r)));
    handleCloseEdit();
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 900 }} aria-label="products table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="right">MRP</StyledTableCell>
              <StyledTableCell align="right">Selling Price</StyledTableCell>
              <StyledTableCell align="right">Version</StyledTableCell>
              <StyledTableCell align="right">Stock</StyledTableCell>
              <StyledTableCell align="center">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>
                  <Avatar src={row.image} alt={row.title} variant="rounded" />
                </StyledTableCell>
                <StyledTableCell>{row.title}</StyledTableCell>
                <StyledTableCell align="right">${row.mrp}</StyledTableCell>
                <StyledTableCell align="right">
                  ${row.sellingPrice}
                </StyledTableCell>
                <StyledTableCell align="right">{row.version}</StyledTableCell>
                <StyledTableCell align="right">{row.stock}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpenEdit(row)}
                  >
                    Edit
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Dialog
        open={Boolean(editRow)}
        onClose={handleCloseEdit}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent dividers>
          {editRow && (
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                label="Title"
                value={editRow.title}
                onChange={(e) => handleEditChange("title", e.target.value)}
                fullWidth
              />
              <TextField
                label="MRP"
                type="number"
                value={editRow.mrp}
                onChange={(e) => handleEditChange("mrp", e.target.value)}
                fullWidth
              />
              <TextField
                label="Selling Price"
                type="number"
                value={editRow.sellingPrice}
                onChange={(e) =>
                  handleEditChange("sellingPrice", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Version"
                value={editRow.version}
                onChange={(e) => handleEditChange("version", e.target.value)}
                fullWidth
              />
              <TextField
                label="Stock"
                type="number"
                value={editRow.stock}
                onChange={(e) => handleEditChange("stock", e.target.value)}
                fullWidth
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductsTable;
