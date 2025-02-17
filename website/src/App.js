import React,{useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/pages/Home"
import About from "./components/pages/About"

import WebFont from 'webfontloader';
import CFChallengeScript from './components/CFChallengeScript';
import ContactUs from './components/pages/Contact';

import CategoryList from './components/CategoryList';

const App = () => {

  //const currentPage = window.location.pathname;
  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          'Open+Sans:300,400,600,700,800',
          'Poppins:300,400,500,600,700,800',
          'Oswald:300,400,500,600,700,800'
        ]
      }
    });
  }, []);

  return (
    <>
    <Router>
      <Routes>
        <Route path='/c' element={<CategoryList/>} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/ContactUs" element={< ContactUs/>}/>
      </Routes>
    </Router>
      <CFChallengeScript/>
    </>
  );
};

export default App;
