import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../../lib/app-context';

export default function Bookmarks(props) {
  if (!this.context.user) return <Redirect to="sign-in" />;
  return (
    <div className='row justify-center'>
      <button className='row border-radius bookmark'></button>
    </div>
  );
}
Bookmarks.contextType = AppContext;
