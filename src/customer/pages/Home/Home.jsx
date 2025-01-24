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
      <Deal />
      <Customize />
      <OurServices />
      <GetAppointment />
    </>
  );
}

export default Home;
