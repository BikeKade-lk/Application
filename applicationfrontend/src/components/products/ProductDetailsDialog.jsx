// src/components/products/ProductDetailsDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import { formatDate } from "./constants";

function ProductDetailsDialog({ open, product, onClose }) {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{product.name}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img
              src={
                product.image ||
                "https://via.placeholder.com/600x400?text=No+Image"
              }
              alt={product.name}
              style={{ width: "100%", borderRadius: "8px" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/600x400?text=No+Image";
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" color="primary" gutterBottom>
              Rs.{Number(product.price).toFixed(2)}
            </Typography>

            {/* Product description */}
            <Typography variant="body1" paragraph>
              {product.description || "No description available"}
            </Typography>

            {/* Product specifications */}
            {(product.productType === "spare part" || product.productType === "accessory") && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Specifications
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">
                      Product Type:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">
                      {product.productType}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">
                      Brand:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">
                      {product.brand || "N/A"}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">
                      Part Type:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">
                      {product.partType || "N/A"}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">
                      Bike Model:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">
                      {product.bikeModel || "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Seller information */}
            <Box sx={{ mt: 3, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Seller Information
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PersonIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body1">
                  {product.user
                    ? `${product.user.fname} ${product.user.lname || ""}`
                    : "Unknown Seller"}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <HomeIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body1">
                  {product.user?.address || "No contact information"}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PhoneIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body1">
                  {product.user?.pno || "No contact information"}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CalendarIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body1">
                  Listed on: {formatDate(product.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {/* You could add more action buttons here, like "Contact Seller" or "Buy Now" */}
      </DialogActions>
    </Dialog>
  );
}

export default ProductDetailsDialog;