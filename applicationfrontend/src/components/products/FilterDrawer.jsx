// src/components/products/FilterDrawer.jsx
import React from "react";
import {
  Box,
  Drawer,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { BRANDS, PART_TYPES, PRICE_RANGES } from "./constants";

function FilterDrawer({ open, filters, onFilterChange, onClose, onClearFilters }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 250, p: 2 }} role="presentation">
        <Typography variant="h6" sx={{ mb: 2 }}>
          Filter Products
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="product-type-label">Product Type</InputLabel>
            <Select
              labelId="product-type-label"
              name="productType"
              value={filters.productType}
              label="Product Type"
              onChange={onFilterChange}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="accessory">Accessory</MenuItem>
              <MenuItem value="spare part">Spare Part</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="brand-label">Brand</InputLabel>
            <Select
              labelId="brand-label"
              name="brand"
              value={filters.brand}
              label="Brand"
              onChange={onFilterChange}
            >
              <MenuItem value="">All Brands</MenuItem>
              {BRANDS.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="part-type-label">Part Type</InputLabel>
            <Select
              labelId="part-type-label"
              name="partType"
              value={filters.partType}
              label="Part Type"
              onChange={onFilterChange}
            >
              <MenuItem value="">All Part Types</MenuItem>
              {PART_TYPES.map((partType) => (
                <MenuItem key={partType} value={partType}>
                  {partType.charAt(0).toUpperCase() + partType.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Bike Model"
            name="bikeModel"
            value={filters.bikeModel}
            onChange={onFilterChange}
            fullWidth
            size="small"
          />

          <FormControl fullWidth size="small">
            <InputLabel id="price-range-label">Price Range</InputLabel>
            <Select
              labelId="price-range-label"
              name="priceRange"
              value={filters.priceRange}
              label="Price Range"
              onChange={onFilterChange}
            >
              {PRICE_RANGES.map((range) => (
                <MenuItem key={range.value} value={range.value}>
                  {range.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="outlined" onClick={onClearFilters} sx={{ mt: 2 }}>
            Clear Filters
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default FilterDrawer;