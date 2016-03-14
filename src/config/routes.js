'use strict';
import { SplashPage } from '../components/splash-page';
import LoginPage from '../containers/login.container';
import TrailMap from '../containers/trail-map.container';
import ReportProblem from '../components/report-problem/report-problem.container';
import ReportProblemIssueType from '../components/report-problem/report-problem-issue-type.container';
import TrailMenu from '../containers/trail-menu.container';


export default {
  SPLASH: SplashPage,
  LOGIN: LoginPage,
  LANDING_PAGE: TrailMenu,
  REPORT_PROBLEM: ReportProblem,
  TRAIL_MAP: TrailMap,
  REPORT_PROBLEM_ISSUE_TYPE:ReportProblemIssueType,
};
