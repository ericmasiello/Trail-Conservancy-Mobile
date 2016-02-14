import React from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TrailsPage from '../components/trail.component';
import { fetchAnnotations } from '../actions/trail-annotations.action-creator';
import { fetchTrails } from '../actions/trails.action-creator';

const mapStateToProps = ({annotations, trails }) => {
  'use strict';
  return { annotations, trails };
};

const mapDispatchToProps = (dispatch) => {
  'use strict';
  return bindActionCreators({
    fetchAnnotations,
    fetchTrails
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TrailsPage);