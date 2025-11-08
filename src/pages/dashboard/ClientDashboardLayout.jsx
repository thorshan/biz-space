import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import ClientSideBar from "../../components/sidebar/ClientSideBar";
import NavBar from "../../components/navbar/NavBar";

export default function ClientDashboardLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <CssBaseline />
      <NavBar />
      <ClientSideBar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        {/*  Nested routes will render here */}
        <Outlet />
      </Box>
    </Box>
  );
}
