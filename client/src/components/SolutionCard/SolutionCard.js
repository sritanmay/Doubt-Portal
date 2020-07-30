import React from 'react';

class SolutionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ans_id: '',
      ans_of_doubt_id: '',
      ans_content: '',
      ans_posted_by: '',
      ans_date: '',
      userName:''
    }
  }

  componentDidMount() {
    fetch('/api/solutioncard', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ans_id: this.props.ans_id
      })
    })
      .then(response => response.json())
      .then(answer => {
        this.setState( {
          ans_id: answer.doubt_id,
          ans_of_doubt_id: answer.ans_of_doubt_id,
          ans_date: answer.ans_date,
          ans_content: answer.ans_content,
          ans_posted_by: answer.ans_posted_by
        })
        // console.log(this.state.ans_posted_by);
        fetch('/api/solutionpostedby', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            user_id: this.state.ans_posted_by
          })
        })
          .then(response => response.json())
          .then(user => {
            this.setState({
              userName: user.name
            })
          })
      })
  }

  render() {
    return (
        <article className="mw8-ns ba b--black-10 mv3" style={{ 'marginRight': 'auto', 'marginLeft': 'auto', 'width':'100%'}}>
          <div className="pa3 br2 bt b--black-10 bg-mid-gray black">
            <p className="f6 f4-ns lh-copy measure">Posted By : {this.state.userName}</p>
            <p className="f6 f4-ns lh-copy measure">{this.state.ans_content}</p>
          </div>
        </article>
    );
  }
}

export default SolutionCard;