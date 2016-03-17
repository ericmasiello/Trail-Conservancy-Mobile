'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Photo from './photo.component';
import { fetchPhotoActionCreator } from '../../actions/photo.action-creator';

const mapStateToProps = ({userLocation}) => {
  return {  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
 fetchPhotoActionCreator
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Photo);

