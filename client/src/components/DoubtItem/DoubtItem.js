import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import SolutionCard from '../SolutionCard/SolutionCard';
import AddAnswer from '../AddAnswer/AddAnswer';

class DoubtItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doubt_id: 0,
      doubt_title: '',
      doubt_raise_date: '',
      doubt_content: '',
      doubt_answered: false,
      doubt_raised_by: '',
      answers:[],
      answers_count:0,
      userName:'', //doubt asked by
      addAnswerBox : false,
      user_logged_in:''
      // rerenderToggle: false
    }

    this.toggleAddAnswerBox = this.toggleAddAnswerBox.bind(this);
    this.rerender = this.rerender.bind(this);
  }

  rerender() {
    this.setState({ addAnswerBox: false });
  }

  toggleAddAnswerBox() {
    // console.log("Yess");
    this.setState(state => ({
      addAnswerBox: !state.addAnswerBox
    }));
  }

  componentDidMount() {
    fetch(`/api/doubt/${this.props.match.params.doubt_id}`, {
      method: 'get',
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
      .then(doubt => {
        this.setState( {
          doubt_id: doubt.doubt_id,
          doubt_title: doubt.doubt_title,
          doubt_raise_date: doubt.doubt_raise_date,
          doubt_content: doubt.doubt_content,
          doubt_answered: doubt.doubt_answered,
          doubt_raised_by: doubt.doubt_raised_by
        })
        fetch('/api/doubtpostedby', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            user_id: this.state.doubt_raised_by
          })
        })
          .then(response => response.json())
          .then(user => {
            this.setState({
              userName: user.name
            })
          })
      })

    fetch(`/api/solutionfordoubt`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        doubt_id: this.props.match.params.doubt_id
      })
    })
      .then(response => response.json())
      .then(answers => {
        //answers is array of objects
        this.setState({answers_count : answers.length});
        this.setState({ answers });
      })

// console.log("Doubtitem "+JSON.stringify(this.props));
      /*this.setState({
        user_logged_in:this.props.location.user_logged_in
      })*/
  }
  

  render() {
    return (
      <div>
        <div>
          <Navigation isSignedIn={true} />
        </div>
        <div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>

          <div id="doubtDetails">{/*Doubt details*/}
            <div><p className="f1" style={{ 'textAlign':'center', 'color':'white', 'marginTop':'50px'}}>{this.state.doubt_title}</p></div>
            <div className="br2 mt0 pv2-m pv1-ns" style={{ 'display':'flex', 'alignItems':'center', 'background':'gray', 'margin':'20px 100px'}}>
              <div className="v-mid pl3 w-100 f4" style={{ 'margin': '0px 50px'}}>
                {/*<p className="lh-copy">Doubt_id      :      {this.state.doubt_id}</p>*/}
                <div style={{ 'display':'flex' }}>
                  <p className="lh-copy">Solved    :      { this.state.doubt_answered ? "Yes" : "Not Yet" }</p>
                  <p className="lh-copy" style={{ marginLeft:'auto'}}>Doubt Raised On     :      {this.state.doubt_raise_date.toString().slice(0,10)}</p>
                </div>
                <p className="lh-copy">Doubt Raised By      :      {this.state.userName}</p>
                <p className="lh-copy">Content  :      {this.state.doubt_content}</p>
              </div>
            </div>
          </div>

          <div id="addAnswer" style={{ 'text-align':'center'}}>{/* add answer section */}
            <button class="dib link bg-black bw1 b--solid b--dark-green dark-green fw9 pa3 br3 hover-white hover-bg-dark-green"
              onClick={this.toggleAddAnswerBox}>
                            Add an Answer!
            </button>
          </div>
{/*console.log(this.state.user_logged_in)*/}
          {this.state.addAnswerBox ? <AddAnswer doubt_id={this.props.match.params.doubt_id} rerender={this.rerender}/> : ''}

          <div id="doubtAnswers">{/*Doubt answers section*/}
            <div><p className="f1" style={{ 'textAlign':'center', 'color':'white', 'marginTop':'50px'}}>Solutions Available</p></div>
            <div className="br2 mt0 pv2-m pv1-ns" style={{ 'display':'flex', 'alignItems':'center', 'background':'gray', 'margin':'20px 100px'}}>
              <div className="v-mid pl3 w-100 f4" style={{ 'margin': '0px 50px'}}>
                <div className="flex flex-column" style={{'margin':'0px 100px'}}>
                 { this.state.answers.map((solutionObject) => <SolutionCard ans_id={solutionObject.ans_id} />)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />

      </div>
    );
  }
}

export default DoubtItem;