import DealCard from "./DealCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const CustomArrow = ({ className, onClick, icon }) => (
  <div
    className={`${className} p-4 rounded-full shadow-md cursor-pointer transition-transform transform hover:scale-110`}
    onClick={onClick}
  >
    {icon}
  </div>
);

function Deal() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <CustomArrow />,
    nextArrow: <CustomArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="py-10 lg:py-20 lg:px-20 bg-gradient-to-r from-secondary-color to-white">
      <div className="text-center mb-16 text-primary-color">
        <h2 className="text-4xl font-extrabold ">Today&apos;s Deals</h2>
        <p className="text-gray-600 mt-2 font-lora ">
          Don&apos;t miss out on the hottest discounts available today. Shop now
          and save big!
        </p>
      </div>

      <div className="relative">
        <Slider {...settings}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <DealCard key={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Deal;
