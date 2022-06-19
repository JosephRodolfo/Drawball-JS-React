import React from 'react';
import { Navigation } from './Navigation';


const Header = () => (
  <header className='header'>
  <div className='content-container'>
    <div className='header-flex-wrapper'>
   <h1>Draw and Explore</h1>
   </div>
   <Navigation />
   </div>
  </header>
);

export default Header;