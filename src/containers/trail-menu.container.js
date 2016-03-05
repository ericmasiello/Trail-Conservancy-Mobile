'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TrailMenu from '../components/trail-menu.component';

const mapStateToProps = ({annotations, trails, tabs }) => {
  return { annotations, trails, tabs};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TrailMenu);

