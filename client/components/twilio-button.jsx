import React, { useState } from 'react';

export default function TwilioButton(props) {
  const [modal, setModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState({ tel1: '', tel2: '', tel3: '' });
  const [textSent, setTextSent] = useState(false);

  const renderModal = () => {
    return (
      <div className='modal border-radius z-index-2'>
        <div className='row justify-center border-bottom-grey align-center'>
          <p>Enter your phone number</p>
          <i onClick={handleClick} className="pointer fa-solid fa-x margin-left"></i>
        </div>
        <form onSubmit={handleSubmit} className="width-100">
          <div className={textSent ? 'row justify-center border-bottom-grey' : 'row justify-center border-bottom-grey padding-top padding-bottom'}>
            {textSent
              ? <p>Text sent!</p>
              : <div>
                <input name="tel1" onChange={handleInputPhoneNumber} type="tel" placeholder="XXX"
                  value={phoneNumber.tel1} pattern="[0-9]{3}" size="4" className='twilio-input' maxLength="3" required></input>
                <input name="tel2" onChange={handleInputPhoneNumber} type="tel" placeholder="XXX"
                  value={phoneNumber.tel2} pattern="[0-9]{3}" size="4" className='twilio-input' maxLength="3" required></input>
                <input name="tel3" onChange={handleInputPhoneNumber} type="tel" placeholder="XXXX"
                  value={phoneNumber.tel3} pattern="[0-9]{4}" size="5" className='twilio-input' maxLength="4" required></input>
              </div>
            }
          </div>
          <div className='row justify-center'>
            <button className='purple-background no-borders white-text result-info-size pointer border-radius margin-top-modal-button send-button'>SEND</button>
          </div>
        </form>
      </div>
    );
  };

  const handleInputPhoneNumber = event => {
    if (event.target.name === 'tel1') {
      setPhoneNumber({ ...phoneNumber, tel1: event.target.value });
    }
    if (event.target.name === 'tel2') {
      setPhoneNumber({ ...phoneNumber, tel2: event.target.value });
    }
    if (event.target.name === 'tel3') {
      setPhoneNumber({ ...phoneNumber, tel3: event.target.value });
    }
    moveToNextInput(event);
  };

  const moveToNextInput = event => {
    if (event.target.name === 'tel1' && event.target.value.length === 3) {
      event.target.nextSibling.focus();
    }
    if (event.target.name === 'tel2' && event.target.value.length === 3) {
      event.target.nextSibling.focus();
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' }
    };
    try {
      await fetch(`/api/twilio/${phoneNumber.tel1}${phoneNumber.tel2}${phoneNumber.tel3}/${props.address.display_address.map(address => {
        return address;
      })}/${props.name}`, req);
      setTextSent(true);
    } catch (err) {
      console.error(err);
    }
  };

  const renderOverlay = () => {
    return <div className='position-fixed background-overlay z-index-1'></div>;
  };

  const handleClick = () => {
    if (!modal) {
      setModal(true);
      setTextSent(false);
      setPhoneNumber({ tel1: '', tel2: '', tel3: '' });

    } else {
      setModal(false);
    }
  };

  return (
    <>
      {modal ? renderOverlay() : null}
      {modal ? renderModal() : null}
      <button onClick={handleClick} className='purple-background no-borders white-text result-info-size pointer border-radius
        twilio-button-height'>SEND TO YOUR PHONE</button>
    </>
  );
}
