import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/auth/sign-up', req)
      .then(res => res.json())
      .then(data => {
        return data;
      })
      .catch(error => console.error(error));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className='row justify-center'>
        <form onSubmit={this.handleSubmit} method='get'>
          <div>
            <label htmlFor='username'></label>
            <input onChange={this.handleChange} name="username" placeholder='username' value={this.state.username} className='margin-bottom-10' type='text' required></input>
          </div>
          <div>
            <label htmlFor='password'></label>
            <input onChange={this.handleChange} name="password" placeholder='password' value={this.state.password} className='margin-top-10 margin-bottom-10' type='password' required></input>
          </div>
          <div className='row justify-center'>
            <button type='submit' className='sign-up-button margin-top-10'>SIGN UP</button>
          </div>
          <div className='row justify-center'>
            <button type='button' onClick={this.props.guestSignIn} className='sign-up-button margin-top-10'>GUEST SIGN IN</button>
          </div>
        </form>
      </div>
    );
  }
}
