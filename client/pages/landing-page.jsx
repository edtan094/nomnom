import React from 'react';
import AuthForm from '../components/auth-form';

export default function LandingPage(props) {
  return (
    <div>
      <div className='row justify-center'>
        <p className='font-theme font-size-30'>Sign Up</p>
      </div>
      <AuthForm guestSignIn={props.guestSignIn}/>
    </div>
  );
}
