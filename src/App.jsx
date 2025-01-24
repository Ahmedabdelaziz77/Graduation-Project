import { ThemeProvider } from "@mui/material";
import Navbar from "./customer/components/Navbar/Navbar";
import customTheme from "./theme/customTheme";
import Home from "./customer/pages/Home/Home";
import Product from "./customer/pages/product/Product";
function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Navbar />
        <Home />
        {/* <Product /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
