import { Link } from "react-router-dom";

const ButtonNext = ({ setNumberPage }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className=""></div>
        <Link
          to={"/smartApp"}
          onClick={() => setNumberPage((e) => e + 1)}
          className="bg-primary-color text-white px-6 py-3 border-no"
        >
          Next
        </Link>
      </div>


    </div>
  );
};
export default ButtonNext;
