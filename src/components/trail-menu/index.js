'use strict';

import Icon from 'react-native-vector-icons/Ionicons';
import React, {
  Component,
  TabBarIOS,
  View,
  Navigator
} from 'react-native';
import ReportProblem from '../../containers/report-problem.container';
import TrailMap from '../../containers/trail-map.container';
import GetUserLocation from '../../containers/get-user-location.container';

import layout from '../../styles/layout';
import tabs from './styles';

export default class TrailMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'location',
    };
  }

  /**
   *  Triggered via callback from report problem screen
   */
  switchTab = (selectedTab) => {
    this.setState({selectedTab});
  }

  render() {
    const setSelectedTabOnPress = (selectedTab) => () => this.setState({selectedTab});
    const setLocationTab = setSelectedTabOnPress('location');
    const setReportTab = setSelectedTabOnPress('report');
    const setAddSiteTab = setSelectedTabOnPress('addsite');
    const setAddNoteTab = setSelectedTabOnPress('addnote');
    const { selectedTab } = this.state;

    return (
      <View style={layout.container}>
        <GetUserLocation {...this.props} />
        <TabBarIOS style={tabs.tabBarContainer}>
          <Icon.TabBarItem style={tabs.tabBarItem}
            title="My Location"
            iconName="android-locate"
            selectedIconName="android-locate"
            selected={selectedTab === 'location'}
            onPress={setLocationTab}>
          <Navigator
              initialRoute={{name: 'TrailMap', component: TrailMap}}
              configureScene={() => {
                return Navigator.SceneConfigs.PushFromRight;
              }}
              renderScene={(route, navigator) => {
               return (
                    <TrailMap style={layout.container} />
                );
            }} />
          </Icon.TabBarItem>
          <Icon.TabBarItem style={tabs.tabBarItem}
            title="Report Problem"
            iconName="alert-circled"
            selectedIconName="alert-circled"
            selected={selectedTab === 'report'}
            onPress={setReportTab}>
          <Navigator
            initialRoute={{name: 'ReportProblem', component: ReportProblem}}
            configureScene={() => {
              return Navigator.SceneConfigs.PushFromRight;
            }}
            renderScene={(route, navigator) => {
               return (
                  <ReportProblem  switchTab={this.switchTab} style={layout.container}/>
                );
          }} />
          </Icon.TabBarItem>
          <Icon.TabBarItem style={tabs.tabBarItem}
            title="Add Site"
            iconName="ios-analytics-outline"
            selectedIconName="ios-analytics-outline"
            selected={selectedTab === 'addsite'}
            onPress={setAddSiteTab}>
              <View style={layout.container}/>
          </Icon.TabBarItem>
          <Icon.TabBarItem style={tabs.tabBarItem}
            title="Add Note"
            iconName="ios-plus-outline"
            selectedIconName="ios-plus-outline"
            selected={selectedTab === 'addnote'}
            onPress={setAddNoteTab}>
            <View style={layout.container}/>
          </Icon.TabBarItem>
        </TabBarIOS>
      </View>
    );
  }
}
