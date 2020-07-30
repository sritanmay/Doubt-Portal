import React from 'react';
import DoubtCard from './../DoubtCard/DoubtCard';

class MyDoubts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      mydoubtsCount: '', 
      mydoubtsArray : [], //fetched from db
    }
  }

  componentDidMount() {
    fetch(`/api/mydoubts`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: this.props.userid
      })
    })
      .then(response => response.json())
      .then(mydoubtsArray => {
        //mydoubtsArray is array of objects
        console.log(mydoubtsArray);
        this.setState({mydoubtsCount : mydoubtsArray.length});
        this.setState({ mydoubtsArray });
        // console.log('Mydoubtscount = '+ this.state.mydoubtsCount);
        // console.log('Doubts rry = '+ this.state.mydoubtsArray);
      })
  }

  render() {
    const userid = this.props.userid;
    // const user = this.props.user;
    console.log('mydoubts.js - userid ='+userid);
    return (
        <div id="mydoubts">{/*My Doubts section*/}
          <div><p className="f1" style={{ 'textAlign':'center', 'color':'white', 'marginTop':'50px'}}>My Doubts</p></div>
          <div style={{'background':'gray', 'margin':'20px 100px'}} className="br2 pb3">
            <div className="mt0 pv2-m pv1-ns" style={{ 'display':'flex', 'alignItems':'center'}}>
              <div className="v-mid pl3 w-100 f4" style={{ 'textAlign':'center', 'margin': '0px 50px'}}>
                <p className="lh-copy">{`Doubts Count      :      ${this.state.mydoubtsCount}`}</p>
                <p className="lh-copy">{`User Id     :      ${userid}`}</p>
              </div>
            </div>
            <div className="flex flex-column" style={{'margin':'0px 100px'}}>
             { this.state.mydoubtsArray.map((doubtObject) => <DoubtCard key={doubtObject.doubt_id} user_logged_in={userid} doubt_id={doubtObject.doubt_id}  />)}
            </div>
            </div>        
        </div>
    );
  }
}

export default MyDoubts;