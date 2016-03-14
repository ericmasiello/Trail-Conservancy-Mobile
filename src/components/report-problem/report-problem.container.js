'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReportProblem from './report-problem.component';
import { saveAnnotation } from '../../actions/trail-annotations.action-creator';
import { savePhoto } from '../../actions/photo.action-creator';
import { fetchAnnotations } from '../../actions/trail-annotations.action-creator';
import { updateUserLocation } from '../../actions/user-location.action-creator';

const mapStateToProps = ({userLocation}) => {
  return { userLocation };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveAnnotation,
    savePhoto,
    fetchAnnotations,
    updateUserLocation
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportProblem);

