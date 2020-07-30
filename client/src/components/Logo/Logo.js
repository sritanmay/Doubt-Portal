import React from 'react';
import Tilt from 'react-tilt';
import logoSP from '../../images/logoSP.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='ma0 pa0' style={{ 'margin': 'auto' }} title="Logo Made By Karan Bitode">
      <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 'auto', width: 500 }} >
        <div className="Tilt-inner pa3">
          <img style={{paddingTop: '5px'}} alt='logo' src={logoSP}/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;