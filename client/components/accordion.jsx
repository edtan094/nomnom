import React from 'react';

export default class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.renderAccordion = this.renderAccordion.bind(this);
  }

  componentDidMount() {
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props !== prevProps) {
  //     this.renderAccordion();
  //   }
  // }

  // renderAccordion() {
  //   return (
  //     <div className='row direction-column'>
  //       <button>{this.props.reviews.first.user.name}</button>
  //       <button>{this.props.reviews.second.user.name}</button>
  //       <button>{this.props.reviews.third.user.name}</button>
  //     </div>
  //   );
  // }

  render() {
    console.log(this.props);
    return (
      <div on className='row direction-column'>
        <button>{this.props.reviews.first.user.name}</button>
        <button>{this.props.reviews.second.user.name}</button>
        <button>{this.props.reviews.third.user.name}</button>
      </div>
    );
  }
}
