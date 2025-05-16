import { useState } from "react";
import RightOffer from "./RightOffer";
import { Link } from "react-router-dom";

const SmartApp = () => {
  const [showMoreToo, setShowMoreToo] = useState(false);
  const [showIndoor, setShowIndoor] = useState(false);
  const [numberPage, setNumberPage] = useState(2);

  // const [selectedImage, setSelectedImage] = useState(null);

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const imageURL = URL.createObjectURL(file);
  //     setSelectedImage(imageURL);
  //   }
  // };
  return (
    <div className="flex items-center gap-10 mt-10 p-20">
      <RightOffer />
      <div className="w-1/2 ">
        <h1 className="text-3xl mb-3 font-bold">Let&apos;s Discuss</h1>
        <h2 className="text-3xl mb-3 font-bold text-primary-color">
          Your Requirements!
        </h2>
        <div className="border border-primary-color p-5 rounded-lg">
          <h1 className="text-2xl mb-5">Smart Application</h1>
          <label htmlFor="smart" className="cursor-pointer font-semibold">
            <input
              id="smart"
              className="mr-2 text-lg cursor-pointer font-semibold"
              type="checkbox"
            />
            Smart Security
          </label>

          <>
            <div className="p-5">
              <label htmlFor="door" className="cursor-pointer font-semibold">
                <input
                  id="door"
                  className="mr-2 text-lg cursor-pointer font-semibold"
                  type="checkbox"
                  onChange={(e) => setShowMoreToo(e.target.checked)}
                />
                Smart Door Lock
                {showMoreToo && (
                  <>
                    <br />
                    <br />
                    <div className="flex">
                      <form action="" className="w-1/2 mr-4 pl-7">
                        <label htmlFor="">Door Type *</label>
                        <br />
                        <br />
                        <select
                          className="p-2 border-b border-primary-color"
                          id="door"
                          name="door"
                          required
                        >
                          <option value="house">Wood</option>
                          <option value="apartment">Metal</option>
                          <option value="chalet">Glass</option>
                        </select>
                      </form>
                      <form className="w-1/2 mr-4 pl-7">
                        <label htmlFor="">Number of locks *</label>
                        <input
                          className="mt-8 outline-none border-b border-primary-color"
                          type="text"
                          placeholder="1.e. 2 block"
                          required
                        />
                      </form>
                    </div>
                    <p className="pl-7 mt-5 text-gray-700">Door Photo</p>
                    <div className="mt-3 pl-7">
                      <a
                        className="bg-primary-color text-white px-6 py-3 text-lg"
                        href=""
                      >
                        + Upload Door Photo
                      </a>
                      {/* <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        {selectedImage && (
                          <div>
                            <h2>Preview:</h2>
                            <img
                              src={selectedImage}
                              alt="Uploaded"
                              style={{ maxWidth: "100%", height: "auto" }}
                            />
                          </div>
                        )} */}
                    </div>
                  </>
                )}
              </label>
              <br />
              <br />
              <label htmlFor="indoor" className="cursor-pointer font-semibold">
                <input
                  id="indoor"
                  className="mr-2 text-lg cursor-pointer font-semibold"
                  type="checkbox"
                  onChange={(e) => setShowIndoor(e.target.checked)}
                />
                Indoor Camera System
                {showIndoor && (
                  <>
                    <div className="flex pl-7 mt-3">
                      <div className="mr-5">
                        <label
                          className="font-semibold text-gray-700"
                          htmlFor=""
                        >
                          Number of cameras *
                        </label>
                        <br />
                        <br />
                        <input
                          className="outline-none border-b border-primary-color"
                          type="text"
                          required
                          placeholder="1.e. 3 cameras"
                        />
                      </div>
                      <form action="">
                        <label className="text-gray-700" htmlFor="">
                          Connection *
                        </label>
                        <br />
                        <br />

                        <input
                          className="mr-3"
                          type="radio"
                          id="wireless"
                          name="age"
                          value="30"
                          required
                        />
                        <label className="mr-5" htmlFor="wireless">
                          Wireless
                        </label>
                        <input
                          className="mr-3"
                          type="radio"
                          id="wired"
                          name="age"
                          value="60"
                          required
                        />
                        <label htmlFor="wired">Wired</label>

                        <br />
                      </form>
                    </div>

                    <div className="flex pl-7 mt-10">
                      <form action="">
                        <label className="text-gray-700" htmlFor="">
                          Resolution *
                        </label>
                        <br />
                        <br />

                        <input
                          className="mr-3"
                          type="radio"
                          id="m2"
                          name="mega"
                          value="2"
                          required
                        />

                        <label className="mr-11" htmlFor="m2">
                          2 MB
                        </label>
                        <input
                          className="mr-3"
                          type="radio"
                          id="m4"
                          name="mega"
                          value="4"
                          required
                        />
                        <label className="mr-11" htmlFor="m4">
                          4 BM
                        </label>
                        <input
                          className="mr-3"
                          type="radio"
                          id="m5"
                          name="mega"
                          value="5"
                          required
                        />
                        <label className="mr-11" htmlFor="m5">
                          5 BM
                        </label>
                        <input
                          className="mr-3"
                          type="radio"
                          id="m8"
                          name="mega"
                          value="8"
                          required
                        />
                        <label className="mr-11" htmlFor="m8">
                          8 BM
                        </label>

                        <br />
                      </form>
                    </div>
                  </>
                )}
              </label>
              <br />
              <br />
              <label htmlFor="outdoor" className="cursor-pointer font-semibold">
                <input
                  id="outdoor"
                  className="mr-2 text-lg cursor-pointer font-semibold"
                  type="checkbox"
                />
                Outdoor Camera System (CCTV)
              </label>
              <br />
              <br />
              <p className="text-sm mb-3">Smart Sensors</p>
              <div className="flex mb-5">
                <div className="w-1/2">
                  <input
                    className="mr-3 cursor-pointer"
                    type="checkbox"
                    id="sensor1"
                  />
                  <label className="mr-10 cursor-pointer" htmlFor="sensor1">
                    Door/Window Sensors
                  </label>
                </div>
                <div className="w-1/2">
                  <input
                    className="mr-3 cursor-pointer"
                    type="checkbox"
                    id="sensor2"
                  />
                  <label className="cursor-pointer" htmlFor="sensor2">
                    Motion Sensor
                  </label>
                </div>
              </div>
              <div className="flex mb-5">
                <div className="w-1/2">
                  <input
                    className="mr-3 cursor-pointer"
                    type="checkbox"
                    id="sensor3"
                  />
                  <label className="mr-10 cursor-pointer" htmlFor="sensor3">
                    Temp/Humidity Sensor
                  </label>
                </div>
                <div className="w-1/2">
                  <input
                    className="mr-3 cursor-pointer"
                    type="checkbox"
                    id="sensor4"
                  />
                  <label className="cursor-pointer" htmlFor="sensor4">
                    Smoke Sensor
                  </label>
                </div>
              </div>
              <div className="flex mb-5">
                <div className="w-1/2">
                  <input
                    className="mr-3 cursor-pointer"
                    type="checkbox"
                    id="sensor5"
                  />
                  <label className="mr-10 cursor-pointer" htmlFor="sensor5">
                    Gas Sensor
                  </label>
                </div>
                <div className="w-1/2">
                  <input
                    className="mr-3 cursor-pointer"
                    type="checkbox"
                    id="sensor6"
                  />
                  <label className="cursor-pointer" htmlFor="sensor6">
                    Water Leakage Sensor
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Link
                to={"/offerCustomize"}
                className="bg-white px-6 py-3 border border-black hover:bg-primary-color hover:text-white hover:border-primary-color duration-300 -mt-5"
              >
                Back
              </Link>
              <div className="flex items-center justify-between mb-5">
                <div className=""></div>
                <Link
                  to={"/lastPage"}
                  onClick={() => setNumberPage((e) => e + 1)}
                  className="bg-primary-color text-white px-6 py-3 border-no"
                >
                  Next
                </Link>
              </div>
            </div>
            <div className="text-center">page {numberPage}/3</div>
          </>
        </div>
      </div>
    </div>
  );
};
export default SmartApp;
