'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TrailMenu } from './';

const mapStateToProps = ({annotations, trails }) => {
  return { annotations, trails};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TrailMenu);
