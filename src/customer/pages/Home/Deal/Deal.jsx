import DealCard from "./DealCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { useEffect } from "react";
import { fetchAllProducts } from "../../../../State/customer/productSlice";

const CustomArrow = ({ className, onClick, icon }) => (
  <div
    className={`${className} p-4 rounded-full shadow-md cursor-pointer transition-transform transform hover:scale-110`}
    onClick={onClick}
  >
    {icon}
  </div>
);

function Deal() {
  const dispatch = useAppDispatch();
  const {
    list: products,
    loading,
    error,
  } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  if (error) return <div>Error: {error}</div>;
  const sortedProducts = [...products].sort((a, b) => {
    const aDiscount = a.discountPrice || 0;
    const bDiscount = b.discountPrice || 0;
    if (bDiscount > 0 && aDiscount === 0) return 1;
    if (aDiscount > 0 && bDiscount === 0) return -1;
    return 0;
  });
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
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <DealCard key={i} loading={true} />
              ))
            : sortedProducts.map((product) => (
                <DealCard key={product.id} product={product} loading={false} />
              ))}
        </Slider>
      </div>
    </div>
  );
}

export default Deal;
