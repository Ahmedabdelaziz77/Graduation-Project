// import { Link } from "react-router-dom";

import { Link } from "react-router-dom";

function GetAppointment() {
  return (
    <div className="relative bg-gradient-to-r from-primary-color via-[#6a9a7a] to-secondary-color py-16">
      <div className="absolute inset-0">
        <img
          src="/public/get appointment image.webp"
          alt="Get Appointment"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-6 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 font-lora">
          Get an Appointment Today
        </h2>
        <p className="text-lg sm:text-xl mb-8">
          Reach out to our team of experts and bring your dreams to life.
          <br />
          Click below to schedule a consultation at your convenience.
        </p>

        <button
          className="btn bg-primary-color text-white px-8 py-4 rounded-lg font-semibold shadow-lg transform hover:scale-105 hover:bg-[#006f61] transition duration-300 ease-in-out"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Book Now
        </button>
        <dialog id="my_modal_3" className="modal p-5 rounded-xl">
          <div className="modal-box">
            <form method="dialog" className="border-b-2 mb-5">
              <div className="flex items-center justify-between mb-5">
                <h1 className="font-bold text-xl">Appointment Summary</h1>
                <button className="btn btn-sm btn-circle btn-ghost font-bold text-xl">
                  ✕
                </button>
              </div>
            </form>
            <div className="border-2 p-4 text-start mb-10">
              <p className="mb-2">Free, At Home Consultation Visit</p>
              <p>With any staff member - 1 hr - Free (Cairo & Giza)</p>
            </div>
            <p className="mb-5">
              Do you want to add another service to this appointment?
            </p>

            <button className="btn text-2xl border-2 px-32 py-3">
              +
              <span className="ml-2 decoration hover:decoration-1 hover:underline transition duration-500 ease-in-out">
                {" "}
                Add Another Service{" "}
              </span>
            </button>
          </div>
          <br />
          <br />
          <br />
          <div className="border-b-2"></div>
          <br />
          <br />
          <br />
          <Link
            to={"/appointment"}
            className="bg-black px-40 border-black border-8 py-3 text-white hover:underline transition duration-500 ease-in-out"
          >
            Schedule Appointment
          </Link>
          <br />
          <br />
          <br />
        </dialog>
      </div>
    </div>
  );
}

export default GetAppointment;
