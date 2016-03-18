'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReportProblemComment from './report-problem-comment.component';
import { saveAnnotationActionCreator } from '../../actions/trail-annotations.action-creator';



const mapStateToProps = ({photo, annotations}) => {
  return { photo, annotations };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({saveAnnotationActionCreator
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportProblemComment);

