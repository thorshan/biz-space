import { Modal, Box, Typography, CircularProgress } from "@mui/material";
import { translations } from "../../utils/translations";
import { useLanguage } from "../../contexts/LanguageContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  zIndex: 100,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  outline: "none",
  borderRadius: 2, // Modern rounded corners
};

function LoadingModal({ status }) {
  const { language } = useLanguage();

  return (
    <Modal
      open={status}
      disableEscapeKeyDown
      aria-labelledby="loading-modal-title"
      aria-describedby="loading-modal-description"
    >
      <Box sx={style}>
        <CircularProgress color="primary" sx={{ mb: 2 }} />
        <Typography
          id="loading-modal-title"
          variant="h6"
          component="h2"
          sx={{ fontWeight: "bold" }}
        >
          {translations[language].loading}
        </Typography>
        <Typography
          id="loading-modal-description"
          sx={{ mt: 1, fontSize: 14, color: "text.secondary" }}
        >
          {translations[language].wait_moment}
        </Typography>
      </Box>
    </Modal>
  );
}

export default LoadingModal;
