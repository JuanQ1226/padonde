
import './App.css';
import mapboxgl from 'mapbox-gl'; //enlist-disable-line import/no-webpack-loader-syntax
import React from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

mapboxgl.accessToken = "pk.eyJ1IjoianVhbnExMjI2IiwiYSI6ImNsYjZxY2tnbzAzangzcG9keTA5OHluZGoifQ.gvrUPVXU_yyQnEDDy274ww";

const element = <FontAwesomeIcon icon={faCoffee} />

//Map creation


export default class App extends React.PureComponent {
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
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">¿Pa' Donde?</a>
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
          <div ref={this.mapContainer} className="map-container" />
          <div class="card mt-3">
            <div class="card-body">
              <form>
                <div class="row">
                  <div class="col-lg-6 col-sm-12">
                    <div class="form-check form-check-inline form-group">
                      <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                      <label class="form-check-label" for="inlineCheckbox1">{element}</label>
                    </div>
                  </div>
                  <div class="col-lg-6 col-sm-12">
                  <label class='text-center' for="formControlRange">Radius</label>
                    <div class="form-group">
                      <input type="range" class="form-control-range" id="formControlRange"/>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
