import { useEffect, useState } from "react";
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
  Tooltip,
  Stack,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchSellerProducts,
  editProduct,
  deleteProduct,
} from "../../../State/seller/sellerProductSlice";
import Spinner from "../../../components/Spinner";
import MiniEmpty from "../../../components/MiniEmpty";

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

function ProductsTable() {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.sellerProducts);
  const [editRow, setEditRow] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  const handleOpenEdit = (row) => setEditRow({ ...row });
  const handleCloseEdit = () => setEditRow(null);

  const handleEditChange = (field, value) => {
    setEditRow((prev) => ({
      ...prev,
      [field]:
        field === "name" || field === "hardwareSpecifications"
          ? value
          : Number(value),
    }));
  };

  const handleSaveEdit = async () => {
    try {
      setSaving(true);
      const originalProduct = products.find((p) => p.id === editRow.id);
      if (!originalProduct) return;

      const fullData = {
        ...originalProduct,
        name: editRow.name,
        price: editRow.price,
        sellingPrice: editRow.sellingPrice,
        hardwareSpecifications: editRow.hardwareSpecifications,
        quantityAvailable: editRow.quantityAvailable,
      };
      const { id, seller, ...updatedData } = fullData;
      await dispatch(editProduct({ id: editRow.id, updatedData })).unwrap();
      handleCloseEdit();
    } catch (error) {
      console.error("Failed to update product:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      setDeletingId(id);
      await dispatch(deleteProduct(id)).unwrap();
    } catch (err) {
      console.error("Failed to delete product:", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner />
      </div>
    );
  }
  if (!products || products.length === 0) {
    return (
      <MiniEmpty
        whatIsEmpty="No Products Found"
        WhatToDo="There's no products available yet. Please add some."
      />
    );
  }
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 900 }} aria-label="products table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Selling Price</StyledTableCell>
              <StyledTableCell align="right">
                Hardware Specifications
              </StyledTableCell>
              <StyledTableCell align="right">Stock</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>
                  <Avatar
                    src={row.image || "/placeholder.png"}
                    alt={row.name}
                    variant="rounded"
                  />
                </StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell align="right">${row.price}</StyledTableCell>
                <StyledTableCell align="right">
                  $
                  {row.sellingPrice && row.sellingPrice <= row.price
                    ? row.sellingPrice
                    : row.price}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Tooltip title={row.hardwareSpecifications || ""} arrow>
                    <span>
                      {row.hardwareSpecifications?.length > 30
                        ? `${row.hardwareSpecifications.slice(0, 30)}...`
                        : row.hardwareSpecifications}
                    </span>
                  </Tooltip>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.quantityAvailable}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenEdit(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteProduct(row.id)}
                      disabled={deletingId === row.id}
                    >
                      {deletingId === row.id ? "Removing..." : "Delete"}
                    </Button>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
                value={editRow.name}
                onChange={(e) => handleEditChange("name", e.target.value)}
                fullWidth
              />
              <TextField
                label="MRP"
                type="number"
                value={editRow.price}
                onChange={(e) => handleEditChange("price", e.target.value)}
                fullWidth
              />
              <TextField
                label="Selling Price"
                type="number"
                value={editRow.sellingPrice || ""}
                onChange={(e) =>
                  handleEditChange("sellingPrice", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="hardwareSpecifications"
                value={editRow.hardwareSpecifications}
                onChange={(e) =>
                  handleEditChange("hardwareSpecifications", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Stock"
                type="number"
                value={editRow.quantityAvailable}
                onChange={(e) =>
                  handleEditChange("quantityAvailable", e.target.value)
                }
                fullWidth
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} disabled={saving}>
            Cancel
          </Button>
          <Button
            disabled={saving}
            variant="contained"
            onClick={handleSaveEdit}
            color="primary"
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductsTable;
