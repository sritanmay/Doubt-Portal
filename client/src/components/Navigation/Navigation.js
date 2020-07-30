import React from 'react';
import { Link } from 'react-router-dom';
import logoSP from '../../images/logoSP.png';

const Navigation = ({ isSignedIn, signinregStatus, setSigninRegStatus/*, onRouteChange, route*/ }) => {
    if (isSignedIn) {
      return (
        <header className="bg-black-40 fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l" style={{top:0}}>
          
          <nav className="f4 fw6 ttu tracked" style={{'display': 'flex', 'justifyContent': 'flex-end'}}>
            <div className="link dim white dib mr3" style={{ 'marginRight':'auto' }}>
              <Link to='/dashboard'>
                <img src={logoSP} style={{ 'height':'40px', 'width':'auto'}} alt="Logo"/>
              </Link>
            </div>
            {/*<Link to='/dashboard'>
              <div className="link dim white dib mr3" title="Home">
                Home
              </div>
            </Link>*/}
            <Link to='/'>
              <div className="link dim white dib" title="Sign Out">
                Sign Out
              </div>
            </Link>
          </nav>
        </header>
      );
    } else {
      return (
        <header className="bg-black-90 fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l" style={{top:0}}>
          <nav className="f4 fw6 ttu tracked" style={{display: 'flex', justifyContent: 'flex-end'}}>
            <a className="link dim white dib mr3" href="#tp" style={{ 'marginRight':'auto' }}>
              <img src={logoSP} style={{ 'height':'40px', 'width':'auto'}} alt="Logo"/>
            </a>
            <a className="link dim white dib mr3" href="#tp" title="Home">Home</a>
            <a className="link dim white dib mr3" href="#about" title="About">About</a>
            <a className="link dim white dib mr3" href="#contact" title="Contact">Contact</a>
            { signinregStatus === 'signin'
              ?  <a className="link dim white dib" href="#tp" title="Register" onClick={() => setSigninRegStatus('register')}>Register</a>
              :   <a className="link dim white dib" href="#tp" title="Sign In" onClick={() => setSigninRegStatus('signin')}>Sign In</a>
            }
          </nav>
        </header>
      );
    }
}

export default Navigation;