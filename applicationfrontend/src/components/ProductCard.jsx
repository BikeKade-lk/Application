// src/components/products/ProductCard.jsx
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";

function capitalizeSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/) // split on sentence boundaries
    .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1))
    .join(" ");
}

function ProductCard({ product, onViewDetails }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={
          product.image || "https://via.placeholder.com/300x160?text=No+Image"
        }
        alt={product.name
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/300x160?text=No+Image";
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div">
          {product.name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography
            variant="subtitle1"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Rs.{Number(product.price).toFixed(2)}
          </Typography>
          {product.productType && (
            <Chip
              label={product.productType}
              size="small"
              color="secondary"
              sx={{ ml: 1 }}
            />
          )}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {product.description
            ? product.description.length > 60
              ? capitalizeSentences(product.description.substring(0, 60)) +
                "..."
              : capitalizeSentences(product.description)
            : "No description available"}
        </Typography>

        {product.productType === "spare part" && (
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
          onClick={() => onViewDetails(product)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
