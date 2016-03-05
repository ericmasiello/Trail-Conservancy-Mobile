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

  componentWillReceiveProps(){
    if (this.props.tabs && this.props.tabs.selectedTab){
      this.state.selectedTab = this.props.tabs.selectedTab;
    }
  }

  render() {
    console.log('Rerender Menu');
    return (
    <View style={styles.container}>
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
                console.log('render tab loc');
               return (
                  <View  style={styles.container}>
                    <TrailMap style={styles.container} />
                  </View>
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
                 <View  style={styles.container}>
                  <ReportProblem  style={styles.container}/>
                 </View>
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
   </View>
    );
  }
}
