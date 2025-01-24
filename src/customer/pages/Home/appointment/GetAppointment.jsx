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
        <button className="bg-primary-color text-white px-8 py-4 rounded-lg font-semibold shadow-lg transform hover:scale-105 hover:bg-[#006f61] transition duration-300 ease-in-out">
          Book Now
        </button>
      </div>
    </div>
  );
}

export default GetAppointment;
