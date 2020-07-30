import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Signin from '../Signin/Signin';
import Register from '../Register/Register';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import tanmay from '../../images/tanmay.png';
import '../../App.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      signinregStatus : 'signin', //signin or register
      isSignedIn: false
    }
  }

  setSigninRegStatus = (signinregStatus) => {
    this.setState({ signinregStatus: signinregStatus})
  }

  render() {
    return (
      <div>
        <div>
          <Navigation isSignedIn={false} signinregStatus={this.state.signinregStatus} setSigninRegStatus={this.setSigninRegStatus}/>
        </div>
              <div>
                <div id="tp">
                  &nbsp;
                </div>
                <div className='right ml5 mt5'>
                  <div className='w-60 center' style={{ float: 'left' }}>
                    <Logo />
                  </div>
                 { this.state.signinregStatus === 'signin'
                   ? <Signin />
                   : <Register />
                  }
                </div>


                <div id="about"> {/*about section*/}
                  <div><p className="f1" style={{ 'textAlign':'center', 'color':'white', 'marginTop':'50px'}}>About</p></div>
                  <div className="br2 pv3-m pv2-ns" style={{ 'display':'flex', 'alignItems':'center', 'background':'gray', 'margin':'20px 100px'}}>
                    <div className="v-mid w-50" style={{ 'textAlign':'center'}}>
                      <img src="http://tachyons.io/img/super-wide.jpg" alt="A bright blue sky" className="mw5" />
                    </div>
                    <div className="v-mid pl3 w-50" style={{ 'textAlign':'center'}}>
                      <p className="lh-copy">
                        This text is vertically aligned middle, no matter what the height of the image is.
                      </p>
                    </div>
                  </div>
                  <div className="br2 pv3-m pv2-ns" style={{ 'display':'flex', 'alignItems':'center', 'background':'gray', 'margin':'20px 100px'}}>
                    <div className="v-mid pl3 w-50" style={{ 'textAlign':'center'}}>
                      <p className="lh-copy">
                        This text is vertically aligned middle, no matter what the height of the image is.
                      </p>
                    </div>
                    <div className="v-mid w-50" style={{ 'textAlign':'center'}}>
                      <img src="http://tachyons.io/img/super-wide.jpg" alt="A bright blue sky" className="mw5" />
                    </div>
                  </div>
                  <div className="br2 pv3-m pv2-ns" style={{ 'display':'flex', 'alignItems':'center', 'background':'gray', 'margin':'20px 100px'}}>
                    <div className="v-mid w-50" style={{ 'textAlign':'center'}}>
                      <img src="http://tachyons.io/img/super-wide.jpg" alt="A bright blue sky" className="mw5" />
                    </div>
                    <div className="v-mid pl3 w-50" style={{ 'textAlign':'center'}}>
                      <p className="lh-copy">
                        This text is vertically aligned middle, no matter what the height of the image is.
                      </p>
                    </div>
                  </div>
                </div>


                <div id="contact">{/*Contact section*/}
                  <div><p className="f1" style={{ 'textAlign':'center', 'color':'white', 'marginTop':'50px'}}>Contact</p></div>
                  <div className="br2 pv3-m pv2-ns" style={{ 'display':'flex', 'alignItems':'center', 'background':'gray', 'margin':'20px 100px'}}>
                    <div className="v-mid pl3 w-50" style={{ 'textAlign':'center'}}>
                      <p className="lh-copy">
                        My name is Tanmaya Srivastava
                      </p>
                    </div>
                    <div className="v-mid w-50" style={{ 'textAlign':'center'}}>
                      <img src={tanmay} alt="Tanmaya" className="mw5 br-100" />
                    </div>
                  </div>
                </div>

              <Footer />


              </div>

            )
        }
      </div>
    );
  }
}

export default Home;
