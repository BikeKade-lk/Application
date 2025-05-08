// components/ProductFormDialog.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
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

export default function ProductFormDialog({ 
  open, 
  onClose, 
  onSave, 
  product, 
  loading 
}) {
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    productType: "accessory",
    brand: "",
    partType: "",
    bikeModel: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Reset form when dialog opens with a product or empty
  useEffect(() => {
    if (open) {
      if (product) {
        setForm({
          ...product,
          // Set default values for new fields if they don't exist
          productType: product.productType || "accessory",
          brand: product.brand || "",
          partType: product.partType || "",
          bikeModel: product.bikeModel || "",
        });
        setImagePreview(product.image || null);
      } else {
        setForm({
          name: "",
          image: "",
          description: "",
          price: "",
          productType: "accessory",
          brand: "",
          partType: "",
          bikeModel: "",
        });
        setImagePreview(null);
      }
      setValidationErrors({});
    }
  }, [open, product]);

  function handleChange(e) {
    const { name, value } = e.target;

    // Special handling for bikeModel - convert to uppercase and replace spaces with dashes
    if (name === "bikeModel") {
      const formattedValue = value.toUpperCase().replace(/\s+/g, "-");
      setForm((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }));
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      // Check file size - limit to 1MB
      if (file.size > 1024 * 1024) {
        // 1MB
        setValidationErrors(prev => ({ 
          ...prev, 
          image: "Image file is too large. Please use an image smaller than 1MB."
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result })); // base64 string
        setImagePreview(reader.result);
        setValidationErrors(prev => ({ ...prev, image: null }));
      };
      reader.readAsDataURL(file);
    }
  }

  function validateForm() {
    const errors = {};

    if (!form.name || form.name.trim() === "") {
      errors.name = "Product name is required";
    }

    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) {
      errors.price = "Price must be greater than zero";
    }

    // Validate spare part specific fields
    if (form.productType === "spare part") {
      if (!form.brand) {
        errors.brand = "Brand is required for spare parts";
      }

      if (!form.partType) {
        errors.partType = "Part type is required for spare parts";
      }

      if (!form.bikeModel) {
        errors.bikeModel = "Bike model is required for spare parts";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit() {
    if (validateForm()) {
      onSave(form);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {product ? "Edit Product" : "Add Product"}
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
            onChange={handleChange}
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
              error={!!validationErrors.brand}
            >
              <InputLabel id="brand-label">Brand</InputLabel>
              <Select
                labelId="brand-label"
                id="brand"
                name="brand"
                value={form.brand || ""}
                label="Brand"
                onChange={handleChange}
              >
                {BRANDS.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
              {validationErrors.brand && (
                <FormHelperText error>
                  {validationErrors.brand}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              margin="normal"
              required
              error={!!validationErrors.partType}
            >
              <InputLabel id="part-type-label">Part Type</InputLabel>
              <Select
                labelId="part-type-label"
                id="part-type"
                name="partType"
                value={form.partType || ""}
                label="Part Type"
                onChange={handleChange}
              >
                {PART_TYPES.map((partType) => (
                  <MenuItem key={partType} value={partType}>
                    {partType.charAt(0).toUpperCase() + partType.slice(1)}
                  </MenuItem>
                ))}
              </Select>
              {validationErrors.partType && (
                <FormHelperText error>
                  {validationErrors.partType}
                </FormHelperText>
              )}
            </FormControl>

            <TextField
              label="Bike Model"
              name="bikeModel"
              value={form.bikeModel || ""}
              onChange={handleChange}
              fullWidth
              required
              error={!!validationErrors.bikeModel}
              helperText={
                validationErrors.bikeModel ||
                "Use capital letters and hyphens only (no spaces)"
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
          onChange={handleChange}
          fullWidth
          required
          error={!!validationErrors.name}
          helperText={validationErrors.name || ""}
          margin="normal"
        />

        <TextField
          label="Description"
          name="description"
          value={form.description || ""}
          onChange={handleChange}
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
          onChange={handleChange}
          fullWidth
          required
          error={!!validationErrors.price}
          helperText={validationErrors.price || ""}
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
              onChange={handleImageChange}
            />
          </Button>
          <Typography
            variant="caption"
            display="block"
            sx={{ mt: 1, color: validationErrors.image ? "error.main" : "text.secondary" }}
          >
            {validationErrors.image || "Max file size: 1MB"}
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
                  setValidationErrors(prev => ({ 
                    ...prev, 
                    image: "Error loading image preview" 
                  }));
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
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}