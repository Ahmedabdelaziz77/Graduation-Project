function Btn({ label }) {
  return (
    <div className="font-lora absolute top-[40%] left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <div className="group relative inline-block">
        <button className="relative z-10 border border-white text-gray-300 transition duration-300 px-[2.1rem] py-[0.2rem] rounded overflow-hidden group-hover:text-white text-[0.8rem]">
          {label}
        </button>
        <div className="absolute inset-0 bg-[rgb(0,127,247)] transform scale-x-0 group-hover:scale-x-100 origin-left transition duration-300 rounded"></div>
      </div>
    </div>
  );
}

export default Btn;
