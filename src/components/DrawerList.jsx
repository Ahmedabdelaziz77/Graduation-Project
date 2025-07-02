import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../State/authSlice";

function DrawerList({ menu, menu2, toggleDrawer }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renderSection = (items) =>
    items.map((item) => {
      const isActive = location.pathname === item.path;

      const handleClick = () => {
        if (item.name === "Logout") {
          dispatch(logout());
        }
        navigate(item.path);
        toggleDrawer();
      };

      return (
        <ListItemButton
          key={item.name}
          onClick={handleClick}
          selected={isActive}
          sx={{
            px: 2.5,
            py: 1.5,
            mx: 2,
            mb: 1,
            borderRadius: 1.5,
            bgcolor: isActive ? "rgba(25, 118, 210, 0.12)" : "transparent",
            borderLeft: isActive
              ? "4px solid #009688"
              : "4px solid transparent",
            color: isActive ? "primary.main" : "text.primary",
            fontWeight: isActive ? "bold" : "normal",
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: isActive ? "primary.main" : "text.secondary",
              minWidth: 36,
            }}
          >
            {isActive ? item.activeIcon : item.icon}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  textTransform: "capitalize",
                }}
              >
                {item.name}
              </Typography>
            }
          />
        </ListItemButton>
      );
    });

  return (
    <Box
      sx={{
        width: 280,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        py: 3,
        bgcolor: "background.paper",
        borderRight: "1px solid #e0e0e0",
      }}
    >
      <Box>
        <List>{renderSection(menu)}</List>
      </Box>
      <Box>
        <Divider sx={{ mx: 2, my: 1 }} />
        <List>{renderSection(menu2)}</List>
      </Box>
    </Box>
  );
}

export default DrawerList;
