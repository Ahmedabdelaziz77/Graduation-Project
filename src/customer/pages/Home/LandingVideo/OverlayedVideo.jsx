function OverlayedVideo() {
  return (
    <div className="relative w-full h-full">
      <video
        src="/public/landing video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center text-white text-2xl">
        <h1 className="font-lora absolute top-[20%] left-1/2 translate-x-[-50%] translate-y-[-50%] text-white text-2xl md:text-4xl font-semibold">
          FULL HOUSE SMART HOME SYSTEM
        </h1>
        <h2 className="font-lora absolute top-[30%] left-1/2 translate-x-[-50%] translate-y-[-50%] text-white text-base font-semibold md:text-2xl">
          AI FOR BETTER LIFE
        </h2>
      </div>
    </div>
  );
}

export default OverlayedVideo;
