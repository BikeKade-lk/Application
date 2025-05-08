import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "primary.main",
        color: "white",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} BikeKade.lk - All Rights Reserved
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          The ultimate destination for motorcycle enthusiasts
        </Typography>
      </Container>
    </Box>
  );
}