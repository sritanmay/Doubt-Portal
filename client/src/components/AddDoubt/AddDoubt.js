import React from 'react';
import { withRouter } from 'react-router-dom';

class AddDoubt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doubt_title:'',
      doubt_content:'',
      doubt_raised_by: this.props.user_id
    }
  }

  onTitleChange = (event) => {
    this.setState({doubt_title: event.target.value})
  }

  onContentChange = (event) => {
    this.setState({doubt_content: event.target.value})
  }


  onSubmitDoubt = () => {
    fetch('/api/adddoubt', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
       doubt_title: this.state.doubt_title,
       doubt_content: this.state.doubt_content,
       doubt_raised_by: this.state.doubt_raised_by
      })
    })
      .then(response => response.json())
      .then(() => {
        console.log("SuccessFul Submission of Doubt")
        this.props.rerender();
      })
  }

  render() {
    return (
        <main className="w-40 pa4 black-80 br3 ba b--black-10 mv4 w-60-m w-80-l mw6" 
              style={{ 'margin': '50px', 'backgroundColor': 'gray', 'boxShadow': '4px 4px 8px 0px rgba( 192, 192, 192, 0.5 )', 'marginLeft':'auto', 'marginRight':'auto' }}>
          <div className="measure">
            <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
              <legend className="center f2 fw6 ph0 mh0">Ask a Doubt</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f5" htmlFor="doubt_title">Enter Doubt Title</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="doubt_title"
                  id="doubt_title"
                  onChange={this.onTitleChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f5" htmlFor="doubt_content">Enter Doubt Content</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="doubt_content"
                  id="doubt_content"
                  onChange={this.onContentChange}
                />
              </div>
            </fieldset>
            <div className="center">
              <input
                onClick={this.onSubmitDoubt}
                className="b br2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Submit Doubt"
              />
            </div>
          </div>
        </main>
    );
  }
}

export default withRouter(AddDoubt);