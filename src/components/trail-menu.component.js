'use strict';

import Icon from 'react-native-vector-icons/Ionicons';

import React, { Component, TabBarIOS, View,  StyleSheet, Navigator } from 'react-native';

import ReportProblem from '../containers/report-problem.container';

import TrailMap from '../containers/trail-map.container';

import s from './trail-menu.style';
const styles = StyleSheet.create(s);

export default class TrailMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'location',
    };
  }


  /**
   * Store geolocation in state variable so we can pass it
   * to subcomponents (map and report problem screen). The 
   * lat/lng are passed down in props and auto-updated.
   */
  trackLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          this.setState({'currLat':lat, 'currLng':lng});
        },
        (error) => console.log(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
      this.watchID = navigator.geolocation.watchPosition((position) => {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        this.setState({'currLat':lat, 'currLng':lng});
      });
  }

  componentDidMount(){
    this.trackLocation();
  }

  /**
   *  Triggered via callback from report problem screen
   */
  switchTab = (tab) => {
      this.setState({'selectedTab': tab});
  }

  render() {

    var props = {'currLat':this.state.currLat,'currLng':this.state.currLng};

    console.log('Rerender Menu');
    return (
      <View style={styles.container}>
        <TabBarIOS style={styles.tabBar}>
          <Icon.TabBarItem style={styles.container}
            title="My Location"
            iconName="android-locate"
            selectedIconName="android-locate"
            selected={this.state.selectedTab === 'location'}
            onPress={() => {
              this.setState({'selectedTab': 'location'});
            }}>
          <Navigator style={styles.container}
              initialRoute={{name: 'TrailMap', component: TrailMap}}
              configureScene={() => {
                return Navigator.SceneConfigs.PushFromRight;
              }}
              renderScene={(route, navigator) => {
               return (
                    <TrailMap {...props} style={styles.container} />
                );
            }} />
          </Icon.TabBarItem>
          <Icon.TabBarItem style={styles.container}
            title="Report Problem"
            iconName="alert-circled"
            selectedIconName="alert-circled"
            selected={this.state.selectedTab === 'report'}
            onPress={() => {
              this.setState({'selectedTab': 'report'});
            }}>
          <Navigator style={styles.container}
            initialRoute={{name: 'ReportProblem', component: ReportProblem}}
            configureScene={() => {
              return Navigator.SceneConfigs.PushFromRight;
            }}
            renderScene={(route, navigator) => {
               return (
                  <ReportProblem {...props} switchTab={this.switchTab} style={styles.container}/>
                );
          }} />
          </Icon.TabBarItem>
          <Icon.TabBarItem style={styles.container}
            title="Add Site"
            iconName="ios-analytics-outline"
            selectedIconName="ios-analytics-outline"
            selected={this.state.selectedTab === 'addsite'}
            onPress={() => {
              this.setState({'selectedTab': 'addsite'});
            }}>

          <View style={styles.container}/>
          </Icon.TabBarItem>
          <Icon.TabBarItem style={styles.container}
            title="Add Note"
            iconName="ios-plus-outline"
            selectedIconName="ios-plus-outline"
              selected={this.state.selectedTab === 'addnote'}
            onPress={() => {
              this.setState({'selectedTab': 'addnote'});
            }}>
            <View style={styles.container}/>
          </Icon.TabBarItem>
        </TabBarIOS>
      </View> 
    );
  }
}
