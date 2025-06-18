const OrderedIdeas = ({
  handleMouseEnter,
  setCurrentImg,
  handleMouseLeave,
  hoveredItems,
  currentImg,
}) => {
  const items = [
    "Manage energy usage with AI",
    "Care for your loved ones from afar",
    "Tag and track your pet",
    "Set the perfect mood for sleep",
    "Power up your home office",
  ];
  return (
    <div className="w-1/2">
      <ol type="1">
        {items.map((item, index) => {
          const isActive = hoveredItems.includes(index) || currentImg === index;

          return (
            <li
              key={index}
              onMouseEnter={() => {
                handleMouseEnter(index);
                setCurrentImg(index); // sync image
              }}
              onMouseLeave={() => handleMouseLeave(index)}
              className={`p-6 text-3xl font-bold transition-all duration-300 ${
                isActive ? "text-primary-color scale-105" : "text-gray-700"
              }`}
            >
              {item}
              {isActive && (
                <>
                  <br />
                  <button className="text-black text-lg border-b-2 border-black mt-2">
                    Learn More
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default OrderedIdeas;
