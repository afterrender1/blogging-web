import React from "react";
import AllPosts from "./AllPosts";
import Navbar from "./Navbar";
import Hero from "./Hero";

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <AllPosts />
    </div>
  );
};

export default Home;
