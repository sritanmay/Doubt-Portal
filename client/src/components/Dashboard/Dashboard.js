import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import Profile from '../Profile/Profile';
import MyDoubts from '../MyDoubts/MyDoubts';
import OthersDoubts from '../OthersDoubts/OthersDoubts';
import AddDoubt from '../AddDoubt/AddDoubt';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: 'true',
      user: this.props.location.state.user,
      addDoubtBox : false
    }

    this.toggleAddDoubtBox = this.toggleAddDoubtBox.bind(this);
    this.rerender = this.rerender.bind(this);
  }

  rerender() {
    this.setState({ addDoubtBox: false });
  }

  toggleAddDoubtBox() {
    // console.log("Yess");
    this.setState(state => ({
      addDoubtBox: !state.addDoubtBox
    }));
  }

  render() {
    return (
      <div>
        <div>
          <Navigation isSignedIn={true} />
        </div>
        <div>
          <div id="tp">&nbsp;</div>
          <div id="tp">&nbsp;</div>
          <div id="tp">&nbsp;</div>
          { console.log(this.state.user)}
          <Profile user={this.state.user}/>
          <div id="addAnswer" style={{ 'text-align':'center'}}>{/* add doubt section */}
           <button class="dib link bg-black bw1 b--solid b--dark-green dark-green fw9 pa3 br3 hover-white hover-bg-dark-green"
              onClick={this.toggleAddDoubtBox}>
                            Ask a Doubt!
                        </button>
          </div>
          {this.state.addDoubtBox ? <AddDoubt user_id={this.state.user.user_id} rerender={this.rerender}/> : ''}
          <MyDoubts userid={this.state.user.user_id}/>
          <OthersDoubts userid={this.state.user.user_id}/>
        </div>

        <Footer />

      </div>
    );
  }
}

export default withRouter(Dashboard);
