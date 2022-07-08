import React from 'react';
import { Navigation } from './Navigation';


const Header = () => (
  <header className='header'>
       <div className='blue-ribbon-container'>
  <Navigation />
  </div>
  <div className='content-container'>
 
    <div className='header-flex-wrapper'>
   <h1 className='header-title'>Draw and Explore</h1>

   </div>
   </div>
  </header>
);

export default Header;