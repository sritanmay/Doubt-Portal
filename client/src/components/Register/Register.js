import React from 'react';
import { withRouter } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      branch: '',
      semester: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onBranchChange = (event) => {
    this.setState({branch: event.target.value})
  }

  onSemesterChange = (event) => {
    this.setState({semester: event.target.value})
  }

  onSubmitRegister = () => {
    fetch('/api/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        branch: this.state.branch,
        semester: this.state.semester
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user) {
          //this.props.loadUser(user)
          console.log("Register response ");
          this.props.history.push({
            pathname:'/dashboard',
            state: {user: user} 
          })
        }
      })
  }

  render() {
    return (
      //<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="w-40 pa4 black-80 br3 ba b--black-10 mv4 w-50-m w-25-l mw6" 
              style={{ 'margin': '50px', 'background-color': 'gray', 'boxShadow': '4px 4px 8px 0px rgba( 192, 192, 192, 0.5 )' }}>
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f5" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  required
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  required
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={this.onPasswordChange}
                />
              </div>
              <div style={{'display':'flex'}}>
                <div className="w-50">
                 <label className="db fw1 lh-copy f5" htmlFor="branch">Branch</label>
                  <select id="branch" 
                    defaultValue={'DEFAULT'}
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    required
                    onChange={this.onBranchChange}>
                    <option value="DEFAULT" disabled hidden> </option> 
                    <option value="CSE">CSE</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                    <option value="ECE">ECE</option>
                    <option value="Electrical">Electrical</option>
                    <option value="MSME">MSME</option>
                  </select>
                </div>
                <div className="w-50">
                 <label className="db fw1 lh-copy f5" htmlFor="semester">Semester</label>
                 <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                 type="number" 
                 id="semester" 
                 name="semester" 
                 required
                 onChange={this.onSemesterChange}
                 min="1" max="8"/>
                </div>
              </div>


            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      //</article>
    );
  }
}

export default withRouter(Register);