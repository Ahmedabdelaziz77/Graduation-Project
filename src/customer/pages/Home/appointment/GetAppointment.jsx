// Updated GetAppointment.jsx with detailed service info + Toasts

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createAppointment } from "../../../../State/customer/appointmentsSlice";
import { useNavigate } from "react-router-dom";

const SERVICE_DETAILS = [
  {
    title: "FREE Consultation",
    description:
      "Get expert advice to help you choose the right smart home solutions tailored to your needs, absolutely free.",
    icon: "💡",
  },
  {
    title: "At Home Consultation",
    description:
      "Our experts visit your home to assess your needs and provide personalized solutions for automation and smart products.",
    icon: "🏠",
  },
  {
    title: "Installation",
    description:
      "Professional and hassle-free installation of your selected products by certified technicians.",
    icon: "🔧",
  },
  {
    title: "Service Contract",
    description:
      "Keep your systems running smoothly with our comprehensive service contracts, offering regular maintenance and support.",
    icon: "📃",
  },
  {
    title: "Warranty Extension",
    description:
      "Extend the life of your products with our warranty extension plans, ensuring long-term peace of mind.",
    icon: "🛡️",
  },
  {
    title: "Custom Smart Solutions",
    description:
      "Tailor-made automation systems designed to fit your unique requirements, offering flexibility and scalability.",
    icon: "🛠️",
  },
];

function GetAppointment() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.appointments);
  const [services, setServices] = useState([SERVICE_DETAILS[0].title]);
  const [showServiceOptions, setShowServiceOptions] = useState(false);
  const navigate = useNavigate();
  const handleAddService = (title) => {
    if (!services.includes(title)) {
      setServices((prev) => [...prev, title]);
      toast.info(`Added: ${title}`);
    } else {
      toast.warning(`${title} is already added.`);
    }
    setShowServiceOptions(false);
  };

  const handleCreateAppointment = () => {
    dispatch(createAppointment(services))
      .unwrap()
      .then(() => {
        toast.success("Appointment created successfully!");
        setServices([SERVICE_DETAILS[0].title]);
        document.getElementById("my_modal_3")?.close();
        navigate("/appointment");
      })
      .catch(() => {
        toast.error("Failed to schedule appointment.");
      });
  };

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

        <dialog id="my_modal_3" className="modal p-5 rounded-xl modal-bg-light">
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
              {services.map((title, idx) => (
                <p key={idx} className="mb-2">
                  • {title}
                </p>
              ))}
            </div>

            <p className="mb-5">
              Do you want to add another service to this appointment?
            </p>

            {showServiceOptions ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {SERVICE_DETAILS.filter((s) => !services.includes(s.title)).map(
                  (service, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleAddService(service.title)}
                      className="btn border-2 p-4 text-left flex items-start gap-3 bg-white hover:bg-gray-100 text-black"
                    >
                      <span className="text-2xl">{service.icon}</span>
                      <span>
                        <div className="font-semibold">{service.title}</div>
                        <div className="text-sm text-gray-600">
                          {service.description}
                        </div>
                      </span>
                    </button>
                  )
                )}
              </div>
            ) : (
              <button
                className="btn text-2xl border-2 px-32 py-3"
                type="button"
                onClick={() => setShowServiceOptions(true)}
              >
                +
                <span className="ml-2 hover:underline transition">
                  Add Another Service
                </span>
              </button>
            )}

            <div className="my-10 border-b-2" />

            <button
              onClick={handleCreateAppointment}
              disabled={loading}
              className="bg-black px-40 border-black border-8 py-3 text-white hover:underline transition duration-500 ease-in-out"
            >
              {loading ? "Scheduling..." : "Schedule Appointment"}
            </button>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default GetAppointment;
