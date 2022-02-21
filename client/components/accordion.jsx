import React from 'react';

export default class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    return (
      <div className='row justify-center'>
        <div className='row direction-column width-accordion'>
          <button className='row justify-space-between'>{this.props.reviews.first.user.name}<i className="fa-solid fa-caret-down"></i></button>
          <button className='row justify-space-between'>{this.props.reviews.second.user.name}<i className="fa-solid fa-caret-down"></i></button>
          <button className='row justify-space-between'>{this.props.reviews.third.user.name}<i className="fa-solid fa-caret-down"></i></button>
        </div>
      </div>
    );
  }
}
