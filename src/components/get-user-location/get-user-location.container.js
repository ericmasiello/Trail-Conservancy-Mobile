'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserLocation from './get-user-location.component';
import { updateUserLocationActionCreator } from '../../actions/user-location.action-creator';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
	updateUserLocationActionCreator
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLocation);

