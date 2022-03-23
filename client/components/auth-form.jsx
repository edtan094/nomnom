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

  async handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    if (window.location.hash === '#sign-up') {
      try {
        await fetch('/api/auth/sign-up', req);
        window.location.hash = '#sign-in';
        this.setState({ username: '', password: '' });
      } catch (err) {
        console.error(err);
      }
    }
    if (window.location.hash === '#sign-in') {
      try {
        const res = await fetch('/api/auth/sign-in', req);
        const data = await res.json();
        this.props.handleSignIn(data);
      } catch (err) {
        console.error(err);
      }
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className='row justify-center'>
        <form onSubmit={this.handleSubmit} method='get'>
          <div className="row justify-center">
            <label htmlFor='username'></label>
            <input onChange={this.handleChange} name="username" placeholder='username'
              value={this.state.username} className='margin-bottom-10' type='text' required></input>
          </div>
          <div className="row justify-center margin-bottom">
            <label htmlFor='password'></label>
            <input onChange={this.handleChange} name="password" placeholder='password'
              value={this.state.password} className='margin-top-10 margin-bottom-10' type='password' required></input>
          </div>
          <div className='row justify-center'>
            {window.location.hash === '#sign-up'
              ? <button type='submit' className='sign-up-button margin-top-10 pointer'>SIGN UP</button>
              : <button type='submit' className='sign-up-button margin-top-10 pointer'>SIGN IN</button> }
          </div>
          <div className="row justify-center">
            {window.location.hash === '#sign-up'
              ? <p>Already have an account? <a href='#sign-in' className='sign-in-up'>Sign in!</a></p>
              : <p>Don&apos;t have an account? <a href='#sign-up' className='sign-in-up'>Sign up!</a></p>}
          </div>
          <div className='row justify-center'>
            <button type='button' onClick={this.props.guestSignIn} className='sign-up-button margin-top-10 pointer'>GUEST SIGN IN</button>
          </div>
        </form>
      </div>
    );
  }
}
