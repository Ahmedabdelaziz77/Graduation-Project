function OurServices() {
  const services = [
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
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Our Services
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurServices;
