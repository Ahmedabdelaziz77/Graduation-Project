import { useEffect, useState } from "react";
import RightOffer from "./RightOffer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOffer } from "../../../State/customer/offersSlice";

const LastPageCustomize = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [optionalFeatures, setOptionalFeatures] = useState({
    lighting: {
      enabled: false,
      controlMethods: [],
      other: "",
    },
    curtain: {
      enabled: false,
      shape: "",
      length: "",
      count: "",
      other: "",
    },
    shutter: {
      enabled: false,
      length: "",
      count: "",
    },
  });

  const [showLighting, setShowLighting] = useState(false);
  const [otherLighting, setOtherLighting] = useState(false);
  const [showCurtain, setShowCurtain] = useState(false);
  const [showShutter, setShowShutter] = useState(false);
  const [otherCurtain, setOtherCurtain] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("optionalFeatures")) || {};
    setOptionalFeatures((prev) => ({
      ...prev,
      ...saved,
    }));
  }, []);

  const toggleControlMethod = (method) => {
    setOptionalFeatures((prev) => {
      const methods = prev.lighting.controlMethods.includes(method)
        ? prev.lighting.controlMethods.filter((m) => m !== method)
        : [...prev.lighting.controlMethods, method];
      return {
        ...prev,
        lighting: {
          ...prev.lighting,
          controlMethods: methods,
        },
      };
    });
  };

  const handleSubmit = () => {
    const step1 = JSON.parse(localStorage.getItem("offerStep1"));
    const smartSensors = JSON.parse(localStorage.getItem("smartSensors"));
    const prevOptions =
      JSON.parse(localStorage.getItem("optionalFeatures")) || {};

    const finalData = {
      ...step1,
      smartSensors,
      optionalFeatures: {
        ...prevOptions,
        ...optionalFeatures,
      },
    };
    if (finalData.installationDate)
      finalData.installationDate = new Date(finalData.installationDate)
        .toISOString()
        .slice(0, 19);
    dispatch(createOffer(finalData)).then(() => {
      localStorage.clear();
      navigate("/thank-you");
    });
  };

  return (
    <div className="flex items-center gap-10 mt-10 p-20">
      <RightOffer />
      <div className="w-1/2">
        <h1 className="text-3xl mb-3 font-bold">Let&apos;s Discuss</h1>
        <h2 className="text-3xl mb-3 font-bold text-primary-color">
          Your Requirements!
        </h2>
        <div className="border border-primary-color p-5 rounded-lg">
          {/* Lighting */}
          <label className="cursor-pointer" htmlFor="light">
            <input
              id="light"
              type="checkbox"
              checked={showLighting}
              onChange={(e) => {
                setShowLighting(e.target.checked);
                setOptionalFeatures((prev) => ({
                  ...prev,
                  lighting: { ...prev.lighting, enabled: e.target.checked },
                }));
              }}
              className="mr-2"
            />
            Smart Lighting
          </label>

          {showLighting && (
            <div className="pl-5 mt-4">
              <label>
                <input
                  type="checkbox"
                  onChange={() => toggleControlMethod("Smart switches")}
                />
                Smart switches
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  onChange={() => toggleControlMethod("In-wall switches")}
                />
                In-wall switches
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  onChange={() => toggleControlMethod("Sensors")}
                />
                Sensors
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  onChange={() => toggleControlMethod("Control panel")}
                />
                Control panel
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  onChange={() => toggleControlMethod("Voice Command")}
                />
                Voice Command
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setOtherLighting(e.target.checked);
                    if (!e.target.checked) {
                      setOptionalFeatures((prev) => ({
                        ...prev,
                        lighting: { ...prev.lighting, other: "" },
                      }));
                    }
                  }}
                />
                Other
              </label>
              {otherLighting && (
                <input
                  className="outline-none border-b border-primary-color w-[300px] mt-2"
                  placeholder="Please specify"
                  onChange={(e) =>
                    setOptionalFeatures((prev) => ({
                      ...prev,
                      lighting: {
                        ...prev.lighting,
                        other: e.target.value,
                      },
                    }))
                  }
                />
              )}
            </div>
          )}

          {/* Curtain */}
          <label className="cursor-pointer mt-5 block" htmlFor="curtain">
            <input
              id="curtain"
              type="checkbox"
              checked={showCurtain}
              onChange={(e) => {
                setShowCurtain(e.target.checked);
                setOptionalFeatures((prev) => ({
                  ...prev,
                  curtain: { ...prev.curtain, enabled: e.target.checked },
                }));
              }}
              className="mr-2"
            />
            Smart Curtain
          </label>

          {showCurtain && (
            <div className="pl-5 mt-4">
              <label>
                <input
                  type="radio"
                  name="curtainShape"
                  value="Straight"
                  onChange={(e) =>
                    setOptionalFeatures((prev) => ({
                      ...prev,
                      curtain: { ...prev.curtain, shape: e.target.value },
                    }))
                  }
                />
                Straight line
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="curtainShape"
                  value="L shape"
                  onChange={(e) =>
                    setOptionalFeatures((prev) => ({
                      ...prev,
                      curtain: { ...prev.curtain, shape: e.target.value },
                    }))
                  }
                />
                L shape
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="curtainShape"
                  value="Curved"
                  onChange={(e) =>
                    setOptionalFeatures((prev) => ({
                      ...prev,
                      curtain: { ...prev.curtain, shape: e.target.value },
                    }))
                  }
                />
                Curved
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="curtainShape"
                  value="Other"
                  onChange={(e) => setOtherCurtain(e.target.checked)}
                />
                Other
              </label>
              {otherCurtain && (
                <input
                  placeholder="Other shape..."
                  className="outline-none border-b border-primary-color w-[300px] mt-2"
                  onChange={(e) =>
                    setOptionalFeatures((prev) => ({
                      ...prev,
                      curtain: { ...prev.curtain, other: e.target.value },
                    }))
                  }
                />
              )}
              <div className="flex gap-4 mt-4">
                <input
                  placeholder="Length (m)"
                  className="outline-none border-b border-primary-color"
                  onChange={(e) =>
                    setOptionalFeatures((prev) => ({
                      ...prev,
                      curtain: { ...prev.curtain, length: e.target.value },
                    }))
                  }
                />
                <input
                  placeholder="Number of curtains"
                  className="outline-none border-b border-primary-color"
                  onChange={(e) =>
                    setOptionalFeatures((prev) => ({
                      ...prev,
                      curtain: { ...prev.curtain, count: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          )}

          {/* Shutter */}
          <label className="cursor-pointer mt-5 block" htmlFor="shutter">
            <input
              id="shutter"
              type="checkbox"
              checked={showShutter}
              onChange={(e) => {
                setShowShutter(e.target.checked);
                setOptionalFeatures((prev) => ({
                  ...prev,
                  shutter: { ...prev.shutter, enabled: e.target.checked },
                }));
              }}
              className="mr-2"
            />
            Smart Shutter
          </label>

          {showShutter && (
            <div className="flex gap-4 pl-5 mt-4">
              <input
                placeholder="Length (m)"
                className="outline-none border-b border-primary-color"
                onChange={(e) =>
                  setOptionalFeatures((prev) => ({
                    ...prev,
                    shutter: { ...prev.shutter, length: e.target.value },
                  }))
                }
              />
              <input
                placeholder="Number of shutters"
                className="outline-none border-b border-primary-color"
                onChange={(e) =>
                  setOptionalFeatures((prev) => ({
                    ...prev,
                    shutter: { ...prev.shutter, count: e.target.value },
                  }))
                }
              />
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-between mt-10">
            <Link
              to="/smartApp"
              className="bg-white px-6 py-3 border border-black hover:bg-primary-color hover:text-white duration-300"
            >
              Back
            </Link>
            <button
              onClick={handleSubmit}
              className="bg-primary-color text-white px-6 py-3"
            >
              Submit
            </button>
          </div>
          <div className="text-center mt-2">Page 3/3</div>
        </div>
      </div>
    </div>
  );
};

export default LastPageCustomize;
