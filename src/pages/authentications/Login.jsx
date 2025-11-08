import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { DocumentTitle } from "../../components/utils/DocumentTitle";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../utils/translations";
import LoadingModal from "../../components/utils/LoadingModal";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../utils/constants";

const Login = () => {
  const { login } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  DocumentTitle(translations[language].login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      navigate("/");
    } catch (err) {
      console.error("Error logging in", err.message);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingModal status={loading} />;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/images/cover.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Paper
        elevation={10}
        sx={{
          maxWidth: 400,
          p: 4,
          width: "calc(100% - 32px)",
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography
            component="h1"
            variant="h5"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            {translations[language].login}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              {error}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              type="email"
              label={translations[language].email}
              autoFocus
              required
              fullWidth
              size="small"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              label={translations[language].password}
              required
              fullWidth
              size="small"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="small"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {translations[language].login}
            </Button>

            {/* Links */}
            {/* <Grid container justifyContent="space-between">
              <Grid item>
                <Link href="#" variant="body2" color="text.secondary">
                  Forgot Password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" color="primary">
                  Sign Up
                </Link>
              </Grid>
            </Grid>*/}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
