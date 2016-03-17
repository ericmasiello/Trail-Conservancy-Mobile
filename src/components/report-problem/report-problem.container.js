'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReportProblem from './report-problem.component';
import { saveAnnotationActionCreator } from '../../actions/trail-annotations.action-creator';
import { savePhotoActionCreator } from '../../actions/photo.action-creator';
import { fetchAnnotationsActionCreator } from '../../actions/trail-annotations.action-creator';
import { updateUserLocationActionCreator } from '../../actions/user-location.action-creator';

const mapStateToProps = ({userLocation}) => {
  return { userLocation };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveAnnotationActionCreator,
    savePhotoActionCreator,
    fetchAnnotationsActionCreator,
    updateUserLocationActionCreator
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportProblem);

