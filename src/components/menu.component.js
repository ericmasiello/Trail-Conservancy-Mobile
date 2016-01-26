'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {
  Component,
  NavigatorIOS,
  TabBarIOS,
  View,
  AlertIOS
} = React;

export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'location'
    };
  }

  renderSection(route, ref) {
    return (
      <NavigatorIOS
        ref={ref}
        initialRoute={route}
        barTintColor="#FFF"
        shadowHidden={true}
        tintColor="#ED253C"
        titleTextColor="#CE2132"
        translucent={false}
      />
    );
  }

  // A demo method to show tab press events are working. Will remove
  // when we add save photo on next PR
  sayHello(msg){
    AlertIOS.alert(
      'Clicked tab ' + msg,
      null,
      [
        {text: 'Ok'},
      ]
    );
  }

  render() {
    return (
        <TabBarIOS>
        <Icon.TabBarItem
          title="My Location"
          iconName="android-locate"
          selectedIconName="android-locate"
          selected={this.state.selectedTab === 'location'}
          onPress={() => {
            this.setState({
              selectedTab: 'location'
            });
             this.sayHello('My Location');
          }}>
        <View/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Report Problem"
          iconName="alert-circled"
          selectedIconName="alert-circled"
          selected={this.state.selectedTab === 'report'}
          onPress={() => {
            this.setState({
              selectedTab: 'report'
            });
            this.sayHello('Report Problem');
          }}>
         <View/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Add Site"
          iconName="ios-analytics-outline"
          selectedIconName="ios-analytics-outline"
          selected={this.state.selectedTab === 'addsite'}
          onPress={() => {
            console.log('add site');
            this.setState({
              selectedTab: 'addsite'
            });
            this.sayHello('Add Site');
          }}>
          <View/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Add Note"
          iconName="ios-plus-outline"
          selectedIconName="ios-plus-outline"
            selected={this.state.selectedTab === 'addnote'}
          onPress={() => {
            this.setState({
              selectedTab: 'addnote'
            });
            this.sayHello('Add Note');
          }}>
          <View/>
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}
