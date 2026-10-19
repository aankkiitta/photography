import React from 'react';
import Hero from '../components/Hero';
import HeroVideo from '../components/HeroVideo';
import About from '../components/About';
import Stats from '../components/Stats';
import Service from '../components/Service';
import BestWork from '../components/BestWork';
import Review from '../components/Review';
import FollowUs from '../components/FollowUs';
import Showcase from '../components/Showcase';
import CameraHero from '../components/CameraHero';
const Home = () => {
  return (
    <>
      <CameraHero/>
      <Service/>
      <BestWork />
      <Showcase/>
      <About />
      <Stats />
 
      <Review/>
           
      <FollowUs/>

    </>
  );
};

export default Home;