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
  Divider,
  IconButton,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import { formatDate } from "./Constants";

function capitalizeSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/) // Split on sentence-ending punctuation
    .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1))
    .join(" ");
}

// ...imports remain the same

function ProductDetailsDialog({ open, product, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  if (!product) return null;
  
  const capitalizedName = product.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
        }
      }}
      fullScreen={isMobile}
    >
      <DialogTitle sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            {capitalizedName}
          </Typography>
          <IconButton 
            onClick={onClose}
            sx={{
              bgcolor: 'rgba(0,0,0,0.05)',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.1)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0, pb: 0, bgcolor: '#f8f9fa' }}>
        <Grid container>
          <Grid item xs={12} md={6} sx={{ 
            p: 0, 
            position: 'relative',
            bgcolor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxHeight: { xs: 'auto', md: '500px' },
            overflow: 'hidden'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/600x400?text=No+Image"
                }
                alt={capitalizedName}
                style={{ 
                  width: "100%", 
                  height: "100%",
                  objectFit: "contain",
                  maxHeight: "500px"
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/600x400?text=No+Image";
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ p: 3 }}>
            {/* Price */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h4" color="primary" fontWeight={700}>
                Rs.{Number(product.price).toFixed(2)}
              </Typography>
            </Box>

            {/* Description */}
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Description
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description
                ? capitalizeSentences(product.description)
                : "No description available"}
            </Typography>

            {/* Specifications */}
            {(product.productType === "Spare Part" ||
              product.productType === "Accessory") && (
              <Box sx={{ my: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Specifications
                </Typography>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.02)' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={5}><Typography variant="body2" color="text.secondary">Product Type:</Typography></Grid>
                    <Grid item xs={7}><Typography variant="body2" fontWeight={500}>{product.productType}</Typography></Grid>

                    <Grid item xs={5}><Typography variant="body2" color="text.secondary">Brand:</Typography></Grid>
                    <Grid item xs={7}><Typography variant="body2" fontWeight={500}>{product.brand || "N/A"}</Typography></Grid>

                    <Grid item xs={5}><Typography variant="body2" color="text.secondary">Part Type:</Typography></Grid>
                    <Grid item xs={7}><Typography variant="body2" fontWeight={500}>{product.partType || "N/A"}</Typography></Grid>

                    <Grid item xs={5}><Typography variant="body2" color="text.secondary">Bike Model:</Typography></Grid>
                    <Grid item xs={7}><Typography variant="body2" fontWeight={500}>{product.bikeModel || "N/A"}</Typography></Grid>
                  </Grid>
                </Paper>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Seller Info */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Seller Information
              </Typography>
              
              <Paper elevation={1} sx={{ p: 2, borderRadius: 2, bgcolor: 'white' }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <PersonIcon sx={{ mr: 1.5, color: "text.secondary", fontSize: 20 }} />
                  <Typography variant="body1" fontWeight={600}>
                    {product.user
                      ? `${product.user.fname
                          .split(" ")
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")} ${product.user.lname
                            .split(" ")
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ") || ""}`
                      : "Unknown Seller"}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Stack spacing={1.5} sx={{ mt: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <HomeIcon sx={{ mr: 1.5, color: "text.secondary", fontSize: 20 }} />
                    <Typography variant="body2">
                      {product.user?.address
                        ? product.user.address
                            .split(" ")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")
                        : "No address provided"}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PhoneIcon sx={{ mr: 1.5, color: "text.secondary", fontSize: 20 }} />
                    <Typography variant="body2">
                      {product.user?.pno || "No contact number provided"}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarIcon sx={{ mr: 1.5, color: "text.secondary", fontSize: 20 }} />
                    <Typography variant="body2">
                      Listed on: {formatDate(product.createdAt)}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, bgcolor: '#f8f9fa' }}>
        <Button onClick={onClose} sx={{ fontWeight: 500 }}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductDetailsDialog;
