import React from 'react-native';
import { connect } from 'react-redux/native';
import { bindActionCreators } from 'redux';
import TrailsPage from '../components/trail.component';
import { loadTrails } from '../actions/trails.action-creator';

const mapStateToProps = ({trails}) => {
  'use strict';
  return { trails };
};

const mapDispatchToProps = (dispatch) => {
  'use strict';
  return bindActionCreators({
    loadTrails
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TrailsPage);