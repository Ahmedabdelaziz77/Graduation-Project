import { InspireIdea } from "../inspireIdea/InspireIdea";
import { About } from "./about/About";
import GetAppointment from "./appointment/GetAppointment";
import Category from "./category/Category";
import Customize from "./customize/Customize";
import Deal from "./Deal/Deal";
import LandingVedio from "./LandingVideo/LandingVideo";
import OurServices from "./ourServices/OurServices";

function Home() {
  return (
    <>
      <Category />
      <LandingVedio />
      <About />
      <Deal />
      <Customize />
      <InspireIdea />
      <OurServices />
      <GetAppointment />
    </>
  );
}

export default Home;
