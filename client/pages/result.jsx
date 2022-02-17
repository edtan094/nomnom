import React from 'react';

// export default function Result(props) {
//   return (
//     <div className='row'>
//       <div className='column-half'>
//         <h4 className='roboto-font'>{props.name}</h4>
//         <p>{props.location}</p>
//       </div>
//       <div className='column-half'>
//         <div className='result-image-container'>
//           <img src={props.image} className='result-image'></img>
//         </div>
//       </div>
//     </div>
//   );
// }

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {
        name: '',
        location: '',
        image: ''
      }
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    event.preventDefault();
    const body = {
      method: 'GET'
    };
    fetch(`/api/yelp/${this.state.preference}/${this.state.location}`, body)
      .then(res => res.json())
      .then(result => {
        this.setState({
          result: { name: result.name, location: result.location, image: result.image_url }
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className='row'>
        <div className='column-half'>
          <h4 className='roboto-font'>{this.state.result.name}</h4>
          <p>{this.state.result.location}</p>
        </div>
        <div className='column-half'>
          <div className='result-image-container'>
            <img src={this.state.result.image} className='result-image'></img>
          </div>
        </div>
      </div>
    );
  }
}
