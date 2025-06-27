import {
  Box,
  Button,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  updateCategory,
} from "../../../State/customer/categorySlice";

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

function ShopByCategory() {
  const dispatch = useDispatch();
  const { list: categories } = useSelector((state) => state.categories);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditValues({ ...categories[index] });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditValues({});
  };

  const handleChange = (field, value) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const { id, name, description, image } = editValues;
      const result = await dispatch(
        updateCategory({
          id,
          data: {
            name: name.trim(),
            description: description.trim(),
            image, // Not editable but preserved in update
          },
        })
      );
      if (updateCategory.fulfilled.match(result)) {
        setSnackbar({
          open: true,
          message: "Category updated successfully!",
          severity: "success",
        });
        setEditingIndex(null);
        setEditValues({});
        setTimeout(() => dispatch(fetchCategories()), 300);
      } else {
        setSnackbar({
          open: true,
          message: result.payload || "Update failed.",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Something went wrong.",
        severity: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 900 }} aria-label="category table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((cat, index) => (
              <StyledTableRow key={cat.id}>
                <StyledTableCell>{cat.id}</StyledTableCell>
                <StyledTableCell align="center">
                  <img
                    src={cat.image}
                    alt="Category"
                    width={60}
                    style={{ borderRadius: 4 }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  {editingIndex === index ? (
                    <TextField
                      size="small"
                      value={editValues.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  ) : (
                    cat.name
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {editingIndex === index ? (
                    <TextField
                      size="small"
                      multiline
                      rows={2}
                      value={editValues.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                    />
                  ) : (
                    cat.description
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {editingIndex === index ? (
                    <Box display="flex" gap={1} justifyContent="center">
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={handleSave}
                        disabled={isSaving}
                      >
                        {isSaving ? "Saving..." : "Save"}
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleEditClick(index)}
                    >
                      Change
                    </Button>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={handleSnackbarClose}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ShopByCategory;
