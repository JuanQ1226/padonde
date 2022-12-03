
import './App.css';
import mapboxgl, { NavigationControl } from 'mapbox-gl'; //enlist-disable-line import/no-webpack-loader-syntax
import React from 'react';
import "./directions.css"
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css"
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/logo.png'
import airtableJson from 'airtable-json';
import SearchForm from './components/SearchForm';
import Navbar from './components/Navbar'


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

export var selectedTypes = new Array();

export default class App extends React.PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
    lng: -66.350,
    lat: 18.2208,
    zoom: 8,
    selectedTypes : []
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
        if (this.state.selectedTypes.includes(location.type) || this.state.selectedTypes.length == 0) {
        var marker = new mapboxgl.Marker()
         .setLngLat([location.lat,location.lng])
          .setPopup(new mapboxgl.Popup({ offset: 30 })
          .setHTML( '<b>' + location.Name + '</b>' +'<p>' + location.Description + '</p>'))
          .addTo(map);}
       })
       selectedTypes = [];
       ;})
    
    
    

  }
  render() {
    return (
      <div className='App'>
        <Navbar></Navbar>
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
  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving'
  });
  event.preventDefault();
  console.log("hello");
  navigator.geolocation.getCurrentPosition(function(position) { 
    directions.setOrigin([position.coords.longitude,position.coords.latitude]); // can be address in form setOrigin("12, Elm Street, NY"
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
  })
}
