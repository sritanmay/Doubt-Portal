import React from 'react';
import DoubtCard from './../DoubtCard/DoubtCard';

class OthersDoubts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      othersdoubtsCount: '', //fetched from db
      othersdoubtsArray : [],
    }
  }

  componentDidMount() {
    fetch(`/api/othersdoubts`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: this.props.userid
      })
    })
      .then(response => response.json())
      .then(othersdoubtsArray => {
        //doubts is array of objects
        console.log(othersdoubtsArray);
        this.setState({othersdoubtsCount : othersdoubtsArray.length});
        this.setState({ othersdoubtsArray });
      })
  }

  render() {
    return (
        <div id="othersdoubts">{/*Others Doubts section*/}
          <div><p className="f1" style={{ 'textAlign':'center', 'color':'white', 'marginTop':'50px'}}>Other Doubts</p></div>
          <div style={{'background':'gray', 'margin':'20px 100px'}} className="br2 pb3">
            <div className="mt0 pv2-m pv1-ns" style={{ 'display':'flex', 'alignItems':'center'}}>
              <div className="v-mid pl3 w-100 f4" style={{ 'textAlign':'center', 'margin': '0px 50px'}}>
                <p className="lh-copy">{`Doubts Count      :      ${this.state.othersdoubtsCount}`}</p>
              </div>
            </div>
            <div className="flex flex-column" style={{'margin':'0px 100px'}}>
             {this.state.othersdoubtsArray.map((doubtObject) => <DoubtCard key={doubtObject.doubt_id} doubt_id={doubtObject.doubt_id} />)} 
            </div>
            </div>        
        </div>
    );
  }
}

export default OthersDoubts;