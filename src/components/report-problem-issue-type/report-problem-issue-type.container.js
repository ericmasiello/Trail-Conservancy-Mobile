'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReportProblemIssueType from './report-problem-issue-type.component';
import { cacheLastAnnotation } from '../../actions/trail-annotations.action-creator';

const mapStateToProps = ({photo, annotations}) => {
  return { photo, annotations };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({cacheLastAnnotation
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportProblemIssueType);

