'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReportProblem from '../components/report-problem.component';
import { saveAnnotation } from '../actions/trail-annotations.action-creator';
import { savePhoto } from '../actions/photo.action-creator';
import { panMapActionCreator} from '../actions/map.action-creator';
import { fetchAnnotations } from '../actions/trail-annotations.action-creator';

const mapStateToProps = ({annotations }) => {
  return { annotations };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveAnnotation,
    savePhoto,
    fetchAnnotations,
    panMapActionCreator
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportProblem);

