import { useState } from "react";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import {
  Search as SearchIcon,
  FavoriteBorder,
  AddShoppingCart,
  Storefront,
} from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderSection from "./SliderSection";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const categories = [
    {
      name: "Cameras",
      products: [
        {
          name: "Camera",
          image: "/public/category photos/1-cameras.png",
        },
        {
          name: "Camera",
          image: "/public/category photos/2-home security & sensors.png",
        },
        {
          name: "Camera",
          image: "/public/category photos/3-smart control panel.png",
        },
        {
          name: "Camera",
          image: "/public/category photos/4-smart lighting.jpg",
        },
        {
          name: "Camera",
          image: "/public/category photos/5-smart speakers.webp",
        },
        {
          name: "Camera",
          image: "/public/category photos/6-thermostats.webp",
        },
        { name: "Camera", image: "/public/category photos/7-network.webp" },
        { name: "Camera", image: "/public/category photos/1-cameras.png" },
      ],
    },
    {
      name: "home security & sensors",
      products: [
        { name: "Shirt", image: "https://via.placeholder.com/100" },
        { name: "Jeans", image: "https://via.placeholder.com/100" },
        { name: "Shoes", image: "https://via.placeholder.com/100" },
        { name: "Hat", image: "https://via.placeholder.com/100" },
      ],
    },
    {
      name: "thremostats",
      products: [
        { name: "Microwave", image: "https://via.placeholder.com/100" },
        { name: "Refrigerator", image: "https://via.placeholder.com/100" },
        { name: "Air Conditioner", image: "https://via.placeholder.com/100" },
        { name: "Vacuum Cleaner", image: "https://via.placeholder.com/100" },
      ],
    },
    {
      name: "control panel",
      products: [
        { name: "Fiction", image: "https://via.placeholder.com/100" },
        { name: "Non-fiction", image: "https://via.placeholder.com/100" },
        { name: "Science", image: "https://via.placeholder.com/100" },
        { name: "Fantasy", image: "https://via.placeholder.com/100" },
      ],
    },
    {
      name: "control ",
      products: [
        { name: "Fiction", image: "https://via.placeholder.com/100" },
        { name: "Non-fiction", image: "https://via.placeholder.com/100" },
        { name: "Science", image: "https://via.placeholder.com/100" },
        { name: "Fantasy", image: "https://via.placeholder.com/100" },
      ],
    },
    {
      name: "control pane",
      products: [
        { name: "Fiction", image: "https://via.placeholder.com/100" },
        { name: "Non-fiction", image: "https://via.placeholder.com/100" },
        { name: "Science", image: "https://via.placeholder.com/100" },
        { name: "Fantasy", image: "https://via.placeholder.com/100" },
      ],
    },
    {
      name: "control pnel",
      products: [
        { name: "Fiction", image: "https://via.placeholder.com/100" },
        { name: "Non-fiction", image: "https://via.placeholder.com/100" },
        { name: "Science", image: "https://via.placeholder.com/100" },
        { name: "Fantasy", image: "https://via.placeholder.com/100" },
      ],
    },
  ];
  const isLoggedin = true;
  const navigate = useNavigate();
  const [hovering, setHovering] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(categories[0]);
  let hoverTimeout;
  const handleMouseEnter = (category) => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      setHoveredCategory(category);
    }, 200);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    setHovering(false);
    setHoveredCategory(categories[0]);
  };

  return (
    <Box className="sticky top-0 z-50 bg-white shadow-md">
      {/* Navbar Header */}
      <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
        <div className="flex items-center gap-9">
          <h1
            onClick={() => navigate("/")}
            className="logo cursor-pointer text-lg md:text-2xl text-primary-color"
          >
            EZsmart
          </h1>
          <ul className="flex items-center font-medium text-gray-800 cursor-pointer">
            <li
              className="mainCategory hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center relative"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={handleMouseLeave}
            >
              Products
            </li>
            {["Shop", "Services", "Blogs"].map((item) => (
              <li
                className="hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-1 lg:gap-6 items-center">
          <IconButton>
            <SearchIcon />
          </IconButton>

          {isLoggedin ? (
            <Button
              onClick={() => navigate("/account/orders")}
              className="flex items-center gap-2"
            >
              <Avatar
                sx={{ width: 29, height: 29 }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFU7U2h0umyF0P6E_yhTX45sGgPEQAbGaJ4g&s"
              />
              <h1 className="font-semibold hidden lg:block">ELZOZ</h1>
            </Button>
          ) : (
            <Button variant="contained">Login</Button>
          )}

          <IconButton>
            <FavoriteBorder sx={{ fontSize: 29 }} />
          </IconButton>
          <IconButton onClick={() => navigate("/cart")}>
            <AddShoppingCart className="text-gray-700" sx={{ fontSize: 29 }} />
          </IconButton>
          <Button
            onClick={() => navigate("/become-seller")}
            startIcon={<Storefront />}
            variant="outlined"
          >
            Become Seller
          </Button>
        </div>
      </div>

      {/* Dropdown Section */}
      {hovering && (
        <Box
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "absolute",
            top: "70px",
            left: 0,
            width: "100%",
            backgroundColor: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            opacity: hovering ? 1 : 0,
            transform: hovering ? "translateY(0px)" : "translateY(-20px)",
            visibility: hovering ? "visible" : "hidden",
            transition:
              "opacity 0.3s ease, transform 0.3s ease, visibility 0.3s",
          }}
        >
          <div className="py-10">
            <div className="flex justify-center gap-10">
              {categories.map((category) => (
                <Typography
                  key={category.name}
                  className={`cursor-pointer py-2 px-4 hover:text-primary-color ${
                    hoveredCategory?.name === category.name
                      ? "text-primary-color  border-b-black border-b-[2px] "
                      : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(category)}
                  onClick={() => navigate(`/products/${category.name}`)}
                >
                  {category.name}
                </Typography>
              ))}
            </div>
            <div style={{ marginTop: "20px", padding: "0 30px" }}>
              <SliderSection products={hoveredCategory.products} />
            </div>
          </div>
        </Box>
      )}
    </Box>
  );
}

export default Navbar;
