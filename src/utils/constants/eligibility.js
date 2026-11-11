import { ROUTES } from "./common";

export const MANAGE_ELIGIBILITY_ROUTES = {
  ELIGIBILITY: `eligibility-summary`,
  ELIGIBILITY_SUMMARY_REPORTS: `eligibility-process-reports`,
  NEW_EMPLOYEE_ELIGIBILITY_REPORT: `new-employee-eligibility-reports`,
  VESTING_SUMMARY_REPORTS: `vesting-process-reports`,
  NEW_EMPLOYEE_VESTING_REPORT: `new-employee-vesting-reports`,
  ENROLLMENT: `enrollment`,
};

export const MANAGE_VESTING_ROUTES = {
  VESTING: `${ROUTES.MANAGE_ELIGIBILITY}/vesting-summary`,
};

export const MANAGE_ELIGIBILITY_MENU = [
  {
    id: "eligibilitySummaryReports",
    label: "Eligibility Process",
    path: MANAGE_ELIGIBILITY_ROUTES.ELIGIBILITY_SUMMARY_REPORTS,
    contentHeader: "Eligibility Process",
    breadCrumbs: [],
    childRoutes: [
      MANAGE_ELIGIBILITY_ROUTES.ELIGIBILITY_SUMMARY_REPORTS,
      MANAGE_ELIGIBILITY_ROUTES.NEW_EMPLOYEE_ELIGIBILITY_REPORT,
    ],
  },
  {
    id: "vestingSummaryReports",
    label: "Vesting Process",
    path: MANAGE_ELIGIBILITY_ROUTES.VESTING_SUMMARY_REPORTS,
    contentHeader: "Vesting Process",
    breadCrumbs: [],
    childRoutes: [
      MANAGE_ELIGIBILITY_ROUTES.VESTING_SUMMARY_REPORTS,
      MANAGE_ELIGIBILITY_ROUTES.NEW_EMPLOYEE_VESTING_REPORT,
    ],
  },
  {
    id: "enrollmentReports",
    label: "Enrollment Process",
    path: MANAGE_ELIGIBILITY_ROUTES.ENROLLMENT,
    contentHeader: "Enrollment",
    breadCrumbs: [],
    childRoutes: [MANAGE_ELIGIBILITY_ROUTES.ENROLLMENT],
  },
];

export const ALL_MANAGE_ELIGIBILITY_ROUTES = [
  ...MANAGE_ELIGIBILITY_MENU,
  {
    id: "eligibilitys",
    contentHeader: "Eligibility",
    path: MANAGE_ELIGIBILITY_ROUTES.ELIGIBILITY,
    breadCrumbs: [
      {
        label: "Manage Eligibility",
        link: MANAGE_ELIGIBILITY_ROUTES.ELIGIBILITY,
      },
    ],
  },
  {
    id: "eligibilitySummaryReports",
    contentHeader: "Eligibility Process",
    path: MANAGE_ELIGIBILITY_ROUTES.ELIGIBILITY_SUMMARY_REPORTS,
    breadCrumbs: [
      {
        label: "Eligibility Process",
        link: MANAGE_ELIGIBILITY_ROUTES.ELIGIBILITY_SUMMARY_REPORTS,
      },
    ],
  },
  {
    id: "eligibilitySummaryReports",
    contentHeader: "Eligibility Process",
    path: MANAGE_ELIGIBILITY_ROUTES.NEW_EMPLOYEE_ELIGIBILITY_REPORT,
    breadCrumbs: [
      {
        label: "New Employee Eligibility",
        link: MANAGE_ELIGIBILITY_ROUTES.NEW_EMPLOYEE_ELIGIBILITY_REPORT,
      },
    ],
  },
  {
    id: "enrollmentReports",
    contentHeader: "Enrollment",
    path: MANAGE_ELIGIBILITY_ROUTES.ENROLLMENT,
    breadCrumbs: [
      {
        label: "Enrollment",
        link: MANAGE_ELIGIBILITY_ROUTES.ENROLLMENT,
      },
    ],
  },
  {
    id: "vestings",
    contentHeader: "Vesting",
    path: MANAGE_VESTING_ROUTES.VESTING,
    breadCrumbs: [
      {
        label: "Manage Vesting",
        link: MANAGE_VESTING_ROUTES.VESTING,
      },
    ],
  },
  {
    id: "vestingSummaryReports",
    contentHeader: "Vesting Process",
    path: MANAGE_VESTING_ROUTES.VESTING_SUMMARY_REPORTS,
    breadCrumbs: [
      {
        label: "Vesting Process",
        link: MANAGE_VESTING_ROUTES.VESTING_SUMMARY_REPORTS,
      },
    ],
  },
  {
    id: "vestingSummaryReports",
    contentHeader: "Vesting Process",
    path: MANAGE_VESTING_ROUTES.NEW_EMPLOYEE_VESTING_REPORT,
    breadCrumbs: [
      {
        label: "New Employee Vesting",
        link: MANAGE_VESTING_ROUTES.NEW_EMPLOYEE_VESTING_REPORT,
      },
    ],
  },
];

export const manageEligibilityFormNames = {
  ELIGIBILITY_PROCESS: "eligibility process",
  ELIGIBILITY_SUMMARY_FILTER: "eligibility summary filter",
  EMPLOYEE_ELIGIBILITY_FILTER: "employee eligilibity filter",
  ENROLLMENT_SUMMARY_FILTER: "enrollment summary filter",
};

export const manageVestingFormNames = {
  VESTING_PROCESS: "vesting process",
  VESTING_SUMMARY_FILTER: "vesting summary filter",
  EMPLOYEE_VESTING_FILTER: "employee vesting filter",
};

export const eligibilityFormFields = {
  [manageEligibilityFormNames.ELIGIBILITY_PROCESS]: {
    companyName: "companyName",
    companyId: "companyId",
    planName: "planName",
    planId: "planId",
    sources: "sources",
    startDate: "startDate",
    endDate: "endDate",
  },
  [manageEligibilityFormNames.ELIGIBILITY_SUMMARY_FILTER]: {
    companyName: "companyName",
    companyId: "companyId",
    planId: "planId",
    planName: "planName",
    rkPlanNumber: "rkPlanNumber",
    startDate: "startDate",
    endDate: "endDate",
  },
  [manageEligibilityFormNames.EMPLOYEE_ELIGIBILITY_FILTER]: {
    eligibilityType: "eligibilityType",
    source: "source",
    search: "search",
  },
  [manageEligibilityFormNames.ENROLLMENT_SUMMARY_FILTER]: {
    companyName: "companyName",
    companyId: "companyId",
    planId: "planId",
    planName: "planName",
    startDate: "startDate",
    endDate: "endDate",
  },
};

export const vestingFormFields = {
  [manageVestingFormNames.VESTING_PROCESS]: {
    companyName: "companyName",
    companyId: "companyId",
    planName: "planName",
    planId: "planId",
    sources: "sources",
    startDate: "startDate",
    endDate: "endDate",
  },
  [manageVestingFormNames.VESTING_SUMMARY_FILTER]: {
    companyName: "companyName",
    companyId: "companyId",
    planId: "planId",
    planName: "planName",
    rkPlanNumber: "rkPlanNumber",
    startDate: "startDate",
    endDate: "endDate",
  },
  [manageVestingFormNames.EMPLOYEE_VESTING_FILTER]: {
    vestingType: "vestingType",
    source: "source",
    search: "search",
  },
};
