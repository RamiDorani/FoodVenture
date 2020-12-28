import React, { Component } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

const styles = require('../GoogleMapStyles.json')

function makeMap({ coord }) {
  const { lat, lang } = coord
  return (
    <div>
      <GoogleMap defaultZoom={12} defaultCenter={{ lat: lang, lng: lat }}
        defaultOptions={{
          disableDefaultUI: true, // disable default map UI
          draggable: true, // make map draggable
          keyboardShortcuts: false, // disable keyboard shortcuts
          scaleControl: true, // allow scale controle
          scrollwheel: false, // allow scroll wheel
          styles: styles // change default map styles
        }}
      >
        <Marker position={{ lat: lang, lng: lat }} />
      </GoogleMap>
    </div>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(makeMap));

export class Map extends Component {
  render() {
    return (
      <div style={{ width: "100%", height: "300px" }}>
        <WrappedMap coord={this.props.coord}
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC5vWPKvitqYwKhQkWQXGAEMQKIDw_tA6I"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}