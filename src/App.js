
import './App.css';
import mapboxgl, { NavigationControl } from 'mapbox-gl'; //enlist-disable-line import/no-webpack-loader-syntax
import React from 'react';
import "./directions.css"
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css"
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/logo.png'
import ReactDOM from 'react-dom'
import airtableJson from 'airtable-json';
import SearchForm from './components/SearchForm';


mapboxgl.accessToken = "pk.eyJ1IjoianVhbnExMjI2IiwiYSI6ImNsYjZxY2tnbzAzangzcG9keTA5OHluZGoifQ.gvrUPVXU_yyQnEDDy274ww";
const auth_key = "keymRUApDEF4BUcI9";
const base_name = "app9C1Og0GfjFYSpo";
var data = airtableJson({
  auth_key,
  base_name,
  primary:"Table 1",
  view:"Grid view"
})
console.log(data)



export default class App extends React.PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
    lng: -66.350,
    lat: 18.2208,
    zoom: 8
    };
    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function(position) {
      map.on('load',  function() {
          directions.setOrigin([position.coords.longitude,position.coords.latitude]); // can be address in form setOrigin("12, Elm Street, NY")
      })
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    };
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/navigation-day-v1',
      center: [lng, lat],
      zoom: zoom
    });
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        fitBoundsOptions: {
          maxZoom: 8
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
      showCompass: true,
      showZoom: true
    }))
      data.then(value=> {value.forEach(location => {
        var marker = new mapboxgl.Marker()
         .setLngLat([location.lat,location.lng])
          .setPopup(new mapboxgl.Popup({ offset: 30 })
          .setHTML('<h4>' + location.Description + '</h4>'))
          .addTo(map);
       });})
    
    
    

  }
  render() {
    return (
      <div className='App'>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#"><img src={logo} alt="logo" height={100} /></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="#">Planner</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
              </li>
            </ul>
          </div>
        </nav>
        <div class="container">
          <div
            ref={this.mapContainer} className="map-container">
          </div>
          <SearchForm></SearchForm>
        </div>
      </div>
    );
  }
}

function handleOnsubmit(event) {

  event.preventDefault();
  // Do Whatever you want
}
