
import './App.css';
import mapboxgl from 'mapbox-gl'; //enlist-disable-line import/no-webpack-loader-syntax
import React from 'react';
mapboxgl.accessToken = "pk.eyJ1IjoianVhbnExMjI2IiwiYSI6ImNsYjZxY2tnbzAzangzcG9keTA5OHluZGoifQ.gvrUPVXU_yyQnEDDy274ww";

//Map creation


export default class App extends React.PureComponent{
  constructor(props) {
    super(props);
    this.state = {
    lng: -70.9,
    lat: 42.35,
    zoom: 9
    };
    this.mapContainer = React.createRef();
    }
    componentDidMount() {
      const { lng, lat, zoom } = this.state;
      const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
      });
      }
      render() {
        return (
        <div>
        <div ref={this.mapContainer} className="map-container" />
        </div>
        );
        }
}
