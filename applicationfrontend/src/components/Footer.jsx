import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  Divider,
  useTheme,
  Paper,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import logo from "../assets/logo.png";

export default function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Shop": [
      { name: "All Products", url: "/products" },
      { name: "New Arrivals", url: "/products/new" },
      { name: "Best Sellers", url: "/products/best-sellers" },
      { name: "Brands", url: "/brands" },
    ],
    "About": [
      { name: "Our Story", url: "/about" },
      { name: "Team", url: "/team" },
      { name: "Careers", url: "/careers" },
      { name: "Press", url: "/press" },
    ],
    "Support": [
      { name: "Contact Us", url: "/contact" },
      { name: "Shipping Policy", url: "/shipping" },
      { name: "Returns & Exchanges", url: "/returns" },
      { name: "FAQ", url: "/faq" },
    ],
  };

  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", pt: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <img
                src={logo}
                alt="BikeKade.lk Logo"
                style={{ height: "40px", marginRight: "10px" }}
              />
              <Typography variant="h6" color="text.primary" fontWeight={700}>
                BikeKade.lk
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              The ultimate destination for dirt bike enthusiasts in Sri Lanka.
              We connect buyers and sellers of high-quality dirt bike parts and accessories.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <IconButton
                aria-label="facebook"
                sx={{
                  mr: 1,
                  color: "#3b5998",
                  bgcolor: "rgba(59, 89, 152, 0.1)",
                  "&:hover": { bgcolor: "rgba(59, 89, 152, 0.2)" },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                aria-label="instagram"
                sx={{
                  mr: 1,
                  color: "#E1306C",
                  bgcolor: "rgba(225, 48, 108, 0.1)",
                  "&:hover": { bgcolor: "rgba(225, 48, 108, 0.2)" },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                aria-label="youtube"
                sx={{
                  mr: 1,
                  color: "#FF0000",
                  bgcolor: "rgba(255, 0, 0, 0.1)",
                  "&:hover": { bgcolor: "rgba(255, 0, 0, 0.2)" },
                }}
              >
                <YouTubeIcon />
              </IconButton>
              <IconButton
                aria-label="twitter"
                sx={{
                  color: "#1DA1F2",
                  bgcolor: "rgba(29, 161, 242, 0.1)",
                  "&:hover": { bgcolor: "rgba(29, 161, 242, 0.2)" },
                }}
              >
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid item xs={6} sm={4} md={2} key={category}>
              <Typography
                variant="subtitle1"
                color="text.primary"
                gutterBottom
                fontWeight={600}
              >
                {category}
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
                {links.map((link) => (
                  <Box component="li" key={link.name} sx={{ py: 0.5 }}>
                    <Link
                      component={RouterLink}
                      to={link.url}
                      underline="hover"
                      color="text.secondary"
                      sx={{
                        "&:hover": { color: theme.palette.primary.main },
                        transition: "color 0.2s",
                      }}
                    >
                      {link.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle1"
              color="text.primary"
              gutterBottom
              fontWeight={600}
            >
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Have questions? Reach out to us at:
            </Typography>
            <Typography variant="body2" color="text.primary" fontWeight={500}>
              support@bikekade.lk
            </Typography>
            <Typography variant="body2" color="text.primary" fontWeight={500} sx={{ mt: 1 }}>
              +94 11 234 5678
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              123 Main Street, Colombo 10, Sri Lanka
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            pb: 4,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: { xs: 2, sm: 0 } }}
          >
            © {currentYear} BikeKade.lk - All Rights Reserved
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Link
              component={RouterLink}
              to="/privacy"
              color="text.secondary"
              underline="hover"
            >
              Privacy Policy
            </Link>
            <Link
              component={RouterLink}
              to="/terms"
              color="text.secondary"
              underline="hover"
            >
              Terms of Service
            </Link>
            <Link
              component={RouterLink}
              to="/sitemap"
              color="text.secondary"
              underline="hover"
            >
              Sitemap
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}