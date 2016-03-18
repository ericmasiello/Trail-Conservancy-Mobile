'use strict';

import React, {
  Component,
  View,
  Image,
  TextInput,
  ScrollView
} from 'react-native';

import layout from '../../styles/layout';
import styles from './styles';
import { NavHeader } from '../nav-header/';
import Button from '../button/button.component.js';

export default class ReportProblemComment extends Component {
  constructor(props) {
    super(props);
  }

  // When keyboard displays auto scroll text input and image up
  inputFocused = (refName) => {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        React.findNodeHandle(this.refs[refName]),
        110, //additionalOffset
        true
      );
    }, 50);
  }

  reportComment = (type) => {
      const annotation = this.props.annotations.lastSavedAnnotation;

      this.props.saveAnnotationActionCreator(annotation.geoHash, {...annotation, comment:this.state.text});

      this.props.navigator.push({name: 'LANDING_PAGE'});
  }

  render() {
    if (!this.props.photo.lastSavedPhoto){
      return null;
    }

    return (
       <View style={layout.container}>
        <NavHeader {...this.props} text={this.props.annotations.lastSavedAnnotation.issueType}/>
        <ScrollView
          ref="scrollView"
          contentContainerStyle={styles.textInputWrapper}
          keyboardDismissMode="interactive"
          >
          <Image style={styles.largeimage} source={{uri: this.props.photo.lastSavedPhoto.large}}/>
          <TextInput
            ref="comment"
            style={styles.textInput}
            placeholder="Any other comments you wanna leave (options)?"
            onChangeText={(text) => this.setState({text})}
            autoFocus={true}
            maxLength={2000}
            multiline={true}
            onFocus={() => this.inputFocused('comment')}
            rejectResponderTermination="false" // this does not seem to disable yellow box warning
          />
          <Button buttonText="Continue" onPress={()=> this.reportComment()}/>
        </ScrollView>
      </View>
    );
 }
}
