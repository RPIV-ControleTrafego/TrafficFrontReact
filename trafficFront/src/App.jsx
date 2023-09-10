import React, { Component } from 'react';
import axios from 'axios';

class TrafficList extends Component {
  constructor() {
    super();
    this.state = {
      trafficData: [],
    };
  }

  componentDidMount() {
    axios.get('/service/traffic/car-plate/list')
      .then((response) => {
        this.setState({ trafficData: response.data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    return (
      <div>
        <h2>Traffic Data</h2>
        <ul>
          {this.state.trafficData.map((data) => (
            <li key={data.id}>{data.plateNumber} - {data.ownerName}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TrafficList;
