import { Dashboard, People, Workspaces } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Settings, Logout } from "@mui/icons-material";
import { ROLES } from "../../utils/constants";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../utils/translations";
import { useAuth } from "../../contexts/AuthContext";

const drawerWidth = 220;

const SideBar = () => {
  const { language } = useLanguage();
  const { user, logout } = useAuth();
  const menu = [
    {
      text: translations[language].dashboard,
      icon: <Dashboard />,
      path: "/admin/dashboard",
      roles: [ROLES.S_ADMIN],
    },
    {
      text: translations[language].spaces,
      icon: <Workspaces />,
      path: "/admin/work-spaces",
      roles: [ROLES.S_ADMIN],
    },
    {
      text: translations[language].user,
      icon: <People />,
      path: "/admin/users",
      roles: [ROLES.S_ADMIN],
    },
    {
      text: translations[language].settings,
      icon: <Settings />,
      path: "/admin/setting",
      roles: [ROLES.S_ADMIN],
    },
  ];
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          bgcolor: "inherit",
          // border: "1px solid primary",
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      {/* User Info */}
      <Box
        sx={{
          px: 2,
          py: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar sx={{ width: 35, height: 35, bgcolor: "primary.main" }}>
            {user.name[0].toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="subtitle1">{user?.name || "Name"}</Typography>
            <Typography variant="caption" color="primary">
              {translations[language].role} ・{" "}
              {user?.role.toUpperCase() || "Admin"}
            </Typography>
          </Box>
        </Box>

        <List>
          {menu
            .filter((i) => i.roles.includes(user.role))
            .map((link, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton href={link.path}>
                  <ListItemIcon sx={{ color: "primary.main" }}>
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText primary={link.text} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          startIcon={<Logout />}
          fullWidth
          variant="outlined"
          size="small"
          onClick={logout}
        >
          {translations[language].logout}
        </Button>
      </Box>
    </Drawer>
  );
};
export default SideBar;
