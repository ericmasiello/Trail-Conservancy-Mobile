'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TrailMenu from '../components/trail-menu.component';
import { fetchAnnotations } from '../actions/trail-annotations.action-creator';
import { saveAnnotation } from '../actions/trail-annotations.action-creator';
import { fetchTrails } from '../actions/trails.action-creator';
import { switchTabActionCreator } from '../actions/tabs.action-creator';

const mapStateToProps = ({annotations, trails, tabs }) => {
  return { annotations, trails, tabs};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchAnnotations,
    fetchTrails,
    saveAnnotation,
    switchTabActionCreator
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TrailMenu);

