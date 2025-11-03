import { Alert } from "@mui/material";
import { useState } from "react";

const AlertModal = ({ type, message }) => {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <Alert
      severity={type}
      onClose={() => setOpen(false)}
      sx={{
        position: "fixed",
        top: 20,
        left: 20,
        zIndex: 1300,
        minWidth: 500,
      }}
    >
      {message}
    </Alert>
  );
};
export default AlertModal;
