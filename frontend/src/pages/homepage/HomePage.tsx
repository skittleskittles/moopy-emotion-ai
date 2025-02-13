import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import reactLogo from "../../assets/react.svg";
import viteLogo from "../../../public/vite.svg";
import { Hero } from "@/components/homepage/Hero";
import { About } from "@/components/homepage/About";
import { HowItWorks } from "@/components/homepage/HowItWorks";
import { Features } from "@/components/homepage/Features";
import { Cta } from "@/components/homepage/Cta";
import { FAQ } from "@/components/homepage/FAQ";
import { ScrollToTop } from "@/components/homepage/ScrollToTop";

interface Props {}

const HomePage = (props: Props) => {
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
    </>
  );
};

export default HomePage;
