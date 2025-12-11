import React from "react";
import AllPosts from "./AllPosts";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <AllPosts />
      <Footer/>
    </div>
  );
};

export default Home;
