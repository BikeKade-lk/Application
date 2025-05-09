// src/components/products/ProductGrid.jsx
import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  CircularProgress,
  Pagination,
} from "@mui/material";
import ProductCard from "./ProductCard";

function ProductGrid({
  loading,
  filteredProducts,
  paginatedProducts,
  page,
  productsPerPage,
  onPageChange,
  onClearFilters,
  onViewDetails,
}) {
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h6">
          No products match your search criteria
        </Typography>
        <Button variant="contained" onClick={onClearFilters} sx={{ mt: 2 }}>
          Clear Filters
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {paginatedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} onViewDetails={onViewDetails} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={onPageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </>
  );
}

export default ProductGrid;
