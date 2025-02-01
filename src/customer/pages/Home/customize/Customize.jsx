function Customize() {
  return (
    <div className="flex items-center justify-between bg-gray-100 py-10 lg:py-24 lg:px-40 ">
      <div className="w-full lg:w-1/3 hidden lg:block">
        <img
          src="/public/customize offer image.png"
          alt="Smart home automation illustration"
          className="w-full h-auto"
        />
      </div>

      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Wanna customize your automation package!
        </h2>
        <p className="text-lg text-gray-700 mb-6 font-lora">
          Customize your smart home automation system either wireless or wired
          automation solution based on your needs from our different value
          propositions and smart products, such as home security, family safety,
          entertainment, smart lighting, smart curtain, smart shutters, smart
          door lock, security camera, smart sensors, PDLC smart film switchable
          glass, and much more.
        </p>
        <button className="font-lora bg-black text-white py-2 px-6 rounded-md text-lg hover:bg-white hover:text-black border border-black transition-all duration-300">
          Customize
        </button>
      </div>
    </div>
  );
}

export default Customize;
