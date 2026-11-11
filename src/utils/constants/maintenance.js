import { MANAGE_PLAN_CONFIG_ROUTES, ROUTES } from "./common";

export const MANAGE_MAINTENANCE_ROUTES = {
  SCHEDULE_EXCEPTION_REPORT: `schedule-exception-report`,
};

export const MANAGE_MAINTENANCE_MENU = [
  {
    id: "scheduleExceptionReport",
    label: "Schedule exceptions report",
    path: MANAGE_MAINTENANCE_ROUTES.SCHEDULE_EXCEPTION_REPORT,
    contentHeader: "Manage Schedule exceptions",
    breadCrumbs: [],
    childRoutes: [],
  },
];

export const ALL_MANAGE_MAINTENANCE_ROUTES = [
  ...MANAGE_MAINTENANCE_MENU,
  {
    id: "holidayCalendar",
    contentHeader: "Maintenance",
    path: MANAGE_PLAN_CONFIG_ROUTES.HOLIDAY_CALENDAR,
    breadCrumbs: [
      {
        label: "Manage Maintenance",
        link: MANAGE_PLAN_CONFIG_ROUTES.HOLIDAY_CALENDAR,
      },
    ],
  },
  {
    id: "holidayCalendar",
    contentHeader: "Holiday",
    path: MANAGE_PLAN_CONFIG_ROUTES.ADD_HOLIDAY,
    breadCrumbs: [
      {
        label: "Home",
        link: ROUTES.HOME,
      },
      {
        label: "Manage Holiday Calendar",
        link: MANAGE_PLAN_CONFIG_ROUTES.HOLIDAY_CALENDAR,
      },
    ],
  },
  {
    id: "managePlanGroup",
    contentHeader: "Maintenance",
    path: MANAGE_PLAN_CONFIG_ROUTES.MANAGE_PLAN_GROUP,
    breadCrumbs: [
      {
        label: "Manage Maintenance",
        link: MANAGE_PLAN_CONFIG_ROUTES.MANAGE_PLAN_GROUP,
      },
    ],
  },
  {
    id: "managePlanGroup",
    contentHeader: "Plan Group",
    path: MANAGE_PLAN_CONFIG_ROUTES.ADD_PLAN_GROUP,
    breadCrumbs: [
      {
        label: "Home",
        link: ROUTES.HOME,
      },
      {
        label: "Maintenance",
        link: MANAGE_PLAN_CONFIG_ROUTES.MANAGE_PLAN_GROUP,
      },
    ],
  },
];

export const manageMaintenanceFormNames = {
  HOLIDAY_CALENDAR: "holiday calendar",
  ADD_NEW_HOLIDAY: "new holiday calendar",
  SCHEDULE_EXTENSION: "schedule extension",
  SCHEDULE_EXCEPTION_REPORT: "schedule exception report",
  MANAGE_PLAN_GROUP: "manage_plan_group",
  ADD_PLAN_GROUP: "add_plan_group",
};

export const maintenanceFormFields = {
  [manageMaintenanceFormNames.HOLIDAY_CALENDAR]: {
    selectYear: "selectYear",
  },
  [manageMaintenanceFormNames.ADD_NEW_HOLIDAY]: {
    date: "holidayDate",
    holidayName: "name",
    holidayDescription: "description",
  },
  [manageMaintenanceFormNames.SCHEDULE_EXTENSION]: {
    extendScheduleDate: "extendScheduleDate",
  },
  [manageMaintenanceFormNames.SCHEDULE_EXCEPTION_REPORT]: {
    companyName: "companyName",
    companyId: "companyId",
    frequency: "frequency",
    payrollFrequency: "payrollFrequency",
    scheduleStartFrom: "scheduleStartFrom",
    scheduleStartTo: "scheduleStartTo",
    scheduleEndFrom: "scheduleEndFrom",
    scheduleEndTo: "scheduleEndTo",
    periodStartFrom: "periodStartFrom",
    periodStartTo: "periodStartTo",
    periodEndFrom: "periodEndFrom",
    periodEndTo: "periodEndTo",
    payDateFrom: "payDateFrom",
    payDateTo: "payDateTo",
  },
  [manageMaintenanceFormNames.MANAGE_PLAN_GROUP]: {
    search: "search",
    planTypes: "planTypes",
  },
  [manageMaintenanceFormNames.ADD_PLAN_GROUP]: {
    planGroupName: "name",
    planGroupDescription: "description",
  },
};
export const PLANGROUP_RECORDS_TO_FETCH = 20;
