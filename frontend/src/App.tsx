import { About } from "./components/homepage/About";
import { Cta } from "./components/homepage/Cta";
import { FAQ } from "./components/homepage/FAQ";
import { Features } from "./components/homepage/Features";
import { Footer } from "./components/homepage/Footer";
import { Hero } from "./components/homepage/Hero";
import { HowItWorks } from "./components/homepage/HowItWorks";
import { Navbar } from "./components/Navbar";
import { Newsletter } from "./components/homepage/Newsletter";
import { Pricing } from "./components/homepage/Pricing";
import { ScrollToTop } from "./components/homepage/ScrollToTop";
import { Services } from "./components/homepage/Services";
import { Sponsors } from "./components/homepage/Sponsors";
import { Team } from "./components/homepage/Team";
import { Testimonials } from "./components/homepage/Testimonials";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
