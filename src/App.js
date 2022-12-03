
import './App.css';
import mapboxgl, { NavigationControl } from 'mapbox-gl'; //enlist-disable-line import/no-webpack-loader-syntax
import React from 'react';
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css"
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/logo.png'
import airtableJson from 'airtable-json';
import SearchForm from './components/SearchForm';
import Navbar from './components/Navbar'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';


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
    zoom: 7.5,
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
    
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving'
    })
    var button = document.body.appendChild(document.createElement('button'));
    button.style = 'z-index:10;position:absolute;top:165px;right:12%'
    button.textContent = 'From my location';
    button.className = "btn btn-success"
    map.on('load', () => {
      button.addEventListener('click', function() {
        console.log("click");
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
        navigator.geolocation.getCurrentPosition(function(position) { 
            directions.setOrigin([position.coords.longitude,position.coords.latitude]); // can be address in form setOrigin("12, Elm Street, NY"
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
      });
    })
    map.addControl(directions, 'top-left');
    map.addControl(new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true
    }))
      data.then(value=> {value.forEach(locations => {
        let paramms = new URLSearchParams(window.location.search);
        console.log(paramms);
        if (paramms.get(locations.type) == "on") {
          console.log(paramms.get(locations.type))
        var marker = new mapboxgl.Marker()
         .setLngLat([locations.lat,locations.lng])
          .setPopup(new mapboxgl.Popup({ offset: 30 })
          .setHTML( '<b>' + locations.Name + '</b>' +'<p>' + locations.Description + '</p>'))
          .addTo(map);}
       }
       )
       selectedTypes = [];
       ;})
    
    
    

  }
  render() {
    return (
      
      <div className='App'>
        <Navbar></Navbar>
        <div className="container">
          <div
            ref={this.mapContainer} className="map-container">
          </div>
          <SearchForm></SearchForm>
        </div>
        <div className='container c text-center'>
          <h1 className="Title">Explore the Real Puerto Rico</h1>
          <p>Enjoy this Curated list of places in Puerto Rico. Places that could be overseen by the big map app's algorithms and are not well known by turists.</p>
          <h2 className='Title'>Promote Our Community</h2>
          <button className="btn btn-success"onClick={()=>window.open("https://airtable.com/invite/l?inviteId=invbx1tkVLFZYVPkW&inviteToken=bc7e630062782503b5d043e6d15a69287ed6ce875eae250e444e905ea63c50b2&utm_medium=email&utm_source=product_team&utm_content=transactional-alerts")}>Grow The Community</button>
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
