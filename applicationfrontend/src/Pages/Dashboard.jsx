// Dashboard.jsx - Main Component
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

// Import components
import DashboardAppBar from "../components/dashboard/DashboardAppBar";
import ProductTable from "../components/dashboard/ProductTable";
import ProductFormDialog from "../components/dashboard/ProductFormDialog";

// API endpoint
const API_URL = "http://localhost:8080/product";

export default function Dashboard() {
  const navigate = useNavigate();
  // Define state for user
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Load user info on component mount
  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (!userInfo) {
      // Redirect to login if no user info exists
      navigate("/signin");
      return;
    }
    
    const parsedUser = JSON.parse(userInfo);
    setUser(parsedUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // Fetch products when user changes
  useEffect(() => {
    if (user) {
      fetchUserProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function showAlert(message, severity = "info") {
    setAlertInfo({ open: true, message, severity });
  }

  function handleCloseAlert() {
    setAlertInfo((prev) => ({ ...prev, open: false }));
  }

  function handleOpen(product = null) {
    setEditingProduct(product);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setEditingProduct(null);
  }

  async function handleSave(formData) {
    setLoading(true);
    try {
      if (editingProduct) {
        // Add userId parameter to ensure ownership check
        await axios.put(`${API_URL}/update/${editingProduct.id}?userId=${user.id}`, formData);
        showAlert("Product updated successfully", "success");
      } else {
        // Use the user/{username}/add endpoint to associate the product with the user
        await axios.post(`${API_URL}/user/${user.username}/add`, formData);
        showAlert("Product added successfully", "success");
      }
      handleClose();
      fetchUserProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      showAlert(
        error.response?.data?.message ||
          "Failed to save product. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    setLoading(true);
    try {
      // Add userId parameter to ensure ownership check
      await axios.delete(`${API_URL}/delete/${id}?userId=${user.id}`);
      showAlert("Product deleted successfully", "success");
      fetchUserProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      showAlert("Failed to delete product. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserProducts() {
    if (!user) return;
    
    setLoading(true);
    try {
      // Use the user/name/{username} endpoint to get products for this user
      const response = await axios.get(`${API_URL}/user/name/${user.username}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      showAlert("Failed to load products. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/signin");
  }

  // Display loading while checking auth
  if (!user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <DashboardAppBar 
        user={user}
        onAddProduct={() => handleOpen()} 
        onLogout={handleLogout} 
      />

      {/* Loading Indicator */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Product Table */}
      <ProductTable 
        products={products} 
        loading={loading} 
        onEdit={handleOpen} 
        onDelete={handleDelete} 
      />

      {/* Dialog for Add/Edit */}
      <ProductFormDialog
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        product={editingProduct}
        loading={loading}
      />

      {/* Alert Snackbar */}
      <Snackbar
        open={alertInfo.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertInfo.severity}
          sx={{ width: "100%" }}
        >
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}