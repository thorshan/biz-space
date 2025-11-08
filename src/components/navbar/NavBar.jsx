import {
  Box,
  Typography,
  Stack,
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import LanguageToggler from "../../components/utils/LangToggler";
import { useColorMode } from "../../contexts/ThemeContext";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const NavBar = () => {
  const { user } = useAuth();
  const { toggleColorMode } = useColorMode();
  const theme = useTheme();
  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        bgcolor: "inherit",
        zIndex: (t) => t.zIndex.drawer + 1,
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" color="primary">
          BizSpace
        </Typography>
        <Stack direction={"row"} spacing={3}>
          <Box>
            <LanguageToggler />
            {/* Dark Mode Toggle */}
            <IconButton onClick={toggleColorMode} color="primary">
              {theme.palette.mode === "dark" ? (
                <Brightness7 />
              ) : (
                <Brightness4 />
              )}
            </IconButton>
          </Box>
          <Avatar
            alt="User"
            src={null}
            sx={{
              bgcolor: "primary.main",
              color: "primary",
              width: 36,
              height: 36,
            }}
          >
            {user.name[0].toUpperCase()}
          </Avatar>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
