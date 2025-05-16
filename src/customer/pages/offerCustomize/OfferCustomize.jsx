import { useState } from "react";
import RightOffer from "./RightOffer";
import ButtonNext from "./ButtonNext";

export const OfferCustomize = () => {
  const [numberPage, setNumberPage] = useState(1);
  return (
    <div className="flex items-center gap-10 mt-10 p-20">
      <RightOffer />
      <div className="w-1/2">
        <h1 className="text-3xl mb-3 font-bold">Let&apos;s Discuss</h1>
        <h2 className="text-3xl mb-3 font-bold text-primary-color">
          Your Requirements!
        </h2>
        <div className="border border-primary-color p-5 rounded-lg">
          <div className="flex items-center overflow-hidden mb-10">
            <div className="mr-4">
              <label className="" htmlFor="">
                First name *
              </label>
              <input
                className="outline-none border-b border-primary-color"
                type="text"
                required
              />
            </div>
            <div className="mr-4">
              <label className="" htmlFor="">
                Last name *
              </label>
              <input
                className="outline-none border-b border-primary-color"
                type="text"
                required
              />
            </div>
            <div className="mr-4">
              <label className="" htmlFor="">
                Mobile *
              </label>
              <input
                className="outline-none border-b border-primary-color"
                type="phone"
                required
              />
            </div>
          </div>
          <div className="flex items-center overflow-hidden mb-10">
            <div className="mr-4 ">
              <label htmlFor="">Email *</label>
              <br />
              <input
                className="outline-none border-b border-primary-color"
                type="email"
                required
              />
            </div>
            <div className="">
              <label htmlFor="">Address *</label>
              <br />
              <input
                className="w-[500px] outline-none border-b border-primary-color"
                type="address"
                required
              />
            </div>
          </div>
          <div className="overflow-hidden mb-10">
            <label htmlFor="">Share with us your requirements *</label>
            <br />
            <br />
            <textarea
              className="p-2 w-[600px] outline-none border-b border-primary-color"
              placeholder="i.e. I Wanna Make my home smart."
              required
            ></textarea>
          </div>
          <div className="overflow-hidden mb-10">
            <h1 className="text-2xl mb-3 font-bold">About your home</h1>
            <div className="flex">
              <form action="" className="w-1/3 mr-4">
                <label htmlFor="">Home Type *</label>
                <br />
                <br />
                <select
                  className="p-2 border-b border-primary-color"
                  id="houseType"
                  name="houseType"
                  required
                >
                  <option value="house">House/Villa</option>
                  <option value="apartment">Apartment</option>
                  <option value="chalet">Chalet</option>
                </select>
              </form>
              <form className="w-1/3 mr-4">
                <label htmlFor="">Home Status *</label>
                <br />
                <br />
                <select
                  className="p-2 border-b border-primary-color"
                  id="houseStatus"
                  name="houseStatus"
                  required
                >
                  <option value="finished">Finished</option>
                  <option value="under">Under Contruction</option>
                </select>
              </form>
              <form className="w-1/3">
                <label htmlFor="">Home Size *</label>
                <br />
                <br />
                <select
                  className="p-2 border-b border-primary-color"
                  id="houseType"
                  name="houseType"
                  required
                >
                  <option value="less60">Less than 60 m2</option>
                  <option value="between60-150">Between 60 - 150 m2</option>
                  <option value="between150-300">Between 150 - 300 m2</option>
                  <option value="more300">More than 300 m2</option>
                </select>
              </form>
            </div>
          </div>
          <div className="flex items-center overflow-hidden mb-10">
            <div className="mr-4">
              <label className="" htmlFor="">
                Number of levels *
              </label>
              <input
                className="outline-none border-b border-primary-color"
                type="text"
                placeholder="1.e.2 floors"
                required
              />
            </div>
            <div className="mr-4">
              <label className="mb-10" htmlFor="">
                Number of rooms *
              </label>
              <input
                className="outline-none border-b border-primary-color"
                type="text"
                placeholder="1.e.3 rooms"
                required
              />
            </div>
            <div className="mr-4">
              <label className="" htmlFor="">
                Installation date *
              </label>
              <input
                className="outline-none border-b border-primary-color"
                type="date"
                required
              />
            </div>
          </div>
          <ButtonNext setNumberPage={setNumberPage} />
          <div className="text-center">page {numberPage}/3</div>
        </div>
      </div>
    </div>
  );
};
export default OfferCustomize;
