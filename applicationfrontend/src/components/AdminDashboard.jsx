import React, { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Button, Box,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ImageIcon from '@mui/icons-material/Image';
import axios from 'axios';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: '', image: '', description: '', price: '' });
  const [imagePreview, setImagePreview] = useState(null);

  const API_URL = 'http://localhost:8080/product';

  // Fetch products on load
  const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/getall`);
    setProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open dialog for add/edit
  const handleOpen = (product = null) => {
    setEditingProduct(product);
    setForm(product || { name: '', image: '', description: '', price: '' });
    setImagePreview(product?.image || null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
    setImagePreview(null);
  };

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result }); // base64 string
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save or update product
  const handleSave = async () => {
    if (editingProduct) {
      await axios.put(`${API_URL}/update/${editingProduct.id}`, form);
    } else {
      await axios.post(`${API_URL}/add`, form);
    }
    handleClose();
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/delete/${id}`);
    fetchProducts();
  };

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
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    {product.image && (
                      <img src={product.image} alt="product" style={{ width: 60, height: 40, objectFit: 'cover' }} />
                    )}
                  </TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => handleOpen(product)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => handleDelete(product.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Dialog for Add/Edit */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth />
          <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} fullWidth />

          {/* Upload Image */}
          <Box>
            <Button variant="outlined" component="label" startIcon={<ImageIcon />}>
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
            {imagePreview && (
              <Box mt={2}>
                <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'contain' }} />
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
