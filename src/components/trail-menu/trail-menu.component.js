'use strict';

import Icon from 'react-native-vector-icons/Ionicons';
import React, {
  Component,
  TabBarIOS,
  View,
  Navigator
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin';

import ReportProblem from '../../containers/report-problem.container';
import TrailMap from '../../containers/trail-map.container';
import GetUserLocation from '../../containers/get-user-location.container';

import layout from '../../styles/layout';
import { brandColor } from '../../styles/config';
import tabs from './styles';

class TrailMenu extends Component {

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
    const self = this;
    /*
     * Wrapping the onPress inside of a requestAnimationFrame
     * See https://facebook.github.io/react-native/docs/performance.html#my-touchablex-view-isn-t-very-responsive
     */
    const setSelectedTabOnPress = (selectedTab) => () => self.requestAnimationFrame( () => self.setState({selectedTab}) );
    const setLocationTab = setSelectedTabOnPress('location');
    const setReportTab = setSelectedTabOnPress('report');
    const setAddSiteTab = setSelectedTabOnPress('addsite');
    const setAddNoteTab = setSelectedTabOnPress('addnote');
    const { selectedTab } = this.state;

    return (
      <View style={layout.container}>
        <GetUserLocation {...this.props} />
        <TabBarIOS style={tabs.tabBarContainer} tintColor={brandColor}>
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

reactMixin(TrailMenu.prototype, TimerMixin);
export default TrailMenu;
