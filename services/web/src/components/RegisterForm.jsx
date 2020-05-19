import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class RegisterForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      errors: {},
      username: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://www.datadoghq-browser-agent.com/datadog-rum-us.js";
    script.async = true;
    document.body.appendChild(script);

    const script2 = document.createElement("script");
    script2.innerHTML = "window.DD_RUM && window.DD_RUM.init({" +
      "clientToken: 'pubae8de6a9f2b4829a2cdd78eb5fbdfe94', " +
      "applicationId: '296f3b34-d813-4d07-ade2-399b2c13f2de', });"
    script2.async = true;
    document.body.appendChild(script2);
  }

  handleInputChange (event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  onSubmit (event) {
    event.preventDefault();
    console.log(this.state);
    this.props.registerUser(this.state, (errorMessage) => {
      if (errorMessage) {
        this.props.createFlashMessage(errorMessage, 'error');
      }
    });
  }
  render () {
    const { username, password } = this.state;
    return (
      <div className="row">
        <div className="col-md-6">
          <h1>Register</h1>
          <hr/><br/>
          <form
            onSubmit={(event) => {
              this.onSubmit(event)
            }}
            className='form-horizontal'>
            <div className='form-group'>
              <label
                htmlFor='username'
                className='col-md-2 control-label'>
                Username
              </label>
              <div className='col-md-10'>
                <input
                  type='text'
                  className='form-control'
                  id='username'
                  name='username'
                  value={username}
                  onChange={this.handleInputChange} />
              </div>
            </div>
            <div className='form-group'>
              <label
                htmlFor='password'
                className='col-md-2 control-label'>
                Password
              </label>
              <div className='col-md-10'>
                <input
                  type='text'
                  className='form-control'
                  id='password'
                  name='password'
                  value={password}
                  onChange={this.handleInputChange} />
              </div>
            </div>
            <div className='form-group'>
              <div className='col-md-offset-2 col-md-10'>
                <button
                  type='submit'
                  className='btn btn-success'
                >Sign up</button>
                &nbsp;
                <Link
                  to='/'
                  className='btn btn-primary'
                >Cancel</Link>
                <p>Already registered? <Link to='/login'>Log in</Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default RegisterForm
