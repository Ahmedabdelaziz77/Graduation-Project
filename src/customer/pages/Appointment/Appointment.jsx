import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Appointment() {
  const location = useLocation();
  const navigate = useNavigate();

  const fallbackServices = [
    "FREE Consultation",
    "Installation",
    "Custom Smart Solutions",
  ];

  const [services, setServices] = useState(
    location.state?.services || fallbackServices
  );

  useEffect(() => {
    if (!location.state?.services) {
      console.warn("No services passed. Using fallback fake services.");
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-3xl w-full text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Appointment Confirmed 🎉
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for scheduling an appointment with us! One of our smart home
          experts will contact you soon to confirm the details and time.
        </p>

        <div className="text-left border-t pt-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Requested Services:
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            {services.map((service, index) => (
              <li key={index} className="mb-1">
                ✅ {service}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 text-gray-600 text-sm">
          📞 If you need to make changes or have any questions, feel free to
          contact our support team.
        </div>
      </div>
    </div>
  );
}

export default Appointment;
