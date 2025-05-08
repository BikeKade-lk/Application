// components/ProductTable.jsx
import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

export default function ProductTable({ products, loading, onEdit, onDelete }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Your Products
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  {loading ? "Loading..." : "No products found. Add your first product!"}
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
                        style={{ width: 60, height: 40, objectFit: "cover" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/60x40?text=Error";
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 60,
                          height: 40,
                          bgcolor: "grey.300",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        No img
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    {product.description
                      ? product.description.length > 50
                        ? product.description.substring(0, 50) + "..."
                        : product.description
                      : "No description"}
                  </TableCell>
                  <TableCell>Rs.{Number(product.price).toFixed(2)}</TableCell>
                  <TableCell>{product.productType || "accessory"}</TableCell>
                  <TableCell>
                    {product.productType === "spare part" ? (
                      <>
                        {product.brand && (
                          <div>
                            <strong>Brand:</strong> {product.brand}
                          </div>
                        )}
                        {product.partType && (
                          <div>
                            <strong>Part Type:</strong> {product.partType}
                          </div>
                        )}
                        {product.bikeModel && (
                          <div>
                            <strong>Model:</strong> {product.bikeModel}
                          </div>
                        )}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => onEdit(product)}>
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => onDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}