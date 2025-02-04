import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function DrawerList({ menu, menu2, toggleDrawer }) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="h-full">
      <div className="flex flex-col justify-between h-full w-[300px] border-r py-5">
        <div className="space-y-2">
          {menu.map((item) => (
            <div
              onClick={() => navigate(item.path)}
              className="pr-9 cursor-pointer"
              key={item.name}
            >
              <div
                className={`${
                  item.path === location.pathname
                    ? "bg-primary-color text-white"
                    : "text-primary-color"
                } flex items-center px-5 py-3 rounded-r-full`}
                onClick={toggleDrawer}
              >
                <ListItemIcon>
                  {item.path === location.pathname
                    ? item.activeIcon
                    : item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </div>
            </div>
          ))}
        </div>
        <Divider />
        <div className="space-y-2">
          {menu2.map((item) => (
            <div
              onClick={() => navigate(item.path)}
              className="pr-9 cursor-pointer"
              key={item.name}
            >
              <div
                className={`${
                  item.path === location.pathname
                    ? "bg-primary-color text-white"
                    : "text-primary-color"
                } flex items-center px-5 py-3 rounded-r-full`}
                onClick={toggleDrawer}
              >
                <ListItemIcon>
                  {item.path === location.pathname
                    ? item.activeIcon
                    : item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DrawerList;
