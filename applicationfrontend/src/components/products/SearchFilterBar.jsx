// src/components/products/SearchFilterBar.jsx
import React from "react";
import { Box, TextField, Button, InputAdornment } from "@mui/material";
import { Search as SearchIcon, FilterList as FilterIcon } from "@mui/icons-material";

function SearchFilterBar({ searchQuery, onSearchChange, onFilterToggle }) {
  return (
    <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
      <TextField
        variant="outlined"
        placeholder="Search products..."
        fullWidth
        value={searchQuery}
        onChange={onSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        size="small"
      />

      <Button
        variant="outlined"
        startIcon={<FilterIcon />}
        onClick={onFilterToggle}
      >
        Filters
      </Button>
    </Box>
  );
}

export default SearchFilterBar;
