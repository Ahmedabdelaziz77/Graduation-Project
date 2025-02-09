import { Category, LocalOffer } from "@mui/icons-material";
import DrawerList from "../../components/DrawerList";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon className="text-primary-color" />,
    activeIcon: <DashboardIcon className="text-white" />,
  },
  {
    name: "Coupons",
    path: "/admin/coupon",
    icon: <IntegrationInstructionsIcon className="text-primary-color" />,
    activeIcon: <IntegrationInstructionsIcon className="text-white" />,
  },
  {
    name: "Add New Coupon",
    path: "/admin/add-coupon",
    icon: <AddIcon className="text-primary-color" />,
    activeIcon: <AddIcon className="text-white" />,
  },
  {
    name: "Shop By Category",
    path: "/admin/shop-by-category",
    icon: <Category className="text-primary-color" />,
    activeIcon: <Category className="text-white" />,
  },
  {
    name: "Deals",
    path: "/admin/deals",
    icon: <LocalOffer className="text-primary-color" />,
    activeIcon: <LocalOffer className="text-white" />,
  },
  {
    name: "Customize Requests",
    path: "/admin/customize-requests",
    icon: <RequestQuoteIcon className="text-primary-color" />,
    activeIcon: <RequestQuoteIcon className="text-white" />,
  },
  {
    name: "Appointments",
    path: "/admin/appointments",
    icon: <SendTimeExtensionIcon className="text-primary-color" />,
    activeIcon: <SendTimeExtensionIcon className="text-white" />,
  },
];
const menu2 = [
  {
    name: "Account",
    path: "/admin/account",
    icon: <AccountBoxIcon className="text-primary-color" />,
    activeIcon: <AccountBoxIcon className="text-white" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <LogoutIcon className="text-primary-color" />,
    activeIcon: <LogoutIcon className="text-white" />,
  },
];
function AdminDrawerList({ toggleDrawer }) {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
}

export default AdminDrawerList;
