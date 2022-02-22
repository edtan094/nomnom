import React from 'react';

export default class TwilioButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderOverlay = this.renderOverlay.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }

  renderModal() {
    return (
      <div className='modal border-radius'>
        <div className='row justify-center border-bottom-grey align-center'>
          <p>Enter your phone number</p>
          <i onClick={this.handleClick} className="pointer fa-solid fa-x margin-left"></i>
        </div>
        <div className='row justify-center border-bottom-grey padding-top padding-bottom'>
          <input className=''></input>
        </div>
        <div className='row justify-center'>
          <button className='purple-background no-borders white-text result-info-size pointer border-radius margin-top-modal-button send-button'>SEND</button>
        </div>
      </div>
    );
  }

  renderOverlay() {
    return <div className='position-fixed background-overlay'></div>;
  }

  handleClick() {
    if (!this.state.modal) {
      this.setState({ modal: true });
    } else {
      this.setState({ modal: false });
    }
  }

  render() {
    return (
      <>
      {this.state.modal ? this.renderOverlay() : null}
      {this.state.modal ? this.renderModal() : null}
        <button onClick={this.handleClick} className='purple-background no-borders white-text result-info-size pointer border-radius twilio-button-height'>SEND TO YOUR PHONE</button>
      </>
    );
  }

}
