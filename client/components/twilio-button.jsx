import React from 'react';

export default class TwilioButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      phoneNumber: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderOverlay = this.renderOverlay.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.handleInputPhoneNumber = this.handleInputPhoneNumber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderModal() {
    return (
      <div className='modal border-radius'>
        <div className='row justify-center border-bottom-grey align-center'>
          <p>Enter your phone number</p>
          <i onClick={this.handleClick} className="pointer fa-solid fa-x margin-left"></i>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className='row justify-center border-bottom-grey padding-top padding-bottom'>
            <input onChange={this.handleInputPhoneNumber} value={this.state.phoneNumber} className='' required></input>
          </div>
          <div className='row justify-center'>
            <button className='purple-background no-borders white-text result-info-size pointer border-radius margin-top-modal-button send-button'>SEND</button>
          </div>
        </form>
      </div>
    );
  }

  handleInputPhoneNumber(event) {
    this.setState({ phoneNumber: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const body = {
      method: 'POST'
    };
    fetch(`/twilio/${this.state.phoneNumber}/${this.props.address.display_address[0]}`, body)
      .then(res => res.json())
      .then(console.log('text sent!'))
      .catch(err => console.error(err));
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
    console.log(this.props);
    return (
      <>
      {this.state.modal ? this.renderOverlay() : null}
      {this.state.modal ? this.renderModal() : null}
        <button onClick={this.handleClick} className='purple-background no-borders white-text result-info-size pointer border-radius twilio-button-height'>SEND TO YOUR PHONE</button>
      </>
    );
  }

}
