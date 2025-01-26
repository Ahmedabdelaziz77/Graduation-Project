import React from "react";
import img1 from "../../../../images/aboutImg1.avif";
import img2 from "../../../../images/aboutImg2.avif";
export const About = () => {
  return (
    <>
      <div className="p-20 flex items-center justify-center gap-10">
        <div className="w-1/2">
          <img src={img1} alt="" />
        </div>
        <div className="w-1/2">
          <span className="text-primary-color font-bold text-lg mb-5">
            WHAT IS
          </span>
          <h2 className="font-bold text-2xl mb-4 text-gray-500">
            HOME AUTOMATION
          </h2>
          <p className="text-gray-700 mb-5">
            We provide you the state of the art of Smart Home technology that
            enable you to monitor and control your smart home devices such as
            front smart door lock, smart lighting, smart security camera system,
            smart universal IR remote control for TVs and air conditions, smart
            curtains or smart shutters switches, smart led and bulb for
            entertainment systems, and appliances. It may also include smart
            house security such as smart access control and automated alarm
            systems.
          </p>
          <p className="text-gray-700 mb-5">
            A smart home technology typically connects controlled smart devices
            either directly to the wifi network or through a central smart home
            gateway such as zigbee smart hub, or with KNX system. The user
            interface for control of the system uses either mobile-App, voice
            assistant, wall-mounted smart panels, and tablets. The mobile
            application, or a Web interface that may also be accessible off-site
            through the Internet wherever you are.
          </p>
          <button className="bg-primary-color px-6 py-3 mt-5 text-white">
            Know More
          </button>
        </div>
      </div>

      <div className="p-20 flex items-center justify-center gap-10 bg-gray-200">
        <div className="w-1/2">
          <span className="text-primary-color font-bold text-lg mb-5">
            MAKE YOUR
          </span>
          <h2 className="font-bold text-2xl mb-4 text-gray-500">LIFE SMART</h2>
          <p className="text-gray-700 mb-5">
            Let your smart house make your life even more easier, smarter and
            save money. Build your home security and family safety by configure
            and schedule your smart home automation connected devices such as
            video doorbell, and smart door lock to monitor, open or close the
            front door remotely as well as get notified with any access event.
            Moreover, the controlled devices such as thermostats and switches to
            adjust your own scenario 'Wake-Up Mode' or 'Away From Home Mode'
            automatically and according to your schedule.
          </p>
          <p className="text-gray-700">
            In addition, with the smart security camera systems, smart lock,
            smart sensors such as motion sensor, door window sensor, smoke
            alarm, gas sensor, and water leakage sensor, so you can receive real
            time notifications on the mobile device app to alert you if any
            potential dangers or property damage happened, all with just a click
            or voice command to arm the smart house security camera system.
            Moreover, check on your smart home from anywhere using the mobile
            app, adjust the temperature, camera's view, Air conditions control,
            curtain closure, lighting density and colours, energy efficiency,
            and much more
          </p>
        </div>
        <div className="w-1/2">
          <img src={img2} alt="" />
        </div>
      </div>
    </>
  );
};
