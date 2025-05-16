import { Link } from "react-router-dom";
import RightOffer from "./RightOffer";
import { useState } from "react";

const LastPageCustomize = () => {
  const [showMoreLight, setShowMoreLight] = useState(false);
  const [showMoreCurtain, setShowMoreCurtain] = useState(false);
  const [showMoreShutter, setShowMoreShutter] = useState(false);
  const [other, setOther] = useState(false);
  const [otherCurtain, setOtherCurtain] = useState(false);
  return (
    <div className="flex items-center gap-10 mt-10 p-20">
      <RightOffer />
      <div className="w-1/2 ">
        <h1 className="text-3xl mb-3 font-bold">Let&apos;s Discuss</h1>
        <h2 className="text-3xl mb-3 font-bold text-primary-color">
          Your Requirements!
        </h2>
        <div className="border border-primary-color p-5 rounded-lg">
          <div className="mb-7">
            <label className="cursor-pointer" htmlFor="light">
              <input
                className="outline-none border-b border-primary-color mr-3 cursor-pointer"
                type="checkbox"
                id="light"
                required
                onChange={(e) => setShowMoreLight(e.target.checked)}
              />
              Smart Lighting
              {showMoreLight && (
                <>
                  <h1 className="pl-5 mt-6 text-sm">Lighting control by</h1>
                  <div className="flex pl-5 mt-2">
                    <div className="w-1/2">
                      <label className="cursor-pointer" htmlFor="smart1">
                        <input
                          className="mr-3 cursor-pointer"
                          type="checkbox"
                          id="smart1"
                        />
                        Smart switches
                      </label>
                    </div>
                    <div className="w-1/2">
                      <label className="cursor-pointer" htmlFor="smart2">
                        <input
                          className="mr-3 cursor-pointer"
                          type="checkbox"
                          id="smart2"
                        />
                        In-wall switches
                      </label>
                    </div>
                  </div>
                  <div className="flex pl-5 mt-2">
                    <div className="w-1/2">
                      <label className="cursor-pointer" htmlFor="smart3">
                        <input
                          className="mr-3 cursor-pointer"
                          type="checkbox"
                          id="smart3"
                        />
                        Sensors
                      </label>
                    </div>
                    <div className="w-1/2">
                      <label className="cursor-pointer" htmlFor="smart4">
                        <input
                          className="mr-3 cursor-pointer"
                          type="checkbox"
                          id="smart4"
                        />
                        Control panel
                      </label>
                    </div>
                  </div>
                  <div className="flex pl-5 mt-2">
                    <div className="w-1/2">
                      <label className="cursor-pointer" htmlFor="smart5">
                        <input
                          className="mr-3 cursor-pointer"
                          type="checkbox"
                          id="smart5"
                        />
                        Voice Command
                      </label>
                    </div>
                  </div>
                  <div className="flex pl-5 mt-2">
                    <div className="w-1/2">
                      <label className="cursor-pointer" htmlFor="smart6">
                        <input
                          className="mr-3 cursor-pointer"
                          type="checkbox"
                          id="smart6"
                          onChange={(e) => setOther(e.target.checked)}
                        />
                        Other
                        {other && (
                          <>
                            <br />
                            <br />
                            <input
                              className="outline-none border-b border-primary-color w-[500px]"
                              required
                              placeholder="Please specify your requirement"
                            />
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </>
              )}
            </label>
          </div>
          <div className="mb-7">
            <label className="cursor-pointer" htmlFor="curtain">
              <input
                className="outline-none border-b border-primary-color mr-3 cursor-pointer"
                type="checkbox"
                required
                id="curtain"
                onChange={(e) => setShowMoreCurtain(e.target.checked)}
              />
              Smart Curtain
              {showMoreCurtain && (
                <>
                  <>
                    <h1 className="pl-5 mt-6 text-sm">Curtain Shape *</h1>
                    <div className="flex pl-5 mt-2">
                      <div className="w-1/3">
                        <input
                          className="mr-3 cursor-pointer"
                          type="radio"
                          id="line"
                          name="curtain"
                          value="line"
                          required
                        />

                        <label className="mr-11 cursor-pointer" htmlFor="line">
                          Straight line
                        </label>
                      </div>
                      <div className="w-1/3">
                        <input
                          className="mr-3 cursor-pointer"
                          type="radio"
                          id="shape"
                          name="curtain"
                          value="shape"
                          required
                        />
                        <label className="mr-11 cursor-pointer" htmlFor="shape">
                          L shape
                        </label>
                      </div>
                      <div className="w-1/3">
                        <input
                          className="mr-3 cursor-pointer"
                          type="radio"
                          id="curved"
                          name="curtain"
                          value="Curved"
                          required
                        />
                        <label
                          className="mr-11 cursor-pointer"
                          htmlFor="curved"
                        >
                          Curved
                        </label>
                      </div>
                    </div>
                    <div className="flex pl-5 mt-2">
                      <label className="mr-11 cursor-pointer" htmlFor="outher">
                        <input
                          className="mr-3 cursor-pointer"
                          type="radio"
                          id="outher"
                          name="curtain"
                          value="outher"
                          required
                          onChange={(e) => setOtherCurtain(e.target.checked)}
                        />
                        Outher
                        {otherCurtain && (
                          <>
                            <br />
                            <br />
                            <input
                              className="outline-none border-b border-primary-color w-[500px]"
                              required
                              placeholder="Please specify?"
                            />
                          </>
                        )}
                      </label>
                    </div>

                    <div className="flex pl-5 mt-6 ">
                      <div className="w-1/2">
                        <label htmlFor="">
                          Length (meter) *
                          <br />
                          <input
                            className="outline-none border-b border-primary-color mt-2"
                            required
                            placeholder="i.e .5"
                          />
                        </label>
                      </div>
                      <div className="w-1/2">
                        <label htmlFor="">
                          Number of curtains *
                          <br />
                          <input
                            className="outline-none border-b border-primary-color mt-2"
                            required
                            placeholder="i.e. 2"
                          />
                        </label>
                      </div>
                    </div>
                  </>
                </>
              )}
            </label>
          </div>
          <div className="mb-7">
            <label className="cursor-pointer" htmlFor="shutter">
              <input
                className="outline-none border-b border-primary-color mr-3 cursor-pointer"
                type="checkbox"
                required
                id="shutter"
                onChange={(e) => setShowMoreShutter(e.target.checked)}
              />
              Smart Shutter
              {showMoreShutter && (
                <>
                  <div className="flex pl-5 mt-6 ">
                    <div className="w-1/2">
                      <label htmlFor="">
                        Length (meter) *
                        <br />
                        <input
                          className="outline-none border-b border-primary-color mt-2"
                          required
                          placeholder="i.e .5"
                        />
                      </label>
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="">
                        Number of curtains *
                        <br />
                        <input
                          className="outline-none border-b border-primary-color mt-2"
                          required
                          placeholder="i.e. 2"
                        />
                      </label>
                    </div>
                  </div>
                </>
              )}
            </label>
          </div>

          <div className="flex items-center justify-between">
            <Link
              to={"/smartApp"}
              className="bg-white px-6 py-3 border border-black hover:bg-primary-color hover:text-white hover:border-primary-color duration-300 -mt-5"
            >
              Back
            </Link>
            <div className="flex items-center justify-between mb-5">
              <div className=""></div>
              <Link
                to={"/lastPage"}
                className="bg-primary-color text-white px-6 py-3 border-no"
              >
                Submit
              </Link>
            </div>
          </div>
          <div className="text-center">page 3/3</div>
        </div>
      </div>
    </div>
  );
};
export default LastPageCustomize;
