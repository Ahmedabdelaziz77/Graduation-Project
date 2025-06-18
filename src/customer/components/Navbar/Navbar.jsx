import { useState } from "react";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import {
  Search as SearchIcon,
  FavoriteBorder,
  AddShoppingCart,
  Storefront,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { logout } from "../../../State/authSlice";
import SliderSection from "./SliderSection";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ categories }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [hovering, setHovering] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(categories?.[0]);
  const { token, roles } = useAppSelector((state) => state.auth);
  const isLoggedin = Boolean(token);
  const isUser = roles.includes("ROLE_USER");
  const isSeller = roles.includes("ROLE_SELLER");
  const isAdmin = roles.includes("ROLE_ADMIN");

  let hoverTimeout;
  const handleMouseEnter = (category) => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => setHoveredCategory(category), 150);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    setHovering(false);
    setHoveredCategory(categories?.[0]);
  };

  return (
    <Box className="sticky top-0 z-50 bg-white shadow-md">
      {/* Navbar Header */}
      <Box className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
        <Box className="flex items-center gap-9">
          <h1
            onClick={() => navigate("/")}
            className="logo cursor-pointer text-lg md:text-2xl text-primary-color font-bold"
          >
            EZsmart
          </h1>

          <ul className="flex items-center font-medium text-gray-800 cursor-pointer">
            <li
              className="mainCategory hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center relative"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigate(`/products?categories=all`)}
            >
              Products
            </li>

            {["Shop", "Services", "Blogs"].map((item) => (
              <li
                key={item}
                className="hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center"
                onClick={() => navigate(`/${item.toLowerCase()}`)}
              >
                {item}
              </li>
            ))}

            {!isUser && (isSeller || isAdmin) && (
              <li
                className="hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center"
                onClick={() =>
                  navigate(isSeller ? "/seller" : isAdmin ? "/admin" : "/")
                }
              >
                Dashboard
              </li>
            )}
          </ul>
        </Box>

        <Box className="flex gap-1 lg:gap-6 items-center">
          <IconButton>
            <SearchIcon />
          </IconButton>

          {isLoggedin ? (
            <>
              <Button
                onClick={() => navigate("/account/orders")}
                className="flex items-center gap-2"
              >
                <Avatar
                  sx={{ width: 29, height: 29 }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFU7U2h0umyF0P6E_yhTX45sGgPEQAbGaJ4g&s"
                />
                <Typography className="font-semibold hidden lg:block">
                  My Account
                </Typography>
              </Button>

              <Button
                onClick={() => {
                  dispatch(logout());
                  navigate("/login");
                }}
                variant="outlined"
                color="error"
                size="small"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate("/login")} variant="contained">
              Login
            </Button>
          )}

          <IconButton>
            <FavoriteBorder sx={{ fontSize: 29 }} />
          </IconButton>

          <IconButton onClick={() => navigate("/cart")}>
            <AddShoppingCart className="text-gray-700" sx={{ fontSize: 29 }} />
          </IconButton>

          {isLoggedin && isUser && (
            <Button
              onClick={() => navigate("/become-seller")}
              startIcon={<Storefront />}
              variant="outlined"
            >
              Become Seller
            </Button>
          )}
        </Box>
      </Box>

      {/* Dropdown Section */}
      <AnimatePresence>
        {hovering && (
          <motion.div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              top: "70px",
              left: 0,
              width: "100%",
              backgroundColor: "white",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
            }}
          >
            <Box
              className="py-10"
              sx={{
                height: "350px",
                overflowY: "auto",
                padding: "20px 30px",
              }}
            >
              <Box className="flex justify-center gap-10">
                {categories.map((category) => (
                  <Typography
                    key={category.id}
                    className={`cursor-pointer py-2 px-4 hover:text-primary-color transition-all duration-150 ease-in-out ${
                      hoveredCategory?.name === category.name
                        ? "text-primary-color border-b-black border-b-[2px]"
                        : ""
                    }`}
                    onMouseEnter={() => handleMouseEnter(category)}
                    onClick={() =>
                      navigate(`/products?category=${category.name}`)
                    }
                  >
                    {category.name}
                  </Typography>
                ))}
              </Box>

              <Box sx={{ marginTop: "20px", padding: "0 30px" }}>
                <SliderSection products={hoveredCategory?.products || []} />
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default Navbar;
