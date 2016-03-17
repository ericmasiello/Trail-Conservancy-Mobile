'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TrailMap } from './';
import { fetchAnnotationsActionCreator } from '../../actions/trail-annotations.action-creator';
import { fetchTrailsActionCreator } from '../../actions/trails.action-creator';

const mapStateToProps = ({annotations, trails, map, userLocation }) => {
  return { annotations, trails, map, userLocation };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchAnnotationsActionCreator,
    fetchTrailsActionCreator,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TrailMap);


