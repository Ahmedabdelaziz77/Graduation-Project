import GetAppointment from "./appointment/GetAppointment";
import Category from "./category/Category";
import Customize from "./customize/Customize";
import Deal from "./Deal/Deal";
import LandingVedio from "./LandingVideo/LandingVideo";
import OurServices from "./ourServices/OurServices";
import InspireIdea from "./inspireIdea/InspireIdea";
import About from "./about/About";
import OCRMatcher from "./OCRMatcher/OCRMatcher";
import SmartRoomAI from "./SmartRoomAI/SmartRoomAI";
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
      <OCRMatcher />
      <SmartRoomAI />
      <GetAppointment />
    </>
  );
}

export default Home;
