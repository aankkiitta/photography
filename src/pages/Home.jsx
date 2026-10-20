import React from 'react';
import Hero from '../components/Hero';
import HeroVideo from '../components/HeroVideo';
import About from '../components/About';
import Stats from '../components/Stats';
import Service from '../components/Service';
import BestWork    from '../components/BestWork';
import FAQ from '../components/FAQ';
import Review from '../components/Review';
import FollowUs from '../components/FollowUs';
import Showcase from '../components/Showcase';
import ContactCTA from '../components/ContactCTA';
import FilmStripReview from '../components/FilmStripReview';
import FusionProduction from '../components/FusionProduction';
import FilmRollReviews from '../components/FilmRollReviews';

const Home = () => {
  return (
    <>
      {/* Animation component sabse upar hai, ye poori screen cover karega */}
      <FusionProduction/>

      <Service />
      <BestWork />

      <About />
      <Stats />
        <Showcase />
     
      <FAQ/>
      <FilmStripReview/>
      <FilmRollReviews/>
        <Review />
      <ContactCTA/>
      <FollowUs />
    </>
  );
};

export default Home;