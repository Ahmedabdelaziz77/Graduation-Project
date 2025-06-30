import { useEffect, useState } from "react";
import RightOffer from "./RightOffer";
import { Link } from "react-router-dom";

const SmartApp = () => {
  const [numberPage, setNumberPage] = useState(2);

  const [smartSensors, setSmartSensors] = useState([]);
  const [optionalFeatures, setOptionalFeatures] = useState({
    smartDoorLock: {},
    indoorCameraSystem: {},
    outdoorCameraSystem: false,
  });

  const [showDoor, setShowDoor] = useState(false);
  const [showIndoor, setShowIndoor] = useState(false);

  useEffect(() => {
    const savedSensors = JSON.parse(localStorage.getItem("smartSensors"));
    const savedOptions = JSON.parse(localStorage.getItem("optionalFeatures"));
    if (savedSensors) setSmartSensors(savedSensors);
    if (savedOptions) setOptionalFeatures(savedOptions);
  }, []);

  const handleSensorChange = (label) => {
    setSmartSensors((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleSave = () => {
    localStorage.setItem("smartSensors", JSON.stringify(smartSensors));
    localStorage.setItem("optionalFeatures", JSON.stringify(optionalFeatures));
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
          <h1 className="text-2xl mb-5">Smart Application</h1>

          {/* Door Lock */}
          <label htmlFor="door" className="cursor-pointer font-semibold">
            <input
              id="door"
              type="checkbox"
              className="mr-2"
              checked={showDoor}
              onChange={(e) => setShowDoor(e.target.checked)}
            />
            Smart Door Lock
          </label>

          {showDoor && (
            <div className="p-5">
              <div className="flex">
                <div className="w-1/2 mr-4">
                  <label>Door Type *</label>
                  <select
                    className="p-2 border-b border-primary-color w-full"
                    onChange={(e) =>
                      setOptionalFeatures((prev) => ({
                        ...prev,
                        smartDoorLock: {
                          ...prev.smartDoorLock,
                          type: e.target.value,
                        },
                      }))
                    }
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="Wood">Wood</option>
                    <option value="Metal">Metal</option>
                    <option value="Glass">Glass</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label>Number of Locks *</label>
                  <input
                    type="number"
                    placeholder="i.e. 2"
                    className="outline-none border-b border-primary-color w-full"
                    onChange={(e) =>
                      setOptionalFeatures((prev) => ({
                        ...prev,
                        smartDoorLock: {
                          ...prev.smartDoorLock,
                          numberOfLocks: e.target.value,
                        },
                      }))
                    }
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Indoor Camera */}
          <label htmlFor="indoor" className="cursor-pointer font-semibold">
            <input
              id="indoor"
              type="checkbox"
              className="mr-2"
              checked={showIndoor}
              onChange={(e) => setShowIndoor(e.target.checked)}
            />
            Indoor Camera System
          </label>

          {showIndoor && (
            <div className="p-5">
              <div className="flex mb-5">
                <div className="w-1/2 mr-4">
                  <label>Number of Cameras *</label>
                  <input
                    type="number"
                    className="outline-none border-b border-primary-color w-full"
                    onChange={(e) =>
                      setOptionalFeatures((prev) => ({
                        ...prev,
                        indoorCameraSystem: {
                          ...prev.indoorCameraSystem,
                          count: e.target.value,
                        },
                      }))
                    }
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label>Connection *</label>
                  <div>
                    <label className="mr-3">
                      <input
                        type="radio"
                        name="connection"
                        value="Wireless"
                        onChange={(e) =>
                          setOptionalFeatures((prev) => ({
                            ...prev,
                            indoorCameraSystem: {
                              ...prev.indoorCameraSystem,
                              connection: e.target.value,
                            },
                          }))
                        }
                      />
                      Wireless
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="connection"
                        value="Wired"
                        onChange={(e) =>
                          setOptionalFeatures((prev) => ({
                            ...prev,
                            indoorCameraSystem: {
                              ...prev.indoorCameraSystem,
                              connection: e.target.value,
                            },
                          }))
                        }
                      />
                      Wired
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label>Resolution *</label>
                <div>
                  {["2", "4", "5", "8"].map((val) => (
                    <label key={val} className="mr-5">
                      <input
                        type="radio"
                        name="resolution"
                        value={`${val}MB`}
                        onChange={(e) =>
                          setOptionalFeatures((prev) => ({
                            ...prev,
                            indoorCameraSystem: {
                              ...prev.indoorCameraSystem,
                              resolution: e.target.value,
                            },
                          }))
                        }
                      />
                      {val}MB
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Outdoor Camera */}
          <label htmlFor="outdoor" className="cursor-pointer font-semibold">
            <input
              id="outdoor"
              type="checkbox"
              className="mr-2"
              checked={optionalFeatures.outdoorCameraSystem}
              onChange={(e) =>
                setOptionalFeatures((prev) => ({
                  ...prev,
                  outdoorCameraSystem: e.target.checked,
                }))
              }
            />
            Outdoor Camera System (CCTV)
          </label>

          {/* Smart Sensors */}
          <div className="mt-6">
            <p className="text-sm mb-3">Smart Sensors</p>
            {[
              "Door/Window Sensor",
              "Motion Sensor",
              "Temp/Humidity Sensor",
              "Smoke Sensor",
              "Gas Sensor",
              "Water Leakage Sensor",
            ].map((sensor) => (
              <div key={sensor} className="mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={smartSensors.includes(sensor)}
                  onChange={() => handleSensorChange(sensor)}
                />
                <label>{sensor}</label>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <Link
              to="/offerCustomize"
              className="bg-white px-6 py-3 border border-black hover:bg-primary-color hover:text-white duration-300"
            >
              Back
            </Link>
            <Link
              to="/lastPage"
              className="bg-primary-color text-white px-6 py-3"
              onClick={handleSave}
            >
              Next
            </Link>
          </div>
          <div className="text-center mt-2">Page {numberPage}/3</div>
        </div>
      </div>
    </div>
  );
};

export default SmartApp;
