import { useState, useEffect, useRef } from "react";
import ImagesIdeas from "./ImagesIdeas";
import OrderedIdeas from "./OrderedIdeas";

const InspireIdea = () => {
  const [hoveredItems, setHoveredItems] = useState([]);
  const [currentImg, setCurrentImg] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);

  const handleMouseEnter = (index) => {
    setHoveredItems((prev) => [...prev, index]);
    setIsHovering(true);
  };

  const handleMouseLeave = (index) => {
    setHoveredItems((prev) => prev.filter((itemIndex) => itemIndex !== index));
    setIsHovering(false);
  };

  // Auto-slide effect
  useEffect(() => {
    if (!isHovering) {
      intervalRef.current = setInterval(() => {
        setCurrentImg((prev) => (prev + 1) % 5); // Assuming 5 images
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isHovering]);

  return (
    <div className="p-10 lg:p-20">
      <h1 className="text-center font-extrabold text-4xl lg:text-5xl mb-4">
        Inspiring Ideas
      </h1>
      <p className="text-center text-gray-700 max-w-2xl mx-auto">
        The possibilities are endless. Here are some ideas of how to improve
        your life with SmartThings.
      </p>
      <div className="flex flex-col lg:flex-row gap-10 justify-center items-center mt-10">
        <ImagesIdeas currentImg={currentImg} />
        <OrderedIdeas
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          hoveredItems={hoveredItems}
          setCurrentImg={setCurrentImg}
          currentImg={currentImg}
        />
      </div>
    </div>
  );
};

export default InspireIdea;
