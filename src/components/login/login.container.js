'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginPage from './login.component';
import { loginActionCreator, logoutActionCreator } from '../../actions/login.action-creator';

const mapStateToProps = ({user}) => {
  return { user };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loginActionCreator,
    logoutActionCreator
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
