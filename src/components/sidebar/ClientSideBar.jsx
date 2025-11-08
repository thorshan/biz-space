import { Logout, ExpandLess, ExpandMore } from "@mui/icons-material";
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
  Collapse,
} from "@mui/material";
import { ROLES } from "../../utils/constants";
import { FUNCTION_ROUTES } from "../../utils/constants";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../utils/translations";
import { useAuth } from "../../contexts/AuthContext";
import { workspaceApi } from "../../api/workspaceApi";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const drawerWidth = 250;

const functionKeyMap = {
  "User Management": "USER_MANAGEMENT",
  "HR Management": "HR_MANAGEMENT",
  "Finance Tracking": "FINANCE_TRACKING",
  "Client CRM": "CLIENT_CRM",
  "Project Scheduling": "PROJECT_SCHEDULING",
  "Reporting & Analytics": "REPORTING_ANALYTICS",
  "Marketing Automation": "MARKETING_AUTOMATION",
  "Inventory Control": "INVENTORY_CONTROL",
};

const ClientSideBar = () => {
  const { language } = useLanguage();
  const { user, logout } = useAuth();
  const [space, setSpace] = useState([]);
  const [open, setOpen] = useState({});
  const location = useLocation();

  const fetchSpace = async () => {
    try {
      const res = await workspaceApi.getSpaceByUser(user?.id);
      console.log(res.data);
      setSpace(res.data);
    } catch (err) {
      console.error("Error fetching data", err.message);
    }
  };

  useEffect(() => {
    fetchSpace();
  }, []);

  const handleAccordionClick = (key) => {
    setOpen((prevOpen) => ({ ...prevOpen, [key]: !prevOpen[key] }));
  };

  // --- Dynamic Menu Generation ---
  const dynamicMenu = [
    {
      text: translations[language].dashboard,
      path: "/biz-space/dashboard",
      roles: [ROLES.ADMIN],
    },
  ];

  const availableFunctions = space.length > 0 ? space[0].functions : [];

  availableFunctions.forEach((funcName) => {
    const routeKey = functionKeyMap[funcName];

    if (routeKey && FUNCTION_ROUTES[routeKey]) {
      const route = FUNCTION_ROUTES[routeKey];
      const hasSubLinks = route.links && Object.keys(route.links).length > 0;

      const menuItem = {
        text:
          translations[language][funcName.toLowerCase().replace(/\s/g, "")] ||
          funcName,
        path: route.path,
        key: routeKey,
        links: route.links,
        isAccordion: hasSubLinks,
      };

      dynamicMenu.push(menuItem);
    }
  });
  // --- End Dynamic Menu Generation ---

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          bgcolor: "inherit",
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
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

        {/* Dynamic Menu List */}
        <List>
          {dynamicMenu
            .filter((item) => !item.roles || item.roles.includes(user.role))
            .map((item, index) => {
              const isSelected = location.pathname === item.path;

              if (item.isAccordion) {
                return (
                  <Box key={item.key || index}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => handleAccordionClick(item.key)}
                        sx={{
                          bgcolor: open[item.key]
                            ? "action.selected"
                            : "inherit",
                        }}
                      >
                        <ListItemText primary={item.text} />
                        {open[item.key] ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                    </ListItem>
                    {/* Render the collapsed sub-links */}
                    <Collapse in={open[item.key]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {Object.keys(item.links).map((linkKey) => {
                          const subLink = item.links[linkKey];
                          const isSubLinkSelected =
                            location.pathname === subLink.path;

                          return (
                            <ListItem key={linkKey} disablePadding>
                              <ListItemButton
                                href={subLink.path}
                                sx={{
                                  pl: 4,
                                  bgcolor: isSubLinkSelected
                                    ? "action.selected"
                                    : "inherit",
                                }}
                              >
                                <ListItemText
                                  primary={translations[language][subLink.text]}
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </List>
                    </Collapse>
                  </Box>
                );
              } else {
                return (
                  <ListItem key={item.key || index} disablePadding>
                    <ListItemButton
                      href={item.path}
                      sx={{
                        bgcolor: isSelected ? "action.selected" : "inherit",
                      }}
                    >
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                );
              }
            })}
        </List>
        {/* End Dynamic Menu List */}

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
export default ClientSideBar;
