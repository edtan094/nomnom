import React from 'react';

export default class TwilioButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      tel1: '',
      tel2: '',
      tel3: '',
      textSent: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderOverlay = this.renderOverlay.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.handleInputPhoneNumber = this.handleInputPhoneNumber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.moveToNextInput = this.moveToNextInput.bind(this);
  }

  renderModal() {
    return (
      <div className='modal border-radius z-index-2'>
        <div className='row justify-center border-bottom-grey align-center'>
          <p>Enter your phone number</p>
          <i onClick={this.handleClick} className="pointer fa-solid fa-x margin-left"></i>
        </div>
        <form onSubmit={this.handleSubmit} className="width-100">
          <div className={this.state.textSent ? 'row justify-center border-bottom-grey' : 'row justify-center border-bottom-grey padding-top padding-bottom'}>
            {this.state.textSent
              ? <p>Text sent!</p>
              : <div>
                <input name="tel1" onChange={this.handleInputPhoneNumber} type="tel" placeholder="XXX"
                  value={this.state.tel1} pattern="[0-9]{3}" size="4" className='twilio-input' maxLength="3" required></input>
                <input name="tel2" onChange={this.handleInputPhoneNumber} type="tel" placeholder="XXX"
                  value={this.state.tel2} pattern="[0-9]{3}" size="4" className='twilio-input' maxLength="3" required></input>
                <input name="tel3" onChange={this.handleInputPhoneNumber} type="tel" placeholder="XXXX"
                  value={this.state.tel3} pattern="[0-9]{4}" size="5" className='twilio-input' maxLength="4" required></input>
              </div>
                }
          </div>
          <div className='row justify-center'>
            <button className='purple-background no-borders white-text result-info-size pointer border-radius margin-top-modal-button send-button'>SEND</button>
          </div>
        </form>
      </div>
    );
  }

  handleInputPhoneNumber(event) {
    if (event.target.name === 'tel1') {
      this.setState({ tel1: event.target.value });
    }
    if (event.target.name === 'tel2') {
      this.setState({ tel2: event.target.value });
    }
    if (event.target.name === 'tel3') {
      this.setState({ tel3: event.target.value });
    }
    this.moveToNextInput(event);
  }

  moveToNextInput(event) {
    if (event.target.name === 'tel1' && event.target.value.length === 3) {
      event.target.nextSibling.focus();
    }
    if (event.target.name === 'tel2' && event.target.value.length === 3) {
      event.target.nextSibling.focus();
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' }
    };
    try {
      await fetch(`/api/twilio/${this.state.tel1}${this.state.tel2}${this.state.tel3}/${this.props.address.display_address.map(address => {
        return address;
      })}/${this.props.name}`, req);
      this.setState({ textSent: true });
    } catch (err) {
      console.error(err);
    }
  }

  renderOverlay() {
    return <div className='position-fixed background-overlay z-index-1'></div>;
  }

  handleClick() {
    if (!this.state.modal) {
      this.setState({ modal: true, textSent: false, tel1: '', tel2: '', tel3: '' });
    } else {
      this.setState({ modal: false });
    }
  }

  render() {
    return (
      <>
      {this.state.modal ? this.renderOverlay() : null}
      {this.state.modal ? this.renderModal() : null}
        <button onClick={this.handleClick} className='purple-background no-borders white-text result-info-size pointer border-radius
        twilio-button-height'>SEND TO YOUR PHONE</button>
      </>
    );
  }

}
