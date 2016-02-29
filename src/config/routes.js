'use strict';
import SplashPage from '../components/splash-page.component';
import LoginPage from '../containers/login.container';
import TrailMap from '../containers/trail-map.container';
import ReportProblem from '../containers/report-problem.container';
import TrailMenu from '../containers/trail-menu.container';


export default {
  SPLASH: SplashPage,
  LOGIN: LoginPage,
  LANDING_PAGE: TrailMenu,
  REPORT_PROBLEM: ReportProblem,
  TRAIL_MAP: TrailMap,
};
