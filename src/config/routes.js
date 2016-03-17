'use strict';
import { SplashPage } from '../components/splash-page';
import LoginPage from '../components/login/login.container';
import TrailMap from '../components/trail-map/trail-map.container';
import ReportProblem from '../components/report-problem/report-problem.container';
import ReportProblemIssueType from '../components/report-problem-issue-type/report-problem-issue-type.container';
import TrailMenu from '../components/trail-menu/trail-menu.container';


export default {
  SPLASH: SplashPage,
  LOGIN: LoginPage,
  LANDING_PAGE: TrailMenu,
  REPORT_PROBLEM: ReportProblem,
  TRAIL_MAP: TrailMap,
  REPORT_PROBLEM_ISSUE_TYPE:ReportProblemIssueType,
};
