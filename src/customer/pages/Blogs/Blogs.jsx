import idea1 from "/public/inspire idea/idea1.webp";
import idea2 from "/public/inspire idea/idea3.avif";
import idea3 from "/public/inspire idea/idea2.avif";
import idea4 from "/public/inspire idea/idea4.avif";
import idea5 from "/public/inspire idea/idea5.avif";

function Blogs() {
  const blogItems = [
    {
      title: "Manage energy usage with AI",
      summary:
        "Smart thermostats and lighting systems can adjust based on your habits and reduce your electricity bill by up to 30%. See how AI automates energy savings without compromising comfort.",
      image: idea1,
    },
    {
      title: "Care for your loved ones from afar",
      summary:
        "Whether it's elderly parents or young kids, smart home sensors and cameras keep you updated in real-time and even alert you during emergencies — all from your phone.",
      image: idea2,
    },
    {
      title: "Tag and track your pet",
      summary:
        "GPS-enabled smart collars help you monitor your pet's location, activity, and even health. Learn how tech gives peace of mind while letting pets roam safely.",
      image: idea3,
    },
    {
      title: "Set the perfect mood for sleep",
      summary:
        "Discover how ambient lighting, temperature control, and white noise automation create the ideal sleep environment — personalized to your bedtime routine.",
      image: idea4,
    },
    {
      title: "Power up your home office",
      summary:
        "Boost productivity with smart blinds, voice-controlled lighting, and air quality monitors. Your workspace can now adapt to your focus zones and working hours.",
      image: idea5,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-primary-color">
        Smart Living Blog
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogItems.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-56 w-full object-cover"
            />
            <div className="p-5">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h2>
              <p className="text-gray-600 text-sm">{item.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
