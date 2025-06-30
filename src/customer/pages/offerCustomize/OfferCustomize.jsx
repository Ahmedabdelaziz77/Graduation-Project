import { useState, useEffect } from "react";
import RightOffer from "./RightOffer";
import ButtonNext from "./ButtonNext";

const OfferCustomize = () => {
  const [numberPage, setNumberPage] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
    requirements: "",
    homeType: "Villa",
    homeStatus: "UNDER_CONSTRUCTION",
    homeSize: 120,
    numberOfLevels: 1,
    numberOfRooms: 1,
    installationDate: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("offerStep1");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    localStorage.setItem("offerStep1", JSON.stringify(formData));
  };

  return (
    <div className="flex items-center gap-10 mt-10 p-20">
      <RightOffer />
      <div className="w-1/2">
        <h1 className="text-3xl mb-3 font-bold">Let's Discuss</h1>
        <h2 className="text-3xl mb-3 font-bold text-primary-color">
          Your Requirements!
        </h2>
        <div className="border border-primary-color p-5 rounded-lg">
          <div className="flex items-center overflow-hidden mb-10">
            <div className="mr-4">
              <label>First name *</label>
              <input
                className="outline-none border-b border-primary-color"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mr-4">
              <label>Last name *</label>
              <input
                className="outline-none border-b border-primary-color"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mr-4">
              <label>Mobile *</label>
              <input
                className="outline-none border-b border-primary-color"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex items-center overflow-hidden mb-10">
            <div className="mr-4">
              <label>Email *</label>
              <input
                className="outline-none border-b border-primary-color"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="">
              <label>Street Address *</label>
              <input
                className="w-[500px] outline-none border-b border-primary-color"
                name="street"
                value={formData.address.street}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex items-center overflow-hidden mb-10">
            <div className="mr-4">
              <label>City *</label>
              <input
                className="outline-none border-b border-primary-color"
                name="city"
                value={formData.address.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mr-4">
              <label>State *</label>
              <input
                className="outline-none border-b border-primary-color"
                name="state"
                value={formData.address.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mr-4">
              <label>Zipcode *</label>
              <input
                className="outline-none border-b border-primary-color"
                name="zipcode"
                value={formData.address.zipcode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="overflow-hidden mb-10">
            <label>Share with us your requirements *</label>
            <textarea
              className="p-2 w-[600px] outline-none border-b border-primary-color"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              required
            />
          </div>

          <div className="overflow-hidden mb-10">
            <h1 className="text-2xl mb-3 font-bold">About your home</h1>
            <div className="flex">
              <div className="w-1/3 mr-4">
                <label>Home Type *</label>
                <select
                  className="p-2 border-b border-primary-color"
                  name="homeType"
                  value={formData.homeType}
                  onChange={handleChange}
                  required
                >
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Chalet">Chalet</option>
                </select>
              </div>

              <div className="w-1/3 mr-4">
                <label>Home Status *</label>
                <select
                  className="p-2 border-b border-primary-color"
                  name="homeStatus"
                  value={formData.homeStatus}
                  onChange={handleChange}
                  required
                >
                  <option value="FINISHED">Finished</option>
                  <option value="UNDER_CONSTRUCTION">Under Construction</option>
                </select>
              </div>

              <div className="w-1/3">
                <label>Home Size (m²) *</label>
                <input
                  className="p-2 border-b border-primary-color"
                  name="homeSize"
                  type="number"
                  value={formData.homeSize}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center overflow-hidden mb-10">
            <div className="mr-4">
              <label>Number of Levels *</label>
              <input
                className="outline-none border-b border-primary-color"
                name="numberOfLevels"
                type="number"
                value={formData.numberOfLevels}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mr-4">
              <label>Number of Rooms *</label>
              <input
                className="outline-none border-b border-primary-color"
                name="numberOfRooms"
                type="number"
                value={formData.numberOfRooms}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mr-4">
              <label>Installation Date *</label>
              <input
                className="outline-none border-b border-primary-color"
                name="installationDate"
                type="date"
                value={formData.installationDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <ButtonNext
            setNumberPage={setNumberPage}
            formData={formData}
            onSave={handleSave}
          />
          <div className="text-center">Page {numberPage}/3</div>
        </div>
      </div>
    </div>
  );
};

export default OfferCustomize;
