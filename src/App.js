
import './App.css';
import mapboxgl, { NavigationControl } from 'mapbox-gl'; //enlist-disable-line import/no-webpack-loader-syntax
import React from 'react';
import "./directions.css"
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css"
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
mapboxgl.accessToken = "pk.eyJ1IjoianVhbnExMjI2IiwiYSI6ImNsYjZxY2tnbzAzangzcG9keTA5OHluZGoifQ.gvrUPVXU_yyQnEDDy274ww";

//Map creation


export default class App extends React.PureComponent{
  constructor(props) {
    super(props);
    this.state = {
    lat: 18.2208,
    lng: -66.330,
    zoom: 8
    };
    this.mapContainer = React.createRef();
    }
    componentDidMount() {
      const { lng, lat, zoom } = this.state;
      const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/navigation-day-v1',
      center: [lng, lat],
      zoom: zoom
      });
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions:{
          enableHighAccuracy: true
          },
          fitBoundsOptions:{
            maxZoom : 8
          },
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: true
          })
      );
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving'
      })
      map.addControl(directions, 'top-left');
      map.addControl(new mapboxgl.NavigationControl({
        showCompass:true,
        showZoom:true
      }))
      }
      render() {
        return (
        <div className='App'>
        <div ref={this.mapContainer} className="map-container">
          </div>
        </div>
        );
        }
}
