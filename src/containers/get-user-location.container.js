'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserLocation from '../components/get-user-location.component';
import { updateUserLocation } from '../actions/user-location.action-creator';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
	updateUserLocation
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLocation);

