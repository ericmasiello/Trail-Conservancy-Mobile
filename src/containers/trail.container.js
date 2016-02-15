'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TrailsPage from '../components/trail.component';
import { fetchAnnotations } from '../actions/trail-annotations.action-creator';
import { saveAnnotation } from '../actions/trail-annotations.action-creator';
import { fetchTrails } from '../actions/trails.action-creator';

const mapStateToProps = ({annotations, trails }) => {
  return { annotations, trails };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchAnnotations,
    fetchTrails,
    saveAnnotation
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TrailsPage);

