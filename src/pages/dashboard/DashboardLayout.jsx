import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/sidebar/SideBar";
import NavBar from "../../components/navbar/NavBar";

export default function DashboardLayout() {
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
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        {/*  Nested routes will render here */}
        <Outlet />
      </Box>
    </Box>
  );
}
