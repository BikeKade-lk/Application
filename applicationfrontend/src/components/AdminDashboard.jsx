import React, { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Button, Box,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Snackbar, Alert, CircularProgress
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ImageIcon from '@mui/icons-material/Image';
import axios from 'axios';

export default function AdminDashboard() {
  // Define state first
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: '', image: '', description: '', price: '' });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ open: false, message: '', severity: 'info' });

  // API endpoint
  const API_URL = 'http://localhost:8080/product';

  // Define all functions before use
  function showAlert(message, severity = 'info') {
    setAlertInfo({ open: true, message, severity });
  }

  function handleCloseAlert() {
    setAlertInfo(prev => ({ ...prev, open: false }));
  }

  function handleOpen(product = null) {
    if (product) {
      setEditingProduct(product);
      setForm({ ...product });
      setImagePreview(product.image || null);
    } else {
      setEditingProduct(null);
      setForm({ name: '', image: '', description: '', price: '' });
      setImagePreview(null);
    }
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setEditingProduct(null);
    setImagePreview(null);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      // Check file size - limit to 1MB
      if (file.size > 1024 * 1024) { // 1MB
        showAlert('Image file is too large. Please use an image smaller than 1MB.', 'warning');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, image: reader.result })); // base64 string
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function validateForm() {
    if (!form.name || form.name.trim() === '') {
      showAlert('Product name is required', 'error');
      return false;
    }
    
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) {
      showAlert('Price must be greater than zero', 'error');
      return false;
    }
    
    return true;
  }

  async function handleSave() {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      if (editingProduct) {
        await axios.put(`${API_URL}/update/${editingProduct.id}`, form);
        showAlert('Product updated successfully', 'success');
      } else {
        await axios.post(`${API_URL}/add`, form);
        showAlert('Product added successfully', 'success');
      }
      handleClose();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      showAlert(
        error.response?.data?.message || 'Failed to save product. Please try again.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      showAlert('Product deleted successfully', 'success');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      showAlert('Failed to delete product. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
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

  // Effects
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={() => handleOpen()}>Add Product</Button>
        </Toolbar>
      </AppBar>

      {/* Loading Indicator */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Product Table */}
      <Box sx={{ p: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    {loading ? 'Loading...' : 'No products found'}
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          style={{ width: 60, height: 40, objectFit: 'cover' }} 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/60x40?text=Error';
                          }}
                        />
                      ) : (
                        <Box sx={{ width: 60, height: 40, bgcolor: 'grey.300', display: 'flex', 
                              alignItems: 'center', justifyContent: 'center' }}>
                          No img
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>
                      {product.description ? 
                        (product.description.length > 50 ? 
                          product.description.substring(0, 50) + '...' : 
                          product.description) : 
                        'No description'}
                    </TableCell>
                    <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => handleOpen(product)}>Edit</Button>
                      <Button size="small" color="error" onClick={() => handleDelete(product.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Dialog for Add/Edit */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField 
            label="Name" 
            name="name" 
            value={form.name || ''} 
            onChange={handleChange} 
            fullWidth 
            required
            error={form.name === ''}
            helperText={form.name === '' ? "Name is required" : ""}
            margin="normal"
          />
          
          <TextField 
            label="Description" 
            name="description" 
            value={form.description || ''} 
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
            value={form.price || ''} 
            onChange={handleChange} 
            fullWidth 
            required
            error={form.price !== '' && (isNaN(Number(form.price)) || Number(form.price) <= 0)}
            helperText={form.price !== '' && (isNaN(Number(form.price)) || Number(form.price) <= 0) ? "Price must be greater than zero" : ""}
            margin="normal"
            inputProps={{ min: 0, step: 0.01 }}
          />

          {/* Upload Image */}
          <Box mt={2}>
            <Button variant="outlined" component="label" startIcon={<ImageIcon />}>
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
            <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
              Max file size: 1MB
            </Typography>
            {imagePreview && (
              <Box mt={2}>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{ width: '100%', maxHeight: 200, objectFit: 'contain' }} 
                  onError={(e) => {
                    e.target.onerror = null;
                    showAlert('Error loading image preview', 'error');
                  }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>Cancel</Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert Snackbar */}
      <Snackbar 
        open={alertInfo.open} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alertInfo.severity} sx={{ width: '100%' }}>
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}