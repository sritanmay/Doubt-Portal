import React from 'react';
import { Link } from 'react-router-dom';

class DoubtCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doubt_id: '',
      doubt_title: '',
      doubt_raise_date: '',
      doubt_content: '',
      doubt_answered: false,
      doubt_raised_by: ''
    }
  }
  //this.props.user_logged_in

  componentDidMount() {
    fetch('/api/doubtcard', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        doubt_id: this.props.doubt_id
      })
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
      })
  }

  render() {
    const newTo = { 
      pathname: `/doubt/${this.state.doubt_id}`, 
      user_logged_in: `${this.props.user_logged_in}`
    };
    return (
        <article className="mw6-ns br3 ba b--black-10 mv3" style={{ 'marginRight': 'auto', 'marginLeft': 'auto', 'width':'100%'}}>
          {/*<Link to={`/doubt/${this.state.doubt_id}`}>*/}
          <Link to={newTo}>
            <div className="f4 bg-black br3 br--top white mv0 pv2 ph3 hover-green">{this.state.doubt_title}</div>
            <div className="pa3 bt b--black-10 bg-near-white black hover-bg-light-green">
             <div style={{'display':'flex'}}>
               <p>{`Asked on : ${this.state.doubt_raise_date.toString().slice(0,10)}`}</p>
               { this.state.doubt_answered ? <p style={{'marginLeft':'auto'}}>{`Solved :  Yes`}</p> : <p style={{'marginLeft':'auto'}}>{`Solved :  Not Yet`}</p> }
             </div>
              <p className="f6 f5-ns lh-copy measure">{this.state.doubt_content}</p>
              
            </div>
          </Link>
        </article>
    );
  }
}

export default DoubtCard;