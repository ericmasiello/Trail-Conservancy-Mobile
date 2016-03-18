'use strict';

import React, {
  Component,
  View,
  TouchableHighlight,
  Image,
  Text
} from 'react-native';

import layout from '../../styles/layout';
import styles from './styles';
import { NavHeader } from '../nav-header/';

export default class ReportProblemIssueType extends Component {

  reportIssueType = (type) => {
      this.props.cacheLastAnnotation({...this.props.annotations.lastSavedAnnotation, issueType:type});

      this.props.navigator.push({name: 'REPORT_PROBLEM_COMMENT'});
  }

  render() {
    if (!this.props.photo.lastSavedPhoto){
      return null;
    }

    return (
       <View style={layout.container}>
        <NavHeader {...this.props} text="What kind of issue?"/>
        <Image style={styles.largeimage} source={{uri: this.props.photo.lastSavedPhoto.large}}/>
        <Text style={styles.midText}>What's the issue you'd like to report?</Text>
        <View style={styles.iconBarWrapper}>
          <View style={styles.iconBar}>
            <TouchableHighlight underlayColor="transparent" onPress={()=> this.reportIssueType('Log')}>
                  <Image source={require('../../images/issue-type-log.png')}/>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="transparent" onPress={()=> this.reportIssueType('Down Tree')}>
                  <Image source={require('../../images/issue-type-down-tree.png')}/>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="transparent" onPress={()=> this.reportIssueType('Mud')}>
                  <Image source={require('../../images/issue-type-mud.png')}/>
            </TouchableHighlight>
          </View>
          <View style={styles.iconBar}>
            <TouchableHighlight underlayColor="transparent" onPress={()=> this.reportIssueType('Bugs')}>
                  <Image source={require('../../images/issue-type-bugs.png')}/>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="transparent" onPress={()=> this.reportIssueType('Wild Animal')}>
                  <Image source={require('../../images/issue-type-animal.png')}/>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="transparent" onPress={()=> this.reportIssueType('Other')}>
                  <Image source={require('../../images/issue-type-other.png')}/>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
 }
}
