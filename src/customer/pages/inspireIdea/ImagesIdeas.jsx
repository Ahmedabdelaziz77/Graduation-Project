import idea1 from "../../../images/idea1.webp";
import idea2 from "../../../images/idea3.avif";
import idea3 from "../../../images/idea2.avif";
import idea4 from "../../../images/idea4.avif";
import idea5 from "../../../images/idea5.avif";

export const ImagesIdeas = ({ currentImg }) => {
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
