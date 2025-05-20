import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

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

const initialRows = [
  {
    no: 1,
    id: 101,
    image: "https://via.placeholder.com/60",
    category: "Electronics",
    name: "Smartphones",
  },
  {
    no: 2,
    id: 102,
    image: "https://via.placeholder.com/60",
    category: "Clothing",
    name: "Men’s Jackets",
  },
];

const categoryOptions = ["Electronics", "Clothing", "Home", "Books", "Toys"];

function ShopByCategory() {
  const [rows, setRows] = useState(initialRows);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditValues({ ...rows[index] });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditValues({});
  };

  const handleSave = () => {
    const updated = [...rows];
    updated[editingIndex] = { ...editValues };
    setRows(updated);
    setEditingIndex(null);
  };

  const handleChange = (field, value) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleChange("image", imageUrl);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table sx={{ minWidth: 900 }} aria-label="category table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="center">Image</StyledTableCell>
            <StyledTableCell align="center">Category</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>
                {editingIndex === index ? (
                  <TextField
                    size="small"
                    value={editValues.no}
                    onChange={(e) => handleChange("no", e.target.value)}
                  />
                ) : (
                  row.no
                )}
              </StyledTableCell>
              <StyledTableCell>
                {editingIndex === index ? (
                  <TextField
                    size="small"
                    value={editValues.id}
                    onChange={(e) => handleChange("id", e.target.value)}
                  />
                ) : (
                  row.id
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {editingIndex === index ? (
                  <Box>
                    <img
                      src={editValues.image}
                      alt="Preview"
                      width={60}
                      style={{ marginBottom: 8, borderRadius: 4 }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Box>
                ) : (
                  <img
                    src={row.image}
                    alt="Category"
                    width={60}
                    style={{ borderRadius: 4 }}
                  />
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {editingIndex === index ? (
                  <FormControl size="small" fullWidth>
                    <Select
                      value={editValues.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                    >
                      {categoryOptions.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  row.category
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {editingIndex === index ? (
                  <TextField
                    size="small"
                    value={editValues.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                ) : (
                  row.name
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
                    >
                      Save
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
  );
}

export default ShopByCategory;
