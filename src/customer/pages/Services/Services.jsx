import { Link } from "react-router-dom";

function Services() {
  const services = [
    {
      title: "Smart Home Installation",
      description:
        "We provide full installation for smart lighting, thermostats, curtains, cameras, and more — customized to your home's layout and needs.",
      icon: "🛠️",
    },
    {
      title: "AI-Based Product Recommendations",
      description:
        "Upload a photo of your room and let our AI suggest the best smart devices for lighting, security, entertainment, and energy saving.",
      icon: "🤖",
    },
    {
      title: "Remote Monitoring & Alerts",
      description:
        "Monitor your home or office in real-time from your phone. Get instant alerts for motion, door entry, or abnormal activity.",
      icon: "📲",
    },
    {
      title: "Smart Automation Planning",
      description:
        "We help you plan custom automations: schedule lighting, climate, and devices to match your daily habits or special routines.",
      icon: "⚙️",
    },
    {
      title: "Home Safety & Security",
      description:
        "From smart locks to 24/7 camera systems and smoke detectors — we protect your home with the latest smart safety tech.",
      icon: "🔐",
    },
    {
      title: "Personalized Support & Training",
      description:
        "Need help setting up or using your smart devices? Our team offers one-on-one support, guides, and remote troubleshooting.",
      icon: "🎓",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center text-primary-color mb-10">
        Our Smart Services
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 hover:shadow-md transition-all duration-300"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              {service.title}
            </h2>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Looking for a fully personalized smart home plan?
        </h2>
        <p className="text-gray-600 mb-6">
          Tell us about your home, your preferences, and let us build a custom
          smart home offer just for you.
        </p>
        <Link
          to="/offerCustomize"
          className="inline-block bg-primary-color text-white font-semibold px-6 py-3 rounded-md hover:bg-opacity-90 transition-all duration-300"
        >
          Customize Your Smart Home
        </Link>
      </div>
    </div>
  );
}

export default Services;
