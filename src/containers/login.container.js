import React from 'react-native';
import { connect } from 'react-redux/native';
import { bindActionCreators } from 'redux';
import LoginPage from '../components/login.component';
import { loginActionCreator, logoutActionCreator } from '../actions/login.action-creator';

const mapStateToProps = ({user}) => {
  'use strict';
  return { user };
};

const mapDispatchToProps = (dispatch) => {
  'use strict';
  return bindActionCreators({
    loginActionCreator,
    logoutActionCreator
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);