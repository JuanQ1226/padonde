
import './App.css';
import mapboxgl, { NavigationControl } from 'mapbox-gl'; //enlist-disable-line import/no-webpack-loader-syntax
import React from 'react';
import "./directions.css"
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css"
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/logo.png'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faCoffee, faCamera, faGasPump, faHospital, faMartiniGlassCitrus, faPeopleGroup, faStore, faTree, faUmbrellaBeach, faUtensils } from '@fortawesome/free-solid-svg-icons'
import airtableJson from 'airtable-json';


mapboxgl.accessToken = "pk.eyJ1IjoianVhbnExMjI2IiwiYSI6ImNsYjZxY2tnbzAzangzcG9keTA5OHluZGoifQ.gvrUPVXU_yyQnEDDy274ww";
const auth_key = "keymRUApDEF4BUcI9";
const base_name = "app9C1Og0GfjFYSpo";
const FACoffee = <FontAwesomeIcon icon={faCoffee} />
const FAUtensils = <FontAwesomeIcon icon={faUtensils} />
const FAUmbrellaBeach = <FontAwesomeIcon icon={faUmbrellaBeach} />
const FATree = <FontAwesomeIcon icon={faTree} />
const FABook = <FontAwesomeIcon icon={faBook} />
const FAHospital = <FontAwesomeIcon icon={faHospital} />
const FAPeopleGroup = <FontAwesomeIcon icon={faPeopleGroup} />
const FAStore = <FontAwesomeIcon icon={faStore} />
const FACamera = <FontAwesomeIcon icon={faCamera} />
const FAMartiniGlassCitrus = <FontAwesomeIcon icon={faMartiniGlassCitrus} />
const FAGasPump = <FontAwesomeIcon icon={faGasPump} />
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
			//console.log(location);
		 	//var marker = new mapboxgl.Marker()
       //.setLngLat([location.lng,location.lat])
		// 		.setPopup(new mapboxgl.Popup({ offset: 30 })
		// 		.setHTML('<h4>' + location.Description + '</h4>'))
		// 		.addTo(map);
    
    
    

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

          <ul class="nav nav-tabs"></ul>
          <div class="card mt-3">
            <div class="card-body">
              <form id="form-places" onSubmit={handleOnsubmit}>
                <div class="row">
                  <div class="col-lg-8 col-sm-12">
                    <div class="form-check form-check-inline form-group">
                      <input class="form-check-input" type="checkbox" id="inlineCheckboxFood" value="option1" />
                      <label class="form-check-label" for="inlineCheckbox1">{FAUtensils}</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="inlineCheckboxCoffee" value="option2" />
                      <label class="form-check-label" for="inlineCheckbox2">{FACoffee}</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="inlineCheckboxBeach" value="option3" />
                      <label class="form-check-label" for="inlineCheckbox2">{FAUmbrellaBeach}</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="inlineCheckboxNature" value="option4" />
                      <label class="form-check-label" for="inlineCheckbox2">{FATree}</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="inlineCheckboxBook" value="option5" />
                      <label class="form-check-label" for="inlineCheckbox2">{FABook}</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="inlineCheckboxHospital" value="option6" />
                      <label class="form-check-label" for="inlineCheckbox2">{FAHospital}</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="inlineCheckboxPeople" value="option7" />
                      <label class="form-check-label" for="inlineCheckbox2">{FAPeopleGroup}</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="inlineCheckboxStore" value="option8" />
                      <label class="form-check-label" for="inlineCheckbox2">{FAStore}</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="inlineCheckboxCamera" value="option9" />
                      <label class="form-check-label" for="inlineCheckbox2">{FACamera}</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="inlineCheckboxDrinks" value="option10" />
                      <label class="form-check-label" for="inlineCheckbox2">{FAMartiniGlassCitrus}</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="inlineCheckboxGas" value="option11" />
                      <label class="form-check-label" for="inlineCheckbox2">{FAGasPump}</label>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-12">
                    <label for="formControlRange">Alrededor de</label>
                    <div class="form-group">
                      <input type="range" class="form-control-range" id="formControlRange" />
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-primary mb-2">Buscar</button>
                </div>
              </form>
            </div>
          </div>
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
