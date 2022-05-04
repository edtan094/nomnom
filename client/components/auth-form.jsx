import React, { useState } from 'react';

export default function AuthForm({ handleSignIn, guestSignIn }) {
  const [userInfo, setUserInfo] = useState({ username: '', password: '' });

  const handleSubmit = async event => {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    };
    if (window.location.hash === '#sign-up') {
      try {
        await fetch('/api/auth/sign-up', req);
        window.location.hash = '#sign-in';
        setUserInfo({ username: '', password: '' });
      } catch (err) {
        console.error(err);
      }
    } else if (window.location.hash === '#sign-in') {
      try {
        const res = await fetch('/api/auth/sign-in', req);
        const data = await res.json();
        handleSignIn(data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className='row justify-center'>
      <form onSubmit={handleSubmit} method='get'>
        <div className="row justify-center">
          <label htmlFor='username'></label>
          <input onChange={handleChange} name="username" placeholder='username'
            value={userInfo.username} className='margin-bottom-10' type='text' required></input>
        </div>
        <div className="row justify-center margin-bottom">
          <label htmlFor='password'></label>
          <input onChange={handleChange} name="password" placeholder='password'
            value={userInfo.password} className='margin-top-10 margin-bottom-10' type='password' required></input>
        </div>
        <div className='row justify-center'>
          {window.location.hash === '#sign-up'
            ? <button type='submit' className='sign-up-button margin-top-10 pointer'>SIGN UP</button>
            : <button type='submit' className='sign-up-button margin-top-10 pointer'>SIGN IN</button>}
        </div>
        <div className="row justify-center">
          {window.location.hash === '#sign-up'
            ? <p>Already have an account? <a href='#sign-in' className='sign-in-up'>Sign in!</a></p>
            : <p>Don&apos;t have an account? <a href='#sign-up' className='sign-in-up'>Sign up!</a></p>}
        </div>
        <div className='row justify-center'>
          <button type='button' onClick={guestSignIn} className='sign-up-button margin-top-10 pointer'>GUEST SIGN IN</button>
        </div>
      </form>
    </div>
  );
}
