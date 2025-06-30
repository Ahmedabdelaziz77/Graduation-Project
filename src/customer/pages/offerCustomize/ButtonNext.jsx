import { Link } from "react-router-dom";

const ButtonNext = ({ setNumberPage, formData, onSave }) => {
  const handleNext = () => {
    if (onSave) {
      onSave(formData); // Save current step’s form data
    }
    setNumberPage((prev) => prev + 1);
  };

  return (
    <div className="flex items-center justify-between mb-5">
      <div></div>
      <Link
        to="/smartApp"
        onClick={handleNext}
        className="bg-primary-color text-white px-6 py-3"
      >
        Next
      </Link>
    </div>
  );
};

export default ButtonNext;
