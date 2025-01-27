import idea1 from "/public/inspire idea/idea1.webp";
import idea2 from "/public/inspire idea/idea3.avif";
import idea3 from "/public/inspire idea/idea2.avif";
import idea4 from "/public/inspire idea/idea4.avif";
import idea5 from "/public/inspire idea/idea5.avif";

const ImagesIdeas = ({ currentImg }) => {
  const images = [idea1, idea2, idea3, idea4, idea5];

  return (
    <div className="w-1/2 h-[400px] relative overflow-hidden">
      {images.map((item, index) => (
        <img
          className="w-full h-full absolute"
          src={item}
          key={index}
          style={{
            transform: `translateX(${(index - currentImg) * 100}%)`,
          }}
        />
      ))}
    </div>
  );
};

export default ImagesIdeas;
