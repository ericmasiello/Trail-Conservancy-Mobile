'use strict';


import React, {
  Component,
  View
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin';

import TrailMap from '../../containers/trail-map.container';
import GetUserLocation from '../../containers/get-user-location.container';

import layout from '../../styles/layout';


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
    return (
      <View style={layout.container}>
        <GetUserLocation {...this.props} />
        <TrailMap {...this.props}/>
      </View>
    );
  }
}

reactMixin(TrailMenu.prototype, TimerMixin);
export default TrailMenu;
