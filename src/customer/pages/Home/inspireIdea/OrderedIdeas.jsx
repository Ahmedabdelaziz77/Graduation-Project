const OrderedIdeas = ({
  handleMouseEnter,
  setCurrentImg,
  handleMouseLeave,
  hoveredItems,
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
        {items.map((item, index) => (
          <li
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseOver={() => setCurrentImg(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onMouseOut={() => setCurrentImg(0)}
            className="p-6 text-3xl font-bold inline-block"
          >
            {item}
            {hoveredItems.includes(index) && (
              <>
                <br />
                <button className="text-black text-lg border-b-2 border-black">
                  Learn More
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default OrderedIdeas;
