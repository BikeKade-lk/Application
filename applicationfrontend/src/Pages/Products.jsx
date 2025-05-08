// src/Pages/Products.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Snackbar, Alert } from "@mui/material";
import axios from "axios";

// Import components
import AppHeader from "../components/products/AppHeader";
import SearchFilterBar from "../components/products/SearchFilterBar";
import ActiveFilters from "../components/products/ActiveFilters";
import FilterDrawer from "../components/products/FilterDrawer";
import ProductGrid from "../components/products/ProductGrid";
import ProductDetailsDialog from "../components/products/ProductDetailsDialog";
import { API_URL } from "../components/products/constants";

export default function Products() {
  // State for products and filtering
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    productType: "",
    brand: "",
    partType: "",
    bikeModel: "",
    priceRange: "",
  });
  const [page, setPage] = useState(1);
  const [productsPerPage] = useState(12);

  // State for product details dialog
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Functions
  function showAlert(message, severity = "info") {
    setAlertInfo({ open: true, message, severity });
  }

  function handleCloseAlert() {
    setAlertInfo((prev) => ({ ...prev, open: false }));
  }

  function handleDrawerToggle() {
    setDrawerOpen(!drawerOpen);
  }

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page when search changes
  }

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1); // Reset to first page when filter changes
  }

  function handleRemoveFilter(filterName) {
    setFilters((prev) => ({ ...prev, [filterName]: "" }));
    setPage(1); // Reset to first page
  }

  function clearFilters() {
    setFilters({
      productType: "",
      brand: "",
      partType: "",
      bikeModel: "",
      priceRange: "",
    });
    setSearchQuery("");
    setPage(1); // Reset to first page
  }

  function handlePageChange(event, value) {
    setPage(value);
    window.scrollTo(0, 0); // Scroll to top when page changes
  }

  function openProductDetails(product) {
    setSelectedProduct(product);
    setDetailsDialogOpen(true);
  }

  function closeProductDetails() {
    setDetailsDialogOpen(false);
  }

  async function fetchProducts() {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/getall`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      showAlert("Failed to load products. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  function filterProducts(products) {
    return products.filter((product) => {
      // Search query filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Product type filter
      if (filters.productType && product.productType !== filters.productType) {
        return false;
      }

      // Brand filter
      if (
        filters.brand &&
        (!product.brand || product.brand !== filters.brand)
      ) {
        return false;
      }

      // Part type filter
      if (
        filters.partType &&
        (!product.partType || product.partType !== filters.partType)
      ) {
        return false;
      }

      // Bike model filter
      if (
        filters.bikeModel &&
        (!product.bikeModel ||
          !product.bikeModel.includes(filters.bikeModel.toUpperCase()))
      ) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split("-").map(Number);
        const price = Number(product.price);
        if (price < min || price > max) {
          return false;
        }
      }

      return true;
    });
  }

  // Effect to fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter and paginate products
  const filteredProducts = filterProducts(products);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Header */}
      <AppHeader />

      {/* Filter Drawer */}
      <FilterDrawer
        open={drawerOpen}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClose={handleDrawerToggle}
        onClearFilters={clearFilters}
      />

      {/* Main Content */}
      <Box sx={{ p: 2 }}>
        {/* Search and Filter Bar */}
        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onFilterToggle={handleDrawerToggle}
        />

        {/* Active Filters Display */}
        <ActiveFilters 
          filters={filters} 
          onRemoveFilter={handleRemoveFilter} 
        />

        {/* Results Count */}
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          {filteredProducts.length} products found
        </Typography>

        {/* Product Grid with Pagination */}
        <ProductGrid
          loading={loading}
          filteredProducts={filteredProducts}
          paginatedProducts={paginatedProducts}
          page={page}
          productsPerPage={productsPerPage}
          onPageChange={handlePageChange}
          onClearFilters={clearFilters}
          onViewDetails={openProductDetails}
        />
      </Box>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={detailsDialogOpen}
        product={selectedProduct}
        onClose={closeProductDetails}
      />

      {/* Alert Snackbar */}
      <Snackbar
        open={alertInfo.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertInfo.severity}
          sx={{ width: '100%' }}
        >
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}