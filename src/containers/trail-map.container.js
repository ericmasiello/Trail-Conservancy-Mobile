'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TrailMap from '../components/trail-map.component';
import { fetchAnnotations } from '../actions/trail-annotations.action-creator';
import { fetchTrails } from '../actions/trails.action-creator';

const mapStateToProps = ({annotations, trails, map }) => {
  return { annotations, trails, map };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchAnnotations,
    fetchTrails,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TrailMap);

