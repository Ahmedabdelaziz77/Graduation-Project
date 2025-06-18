import Slider from "react-slick";
import { Typography } from "@mui/material";
import Arrows from "./Arrows";
import { useNavigate } from "react-router-dom";
import MiniEmpty from "../../../components/MiniEmpty";

function SliderSection({ products }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <Arrows direction="next" />,
    prevArrow: <Arrows direction="prev" />,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
  const navigate = useNavigate();
  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <MiniEmpty
          whatIsEmpty="No Products Available."
          WhatToDo="Try Again Later."
        />
      </div>
    );
  }
  return (
    <Slider {...settings} className="px-5 py-5">
      {products.map((product, index) => (
        <div key={index} className="text-center ">
          <div className="flex justify-center items-center h-[120px] mb-5 ">
            <img
              className="cursor-pointer"
              onClick={() =>
                navigate(
                  `/product-details/${product.category.id}/${product.name}/${product.id}`
                )
              }
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                maxWidth: "120px",
                height: "95%",
              }}
            />
          </div>
          <Typography>{product.name}</Typography>
        </div>
      ))}
    </Slider>
  );
}

export default SliderSection;
