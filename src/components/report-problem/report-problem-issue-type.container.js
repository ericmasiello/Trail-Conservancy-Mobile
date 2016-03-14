'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReportProblemIssueType from './report-problem-issue-type.component';

const mapStateToProps = ({userLocation}) => {
  return { userLocation };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportProblemIssueType);

