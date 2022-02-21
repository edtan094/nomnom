import React from 'react';

export default class TwilioButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }

  renderModal() {
    return (
      <div className='modal border-radius'>
        <div className='row justify-center'><p>Enter your phone number</p></div>
        <div className='row justify-center'>
          <input className=''></input>
        </div>
        <div className='row justify-center'>
          <button className='purple-background no-borders white-text font-size-15 pointer border-radius margin-top-modal-button'>SEND</button>
        </div>
      </div>
    );
  }

  handleClick(event) {
    if (event.target.className.includes('send-button')) {
      this.renderModal();
    }
  }

  render() {
    return (
      <>

      <button onClick={this.handleClick} className='send-button purple-background no-borders white-text font-size-15 pointer border-radius twilio-button-height'>SEND TO YOUR PHONE</button>
      </>
    );
  }

}
