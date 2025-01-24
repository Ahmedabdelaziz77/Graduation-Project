import Slider from "react-slick";
import { Typography } from "@mui/material";
import Arrows from "./Arrows";

function SliderSection({ products }) {
  console.log(products);
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

  return (
    <Slider {...settings} className="px-5 py-5">
      {products.map((product, index) => (
        <div key={index} className="text-center">
          <div className="flex justify-center items-center h-[120px] mb-5">
            <img
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
