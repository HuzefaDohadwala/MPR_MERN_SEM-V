import React from "react";
import Navbar from "./Navbar";
import "./About.css";
import About1 from "./About1";
import About2 from "./About2";
import About3 from "./About3";
import Footer from "./Footer";

const About = () => {
  return (
    <>
      <Navbar></Navbar>
      <About1 />
      <About2 />
      <About3 />
      <Footer />
    </>
  );
};

export default About;
