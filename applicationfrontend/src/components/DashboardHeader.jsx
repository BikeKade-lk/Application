import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const DashboardHeader = ({ user, onAddProduct, onLogout, onDeleteUser }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const formattedName = user.fullName
    ? user.fullName
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "User";

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    setAnchorEl(null);
  };

  const handleDeleteConfirm = async () => {
    setDeleteDialogOpen(false);
    if (onDeleteUser) {
      await onDeleteUser(user.id);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddProduct = () => {
    onAddProduct();
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: "0 4px 6px rgba(0,0,0,0.04)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 70 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DashboardIcon
                sx={{ mr: 1, color: theme.palette.primary.main }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                }}
              >
                Dashboard
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    mr: 2,
                    color: theme.palette.text.secondary,
                  }}
                >
                  Welcome, {formattedName}
                </Typography>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={onAddProduct}
                  startIcon={<AddRoundedIcon />}
                  sx={{
                    borderRadius: "20px",
                    px: 2,
                    fontWeight: 500,
                    borderWidth: "2px",
                    "&:hover": {
                      borderWidth: "2px",
                    },
                  }}
                >
                  Add Product
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteClick}
                  startIcon={<DeleteForeverIcon />}
                  sx={{
                    borderRadius: "20px",
                    px: 2,
                    fontWeight: 500,
                    borderWidth: "2px",
                    "&:hover": {
                      borderWidth: "2px",
                      bgcolor: "error.light",
                      color: "white",
                    },
                  }}
                >
                  Delete Account
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={onLogout}
                  startIcon={<ExitToAppRoundedIcon />}
                  sx={{
                    borderRadius: "20px",
                    px: 2,
                    fontWeight: 500,
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    "&:hover": {
                      boxShadow: "0 6px 10px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  Logout
                </Button>
              </Box>
            )}

            {isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: theme.palette.text.secondary,
                    mr: 1,
                  }}
                >
                  {formattedName}
                </Typography>
                <IconButton
                  color="primary"
                  onClick={handleMenuClick}
                  size="large"
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          },
        }}
      >
        <MenuItem onClick={handleAddProduct}>
          <ListItemIcon>
            <AddRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add Product</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>
            <Typography color="error">Delete Account</Typography>
          </ListItemText>
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DeleteForeverIcon color="error" />
          <Typography variant="h6" component="span">
            Delete Account
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be
            undone. All your data, including products and personal information,
            will be permanently removed.
          </DialogContentText>
          <Box sx={{ mt: 2, p: 2, bgcolor: "error.light", borderRadius: 1 }}>
            <Typography variant="body2" color="error.dark" fontWeight={500}>
              ⚠️ This will permanently delete:
            </Typography>
            <Typography variant="body2" color="error.dark" sx={{ mt: 1 }}>
              • Your account and profile information
              <br />
              • All your products and data
              <br />• Access to this dashboard
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DashboardHeader;
