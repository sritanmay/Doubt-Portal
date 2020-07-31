import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Signin from '../Signin/Signin';
import Register from '../Register/Register';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import me from '../../images/me.jpg';
import annotations from '../../images/annotations.jpg';
import timetable from '../../images/timetable.jpg';
import books from '../../images/books.jpg';
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
                      <img src={annotations} alt="Doubt" className="mw5" />
                    </div>
                    <div className="v-mid pl3 w-50 pr6" style={{ 'textAlign':'center'}}>
                      <p className="lh-copy">
                      Next time you have a doubt while studying, you know where to go. By simply posting your questions on our Doubt Forum, you can have them answered by academic experts.
                      </p>
                    </div>
                  </div>
                  <div className="br2 pv3-m pv2-ns" style={{ 'display':'flex', 'alignItems':'center', 'background':'gray', 'margin':'20px 100px'}}>
                    <div className="v-mid pl3 w-50" style={{ 'textAlign':'center'}}>
                      <p className="lh-copy">
                        Books...COMING SOON
                      </p>
                    </div>
                    <div className="v-mid w-50" style={{ 'textAlign':'center'}}>
                      <img src={books} alt="A bright blue sky" className="mw5" />
                    </div>
                  </div>
                  <div className="br2 pv3-m pv2-ns" style={{ 'display':'flex', 'alignItems':'center', 'background':'gray', 'margin':'20px 100px'}}>
                    <div className="v-mid w-50" style={{ 'textAlign':'center'}}>
                      <img src={timetable} alt="A bright blue sky" className="mw5" />
                    </div>
                    <div className="v-mid pl3 w-50" style={{ 'textAlign':'center'}}>
                      <p className="lh-copy">
                       Time-Tables...COMING SOON
                      </p>
                    </div>
                  </div>
                </div>


                <div id="contact">{/*Contact section*/}
                  <div><p className="f1" style={{ 'textAlign':'center', 'color':'white', 'marginTop':'50px'}}>Contact</p></div>
                  <div className="br2 pv3-m pv2-ns" style={{ 'display':'flex', 'alignItems':'center', 'background':'gray', 'margin':'20px 100px'}}>
                    <div className="v-mid pl5 w-50" style={{ 'textAlign':'center'}}>
                      <p className="lh-copy">
                      Hi, I'm Tanmaya Srivastava, a programmer/developer from Bhopal, India. I am currently doing my Bachelors in Computer Science & Engineering from National Institute of Technology, Bhopal.
                      </p>
                    </div>
                    <div className="v-mid w-50" style={{ 'textAlign':'center'}}>
                      <img src={me} alt="Me" className="mw5 br-100" style={{'height':'auto'}} />
                    </div>
                  </div>
                </div>

              <Footer />


              </div>

            )
        
      </div>
    );
  }
}

export default Home;
