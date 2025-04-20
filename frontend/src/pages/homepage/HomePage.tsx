import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/Routes";
import { Hero } from "@/components/homepage/Hero";
import { About } from "@/components/homepage/About";
import { HowItWorks } from "@/components/homepage/HowItWorks";
import { Features } from "@/components/homepage/Features";
import { Cta } from "@/components/homepage/Cta";
import { FAQ } from "@/components/homepage/FAQ";
import { ScrollToTop } from "@/components/homepage/ScrollToTop";

interface Props {}

const HomePage = (_: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <Hero />
      {/* <Sponsors /> */}
      <About />
      <HowItWorks />
      <Features />
      {/* <Services /> */}
      <Cta />
      {/* <Testimonials /> */}
      {/* <Team /> */}
      {/* <Pricing /> */}
      {/* <Newsletter /> */}
      <FAQ />
      {/* <Footer /> */}
      <ScrollToTop />

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>How are you Feeling Today?</h1>
        <Button onClick={() => navigate(ROUTE_PATHS.MOOD_TRACKER)}>Mood</Button>
      </div>
    </>
  );
};

export default HomePage;
