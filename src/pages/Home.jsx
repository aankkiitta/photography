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

// Yahan spelling exactly file ke naam jaisi honi chahiye
import FusionProduction from '../components/FusionProduction';

const Home = () => {
  return (
    <>
      {/* Animation component sabse upar hai, ye poori screen cover karega */}
      <FusionProduction/>

      <Service />
      <BestWork />
      <Showcase />
      <About />
      <Stats />
      <Review />
      <FollowUs />
    </>
  );
};

export default Home;