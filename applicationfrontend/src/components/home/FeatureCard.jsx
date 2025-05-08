import React from "react";
import { Paper, Typography } from "@mui/material";

export default function FeatureCard({ title, description }) {
  return (
    <Paper elevation={2} sx={{ p: 3, width: 240 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2">
        {description}
      </Typography>
    </Paper>
  );
}