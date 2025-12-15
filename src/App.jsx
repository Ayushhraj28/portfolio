import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Works from './components/Works';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Starfield from './components/Starfield';

import Chatbot from './components/Chatbot';

const App = () => {
  useEffect(() => {
    // Initialize Google Analytics
    ReactGA.initialize('G-JBHM4GKJXR');

    // Send pageview with a custom path
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <div className="relative z-0 bg-primary font-sans">

      <Starfield />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Works />
      <Experience />
      <Reviews />
      <Contact />
    </div>
  );
}

export default App;
