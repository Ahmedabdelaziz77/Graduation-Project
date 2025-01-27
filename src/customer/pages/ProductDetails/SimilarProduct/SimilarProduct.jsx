import Slider from "react-slick";
import SimilarProductCard from "./SimilarProductCard";
import Arrows from "../../../components/Navbar/Arrows";

function SimilarProduct() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <Arrows direction="prev" where={1} />,
    nextArrow: <Arrows direction="next" where={1} />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
  return (
    <div className="py-10 lg:py-20 lg:px-10 to-white">
      <div className="text-center mb-16 text-primary-color">
        <h2 className="text-4xl font-extrabold ">Similar Products</h2>
        <p className="text-gray-600 mt-2 font-lora ">
          Discover more products you&apos;ll love—handpicked just for you!
        </p>
      </div>

      <div className="relative">
        <Slider {...settings}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <SimilarProductCard key={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SimilarProduct;
