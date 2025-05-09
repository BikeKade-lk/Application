// src/components/products/ActiveFilters.jsx
import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { PRICE_RANGES } from "./Constants";

function ActiveFilters({ filters, onRemoveFilter }) {
  const hasActiveFilters =
    filters.productType ||
    filters.brand ||
    filters.partType ||
    filters.bikeModel ||
    filters.priceRange;

  if (!hasActiveFilters) return null;

  return (
    <Box sx={{ mb: 2, p: 1, bgcolor: "background.paper", borderRadius: 1 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Active Filters:
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {filters.productType && (
          <Chip
            label={`Type: ${filters.productType}`}
            onDelete={() => onRemoveFilter("productType")}
            size="small"
          />
        )}
        {filters.brand && (
          <Chip
            label={`Brand: ${filters.brand}`}
            onDelete={() => onRemoveFilter("brand")}
            size="small"
          />
        )}
        {filters.partType && (
          <Chip
            label={`Part Type: ${filters.partType}`}
            onDelete={() => onRemoveFilter("partType")}
            size="small"
          />
        )}
        {filters.bikeModel && (
          <Chip
            label={`Model: ${filters.bikeModel}`}
            onDelete={() => onRemoveFilter("bikeModel")}
            size="small"
          />
        )}
        {filters.priceRange && (
          <Chip
            label={`Price: ${
              PRICE_RANGES.find((r) => r.value === filters.priceRange)?.label
            }`}
            onDelete={() => onRemoveFilter("priceRange")}
            size="small"
          />
        )}
      </Box>
    </Box>
  );
}

export default ActiveFilters;
