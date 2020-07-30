import React from 'react';
import { withRouter } from 'react-router-dom';

class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content:''
    }
  }

  onContentChange = (event) => {
    this.setState({content: event.target.value})
  }


  onSubmitAnswer = () => {
    fetch('/api/addanswer', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ans_content: this.state.content,
        ans_of_doubt_id: this.props.doubt_id,
        ans_posted_by: 19//TBD
      })
    })
      .then(response => response.json())
      .then(() => {
        console.log("SuccessFul Submission of answer")
        this.props.rerender();
      })
  }

  render() {
    return (
        <main className="w-40 pa4 black-80 br3 ba b--black-10 mv4 w-60-m w-80-l mw6" 
              style={{ 'margin': '50px', 'backgroundColor': 'gray', 'boxShadow': '4px 4px 8px 0px rgba( 192, 192, 192, 0.5 )', 'marginLeft':'auto', 'marginRight':'auto' }}>
          <div className="measure">
            <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
              <legend className="center f2 fw6 ph0 mh0">Add Answer</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f5" htmlFor="content">Enter Answer Content</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="content"
                  id="content"
                  onChange={this.onContentChange}
                />
              </div>
            </fieldset>
            <div className="center">
              <input
                onClick={this.onSubmitAnswer}
                className="b br2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Submit Answer"
              />
            </div>
          </div>
        </main>
    );
  }
}

export default withRouter(AddAnswer);