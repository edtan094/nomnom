import React from 'react';

function MenuDrawer({ isOpen, close, handleSignOut }) {
  const className = isOpen
    ? 'drawer is-open'
    : 'drawer';

  const handleClick = () => {
    close();
    handleSignOut();
  };
  return (
    <div className={className}>
      <button onClick={close} className='font-theme no-borders font-size-16 pointer white-background-color'>
        <i className="pointer fa-solid fa-x" onClick={close}></i>
      </button>
      <div className='row direction-column align-center'>
        <a href='#bookmarks' className='black' onClick={close}>Bookmarks</a>
        <button onClick={handleClick}
        className='font-theme no-borders font-size-16 pointer white-background-color'>
        Sign Out
      </button>
      </div>
    </div>
  );
}

function MenuShade({ isDrawn, close }) {
  const className = isDrawn
    ? 'shade is-drawn'
    : 'shade';
  return (
    <div className={className} onClick={close} />
  );
}

export default function Drawer(props) {
  return (
      <>
      <MenuShade isDrawn={props.isOpen} open={props.toggleOpen}/>
      <MenuDrawer isOpen={props.isOpen} close={props.toggleOpen} handleSignOut={props.handleSignOut}/>
      </>
  );

}
