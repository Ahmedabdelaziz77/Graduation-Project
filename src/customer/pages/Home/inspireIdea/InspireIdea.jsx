import { useState } from "react";

import ImagesIdeas from "./ImagesIdeas";
import OrderedIdeas from "./OrderedIdeas";
const InspireIdea = () => {
  const [hoveredItems, setHoveredItems] = useState([]);
  const [currentImg, setCurrentImg] = useState(0);

  const handleMouseEnter = (index) => {
    setHoveredItems((prev) => [...prev, index]);
    console.log(index);
  };

  const handleMouseLeave = (index) => {
    setHoveredItems((prev) => prev.filter((itemIndex) => itemIndex !== index));
    console.log(index);
  };

  return (
    <div className="p-20">
      <h1 className="text-center font-bold text-5xl">Inspiring Ideas</h1>
      <p className="text-center text-gray-700 mt-3">
        The possibilities are endless. Here are some ideas of how to improve
        your life with SmartThings.
      </p>
      <div className="flex gap-5 justify-center items-center mt-10">
        <ImagesIdeas currentImg={currentImg} />
        <OrderedIdeas
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          hoveredItems={hoveredItems}
          setCurrentImg={setCurrentImg}
        />
      </div>
    </div>
  );
};

export default InspireIdea;
