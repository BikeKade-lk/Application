import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  CircularProgress,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

// Constants for dropdown options
const PRODUCT_TYPES = ["accessory", "spare part"];
const BRANDS = ["Yamaha", "Honda", "Kawasaki", "Suzuki", "KTM", "Husqvarna"];
const PART_TYPES = [
  "engine part",
  "body part",
  "electric part",
  "suspension",
  "brakes",
  "drivetrain",
  "wheels and tires",
  "exhaust system",
  "air intake",
  "cooling system",
  "fuel system",
  "controls and handlebars",
  "frame and chassis",
  "lighting",
  "protection accessories",
];

const ProductFormDialog = ({
  open,
  onClose,
  form,
  onChange,
  onImageChange,
  onSave,
  editingProduct,
  imagePreview,
  loading,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editingProduct ? "Edit Product" : "Add Product"}
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        {/* Product Type Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="product-type-label">Product Type</InputLabel>
          <Select
            labelId="product-type-label"
            id="product-type"
            name="productType"
            value={form.productType || "accessory"}
            label="Product Type"
            onChange={onChange}
          >
            {PRODUCT_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Spare Part Specific Fields */}
        {form.productType === "spare part" && (
          <>
            <FormControl
              fullWidth
              margin="normal"
              required
              error={form.brand === ""}
            >
              <InputLabel id="brand-label">Brand</InputLabel>
              <Select
                labelId="brand-label"
                id="brand"
                name="brand"
                value={form.brand || ""}
                label="Brand"
                onChange={onChange}
              >
                {BRANDS.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
              {form.brand === "" && (
                <FormHelperText>
                  Brand is required for spare parts
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              margin="normal"
              required
              error={form.partType === ""}
            >
              <InputLabel id="part-type-label">Part Type</InputLabel>
              <Select
                labelId="part-type-label"
                id="part-type"
                name="partType"
                value={form.partType || ""}
                label="Part Type"
                onChange={onChange}
              >
                {PART_TYPES.map((partType) => (
                  <MenuItem key={partType} value={partType}>
                    {partType.charAt(0).toUpperCase() + partType.slice(1)}
                  </MenuItem>
                ))}
              </Select>
              {form.partType === "" && (
                <FormHelperText>
                  Part type is required for spare parts
                </FormHelperText>
              )}
            </FormControl>

            <TextField
              label="Bike Model"
              name="bikeModel"
              value={form.bikeModel || ""}
              onChange={onChange}
              fullWidth
              required
              error={form.bikeModel === ""}
              helperText={
                form.bikeModel === ""
                  ? "Bike model is required for spare parts"
                  : "Use capital letters and hyphens only (no spaces)"
              }
              margin="normal"
              inputProps={{
                style: { textTransform: "uppercase" },
              }}
            />
          </>
        )}

        {/* Standard Product Fields */}
        <TextField
          label="Name"
          name="name"
          value={form.name || ""}
          onChange={onChange}
          fullWidth
          required
          error={form.name === ""}
          helperText={form.name === "" ? "Name is required" : ""}
          margin="normal"
        />

        <TextField
          label="Description"
          name="description"
          value={form.description || ""}
          onChange={onChange}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />

        <TextField
          label="Price"
          name="price"
          type="number"
          value={form.price || ""}
          onChange={onChange}
          fullWidth
          required
          error={
            form.price !== "" &&
            (isNaN(Number(form.price)) || Number(form.price) <= 0)
          }
          helperText={
            form.price !== "" &&
            (isNaN(Number(form.price)) || Number(form.price) <= 0)
              ? "Price must be greater than zero"
              : ""
          }
          margin="normal"
          inputProps={{ min: 0, step: 0.01 }}
        />

        {/* Upload Image */}
        <Box mt={2}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<ImageIcon />}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={onImageChange}
            />
          </Button>
          <Typography
            variant="caption"
            display="block"
            sx={{ mt: 1, color: "text.secondary" }}
          >
            Max file size: 1MB
          </Typography>
          {imagePreview && (
            <Box mt={2}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: 200,
                  objectFit: "contain",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  // This would need to be handled by the parent component
                }}
              />
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={onSave} variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormDialog;