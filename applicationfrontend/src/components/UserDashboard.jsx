import React, { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Button, Box,
  Grid, Card, CardMedia, CardContent, CardActions,
  TextField, InputAdornment, CircularProgress,
  Snackbar, Alert, Drawer, List, ListItem, ListItemText, ListItemIcon,
  Divider, FormControl, InputLabel, Select, MenuItem, Pagination,
  Chip
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  DirectionsBike as BikeIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import axios from 'axios';

export default function UserDashboard() {
  // State for products and filtering
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [alertInfo, setAlertInfo] = useState({ open: false, message: '', severity: 'info' });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    productType: '',
    brand: '',
    partType: '',
    bikeModel: '',
    priceRange: ''
  });
  const [page, setPage] = useState(1);
  const [productsPerPage] = useState(12);

  // Constants
  const API_URL = 'http://localhost:8080/product';
  const BRANDS = ['Yamaha', 'Honda', 'Kawasaki', 'Suzuki', 'KTM', 'Husqvarna'];
  const PART_TYPES = [
    'engine part',
    'body part',
    'electric part',
    'suspension',
    'brakes',
    'drivetrain',
    'wheels and tires',
    'exhaust system',
    'air intake',
    'cooling system',
    'fuel system',
    'controls and handlebars',
    'frame and chassis',
    'lighting',
    'protection accessories'
  ];
  const PRICE_RANGES = [
    { label: 'Any Price', value: '' },
    { label: 'Under Rs.5,000', value: '0-5000' },
    { label: 'Rs.5,000 - Rs.10,000', value: '5000-10000' },
    { label: 'Rs.10,000 - Rs.20,000', value: '10000-20000' },
    { label: 'Rs.20,000 - Rs.50,000', value: '20000-50000' },
    { label: 'Over Rs.50,000', value: '50000-999999' }
  ];

  // Functions
  function showAlert(message, severity = 'info') {
    setAlertInfo({ open: true, message, severity });
  }

  function handleCloseAlert() {
    setAlertInfo(prev => ({ ...prev, open: false }));
  }

  function handleDrawerToggle() {
    setDrawerOpen(!drawerOpen);
  }

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPage(1); // Reset to first page when filter changes
  }

  function clearFilters() {
    setFilters({
      productType: '',
      brand: '',
      partType: '',
      bikeModel: '',
      priceRange: ''
    });
    setSearchQuery('');
    setPage(1); // Reset to first page
  }

  function handlePageChange(event, value) {
    setPage(value);
    window.scrollTo(0, 0); // Scroll to top when page changes
  }

  async function fetchProducts() {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/getall`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      showAlert('Failed to load products. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  }

  function filterProducts(products) {
    return products.filter(product => {
      // Search query filter
      if (searchQuery && 
          !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Product type filter
      if (filters.productType && product.productType !== filters.productType) {
        return false;
      }
      
      // Brand filter (only for spare parts)
      if (filters.brand && (!product.brand || product.brand !== filters.brand)) {
        return false;
      }
      
      // Part type filter (only for spare parts)
      if (filters.partType && (!product.partType || product.partType !== filters.partType)) {
        return false;
      }
      
      // Bike model filter (only for spare parts)
      if (filters.bikeModel && (!product.bikeModel || !product.bikeModel.includes(filters.bikeModel.toUpperCase()))) {
        return false;
      }
      
      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
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
  
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  // Create the filter drawer content
  const filterDrawer = (
    <Box sx={{ width: 250, p: 2 }} role="presentation">
      <Typography variant="h6" sx={{ mb: 2 }}>
        Filter Products
      </Typography>
      <Divider sx={{ mb: 2 }} />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="product-type-label">Product Type</InputLabel>
          <Select
            labelId="product-type-label"
            name="productType"
            value={filters.productType}
            label="Product Type"
            onChange={handleFilterChange}
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
            onChange={handleFilterChange}
          >
            <MenuItem value="">All Brands</MenuItem>
            {BRANDS.map(brand => (
              <MenuItem key={brand} value={brand}>{brand}</MenuItem>
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
            onChange={handleFilterChange}
          >
            <MenuItem value="">All Part Types</MenuItem>
            {PART_TYPES.map(partType => (
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
          onChange={handleFilterChange}
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
            onChange={handleFilterChange}
          >
            {PRICE_RANGES.map(range => (
              <MenuItem key={range.value} value={range.value}>{range.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Button 
          variant="outlined" 
          onClick={clearFilters} 
          sx={{ mt: 2 }}
        >
          Clear Filters
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar - Simplified with only logo and name */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <BikeIcon sx={{ mr: 1 }} /> BikeKade.lk
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {filterDrawer}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ p: 2 }}>
        {/* Search and Filter Bar */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Search products..."
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
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
            onClick={handleDrawerToggle}
          >
            Filters
          </Button>
        </Box>

        {/* Active Filters Display */}
        {(filters.productType || filters.brand || filters.partType || filters.bikeModel || filters.priceRange) && (
          <Box sx={{ mb: 2, p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Active Filters:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {filters.productType && (
                <Chip 
                  label={`Type: ${filters.productType}`} 
                  onDelete={() => setFilters(prev => ({ ...prev, productType: '' }))} 
                  size="small" 
                />
              )}
              {filters.brand && (
                <Chip 
                  label={`Brand: ${filters.brand}`} 
                  onDelete={() => setFilters(prev => ({ ...prev, brand: '' }))} 
                  size="small" 
                />
              )}
              {filters.partType && (
                <Chip 
                  label={`Part Type: ${filters.partType}`} 
                  onDelete={() => setFilters(prev => ({ ...prev, partType: '' }))} 
                  size="small" 
                />
              )}
              {filters.bikeModel && (
                <Chip 
                  label={`Model: ${filters.bikeModel}`} 
                  onDelete={() => setFilters(prev => ({ ...prev, bikeModel: '' }))} 
                  size="small" 
                />
              )}
              {filters.priceRange && (
                <Chip 
                  label={`Price: ${PRICE_RANGES.find(r => r.value === filters.priceRange)?.label}`} 
                  onDelete={() => setFilters(prev => ({ ...prev, priceRange: '' }))} 
                  size="small" 
                />
              )}
            </Box>
          </Box>
        )}

        {/* Results Count */}
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          {filteredProducts.length} products found
        </Typography>

        {/* Loading Spinner */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Product Grid */}
        {!loading && filteredProducts.length === 0 ? (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Typography variant="h6">No products match your search criteria</Typography>
            <Button 
              variant="contained" 
              onClick={clearFilters} 
              sx={{ mt: 2 }}
            >
              Clear Filters
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {paginatedProducts.map(product => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={product.image || 'https://via.placeholder.com/300x160?text=No+Image'}
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x160?text=No+Image';
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>
                        Rs.{Number(product.price).toFixed(2)}
                      </Typography>
                      {product.productType === 'spare part' && (
                        <Chip 
                          label={product.productType} 
                          size="small" 
                          color="secondary"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {product.description?.length > 60
                        ? product.description.substring(0, 60) + '...'
                        : product.description || 'No description available'}
                    </Typography>
                    
                    {product.productType === 'spare part' && (
                      <Box sx={{ mt: 1 }}>
                        {product.brand && (
                          <Typography variant="body2">
                            <strong>Brand:</strong> {product.brand}
                          </Typography>
                        )}
                        {product.partType && (
                          <Typography variant="body2">
                            <strong>Type:</strong> {product.partType}
                          </Typography>
                        )}
                        {product.bikeModel && (
                          <Typography variant="body2">
                            <strong>Fits:</strong> {product.bikeModel}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      variant="contained" 
                      fullWidth
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        
        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Box>

      {/* Alert Snackbar */}
      <Snackbar
        open={alertInfo.open}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseAlert} severity={alertInfo.severity} sx={{ width: '100%' }}>
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}