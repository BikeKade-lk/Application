import React, { useState, useEffect } from "react";
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
  Chip,
  IconButton,
  Alert,
  Divider,
  InputAdornment,
  Stack
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

// Constants for dropdown options
const PRODUCT_TYPES = ["Accessory", "Spare Part"];
const BRANDS = ["Yamaha", "Honda", "Kawasaki", "Suzuki", "KTM", "Husqvarna", "Ducati", "BMW", "Triumph"];
const PART_TYPES = [
  "Engine Part",
  "Body Part",
  "Electric Part",
  "Suspension",
  "Brakes",
  "Drivetrain",
  "Wheels And Tires",
  "Exhaust System",
  "Air Intake",
  "Cooling System",
  "Fuel System",
  "Controls And Handlebars",
  "Frame And Chassis",
  "Lighting",
  "Protection Accessories",
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
  const [errors, setErrors] = useState({});
  const [tags, setTags] = useState(form.tags || []);
  const [newTag, setNewTag] = useState("");
  const [formValid, setFormValid] = useState(false);

  // Validate form on change
  useEffect(() => {
    const newErrors = {};
    
    // Basic validation
    if (!form.name) newErrors.name = "Name is required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) {
      newErrors.price = "Valid price is required";
    }
    
    // Spare Part specific validation
    if (form.productType === "Spare Part") {
      if (!form.brand) newErrors.brand = "Brand is required";
      if (!form.partType) newErrors.partType = "Part type is required";
      if (!form.bikeModel) newErrors.bikeModel = "Bike model is required";
    }
    
    setErrors(newErrors);
    setFormValid(Object.keys(newErrors).length === 0);
  }, [form]);

  // Handle tag operations
  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      
      // Update parent form state
      onChange({
        target: {
          name: "tags",
          value: updatedTags
        }
      });
      
      setNewTag("");
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    const updatedTags = tags.filter(tag => tag !== tagToDelete);
    setTags(updatedTags);
    
    // Update parent form state
    onChange({
      target: {
        name: "tags",
        value: updatedTags
      }
    });
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' && newTag) {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Handle inventory and stock
  const handleStockChange = (e) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(value) && parseInt(value) >= 0)) {
      onChange({
        target: {
          name: "stock",
          value: value === "" ? "" : parseInt(value)
        }
      });
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 5,
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid #e0e0e0',
        pb: 1
      }}>
        <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>
          {editingProduct ? "Edit Product" : "Add New Product"}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          {/* Product Type Selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="product-type-label">Product Type</InputLabel>
            <Select
              labelId="product-type-label"
              id="product-type"
              name="productType"
              value={form.productType || "Accessory"}
              label="Product Type"
              onChange={onChange}
            >
              {PRODUCT_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider sx={{ my: 1 }} />
          
          {/* Basic product information section */}
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            Basic Information
          </Typography>
          
          <TextField
            label="Product Name"
            name="name"
            value={form.name || ""}
            onChange={onChange}
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name || ""}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InventoryIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={form.price || ""}
              onChange={onChange}
              required
              error={!!errors.price}
              helperText={errors.price || ""}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalOfferIcon color="action" />
                    €
                  </InputAdornment>
                ),
                inputProps: { min: 0, step: 0.01 }
              }}
              sx={{ flex: 1 }}
            />
            
            <TextField
              label="Stock Quantity"
              name="stock"
              type="number"
              value={form.stock === undefined ? "" : form.stock}
              onChange={handleStockChange}
              margin="normal"
              InputProps={{
                inputProps: { min: 0 }
              }}
              sx={{ flex: 1 }}
            />
          </Box>

          <TextField
            label="Description"
            name="description"
            value={form.description || ""}
            onChange={onChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
            placeholder="Provide a detailed description of the product..."
          />

          {/* Spare Part Specific Fields */}
          {form.productType === "Spare Part" && (
            <>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                Spare Part Details
              </Typography>
              
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <FormControl
                  fullWidth
                  margin="normal"
                  required
                  error={!!errors.brand}
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
                  {errors.brand && <FormHelperText error>{errors.brand}</FormHelperText>}
                </FormControl>

                <FormControl
                  fullWidth
                  margin="normal"
                  required
                  error={!!errors.partType}
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
                        {partType}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.partType && <FormHelperText error>{errors.partType}</FormHelperText>}
                </FormControl>
              </Stack>

              <TextField
                label="Bike Model"
                name="bikeModel"
                value={form.bikeModel || ""}
                onChange={onChange}
                fullWidth
                required
                error={!!errors.bikeModel}
                helperText={errors.bikeModel || "Use capital letters and hyphens only (no spaces)"}
                margin="normal"
                inputProps={{
                  style: { textTransform: "uppercase" },
                }}
              />
            </>
          )}

          {/* Tags Input */}
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            Product Tags
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <TextField
              label="Add Tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleTagInputKeyPress}
              helperText="Press Enter or click Add to add a tag"
              sx={{ flex: 1 }}
            />
            <Button 
              variant="outlined" 
              onClick={handleAddTag} 
              sx={{ mt: 1, height: 40 }}
              startIcon={<AddIcon />}
              disabled={!newTag}
            >
              Add
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleDeleteTag(tag)}
                color="primary"
                variant="outlined"
              />
            ))}
            {tags.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No tags added yet
              </Typography>
            )}
          </Box>

          {/* Upload Image */}
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            Product Image
          </Typography>
          
          <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<ImageIcon />}
              sx={{ mb: 1 }}
            >
              {imagePreview ? "Change Image" : "Upload Image"}
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
              sx={{ color: "text.secondary" }}
            >
              Maximum file size: 1MB. Recommended size: 600x600px
            </Typography>
            
            {imagePreview ? (
              <Box 
                sx={{ 
                  mt: 2, 
                  border: '1px solid #e0e0e0', 
                  borderRadius: 1,
                  p: 1,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <img
                  src={imagePreview}
                  alt="Product preview"
                  style={{
                    width: '100%',
                    maxHeight: 250,
                    objectFit: "contain",
                  }}
                />
              </Box>
            ) : (
              <Box 
                sx={{ 
                  mt: 2, 
                  border: '1px dashed #c0c0c0', 
                  borderRadius: 1,
                  p: 4,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  No image uploaded
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #e0e0e0' }}>
        <Button onClick={onClose} disabled={loading} color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={onSave} 
          variant="contained" 
          disabled={loading || !formValid}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormDialog;