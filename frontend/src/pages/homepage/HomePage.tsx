import { Hero } from "@/components/homepage/Hero";
// import { About } from "@/components/homepage/About";
import { Footer } from "@/components/homepage/Footer";
import { Features } from "@/components/homepage/Features";
import { Team } from "@/components/homepage/Team";
import { Cta } from "@/components/homepage/Cta";
import { FAQ } from "@/components/homepage/FAQ";
import { ScrollToTop } from "@/components/homepage/ScrollToTop";

interface Props {}

const HomePage = (_: Props) => {
  return (
    <>
      <Hero />
      <Features />
      {/* <About /> */}
      <Team />
      <Cta />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default HomePage;
