import React from 'react';
import AuthForm from '../components/auth-form';
import Redirect from '../components/redirect';

export default function LandingPage(props) {
  if (props.signedIn) return <Redirect to="#" />;
  return (
    <div>
      <div className='row justify-center'>
        {window.location.hash === '#sign-up'
          ? <p className='font-size-30'>Sign Up</p>
          : <p className='font-size-30'>Sign In</p>}
      </div>
      <AuthForm guestSignIn={props.guestSignIn} handleSignIn={props.handleSignIn}/>
    </div>
  );
}
