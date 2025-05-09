import React from "react";
import { Snackbar, Alert } from "@mui/material";

const CustomAlert = ({ alertInfo, onClose }) => {
  return (
    <Snackbar
      open={alertInfo.open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={alertInfo.severity}
        sx={{ width: "100%" }}
      >
        {alertInfo.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
