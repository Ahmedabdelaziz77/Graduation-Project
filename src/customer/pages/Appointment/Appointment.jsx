import { Link } from "react-router-dom";
const Appointment = () => {
  return (
    <div className="px-20 py-10">
      <Link
        to={"/"}
        className="bg-primary-color text-white px-6 py-3 rounded-3xl"
      >
        Back
      </Link>
      <h1 className="mt-10 font-bold text-2xl mb-5">
        Schedule your appointment
      </h1>
      <p className="text-gray-700">
        Check out our availability and book the date and time that works for you
      </p>
      <div className="flex items-center justify-between mt-10">
        <div className=" w-4/6">
          <div className="flex items-center justify-between border-b-2 mr-10 pb-5">
            <h2 className="font-bold text-2xl">Select a Date and Time</h2>
            <p className="mr-20">Eastern European Standard Time (EET)</p>
          </div>
        </div>
        <div className="w-2/6 font-bold text-2xl border-b-2 text-center pb-5">
          <h2 className="">Booking Details</h2>
        </div>{" "}
      </div>
    </div>
  );
};
export default Appointment;
