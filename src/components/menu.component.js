'use strict';

 
import Icon from 'react-native-vector-icons/Ionicons';

import React, {Component, TabBarIOS, View, AlertIOS, StyleSheet, Dimensions} from 'react-native';
 
export default class Menu extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      selectedTab: 'location',
    };
  }


  componentDidMount() {
  
  };

 

  // A demo method to show tab press events are working. Will remove
  // when we add save photo on next PR
   sayHello = (msg) => {
    AlertIOS.alert(
      'Clicked tab ' + msg,
      null,
      [
        {text: 'Ok'},
      ]
    );
  }

  render() {
    console.log('the ref');
    console.log(this.props.theRef);
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
              {this.props.callBack()};
            }}>
           <View>

           </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
