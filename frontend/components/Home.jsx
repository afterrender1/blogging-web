import React from "react";
import AllPosts from "./AllPosts";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <AllPosts />
      <Footer/>
      <ScrollToTop/>
    </div>
  );
};

export default Home;
