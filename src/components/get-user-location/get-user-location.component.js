'use strict';

import React, {
  Component,
} from 'react-native';

export default class GetUserLocation extends Component {

 
  constructor(props) {
    super(props);
  }

  /**
   * Store geolocation in state variable so we can pass it
   * to subcomponents (map and report problem screen). The 
   * lat/lng are passed down in props and auto-updated.
   */
  trackLocation = () => {
      this.watchID = navigator.geolocation.watchPosition((position) => {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        this.props.updateUserLocationActionCreator(lat,lng);
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
      );
  }

  componentDidMount(){
    this.trackLocation();
  }

  render() {
    return null;
  }

}
