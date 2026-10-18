import React from 'react';
import Hero from '../components/Hero';
import HeroVideo from '../components/HeroVideo';
import About from '../components/About';
import Stats from '../components/Stats';
import Service from '../components/Service';
import BestWork from '../components/BestWork';
import Review from '../components/Review';
const Home = () => {
  return (
    <>
      <Hero />
     
      <About />
      <Stats />
      <Service/>
      <BestWork />
      <Review/>
      {/* <Review /> */} {/* <-- Is line ko bhi hata dein */}
    </>
  );
};

export default Home;