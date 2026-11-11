export const APP_LAYOUT_SET_SELECTED_MENU = "applayout/SET_SELECTED_MENU";
export const APP_LAYOUT_SET_SELECTED_SDUIMENU =
  "applayout/SET_SELECTED_SDUIMENU";

export const APP_LAYOUT_SET_SELECTED_SDUISUBMENU =
  "applayout/SET_SELECTED_SDUISUBMENU";
export const APP_LAYOUT_SET_COMPANY_DETAILS = "applayout/SET_COMPANY_DETAILS";
export const APP_LAYOUT_SET_PLAN_DETAILS = "applayout/SET_PLAN_DETAILS";
export const APP_LAYOUT_SET_ELIGIBILITY_DETAILS =
  "applayout/SET_ELIGIBILITY_DETAILS";
export const GLOBAL_TOAST_MESSAGE = "applayout/GLOBAL_TOAST_MESSAGE";
export const GLOBAL_USER_ROLE_CONFIGURATION =
  "applayout/GLOBAL_USER_ROLE_CONFIGURATION";
export const GLOBAL_USER_CONFIGURATION = "applayout/GLOBAL_USER_CONFIGURATION";
export const GLOBAL_PERMISSIONS_CONFIGURATION =
  "applayout/GLOBAL_PERMISSIONS_CONFIGURATION";
export const PAD_NUMBER_CONFIGURATION = "applayout/PAD_NUMBER_CONFIGURATION";
export const SET_MANAGE_DASHBOARD_PAYROLL =
  "applayout/SET_MANAGE_DASHBOARD_PAYROLL";
export const GLOBAL_CACHE_CONFIGURATION =
  "applayout/GLOBAL_CACHE_CONFIGURATION";
export const SET_MANAGE_ADVISOR_PATH_INFO =
  "applayout/SET_MANAGE_ADVISOR_PATH_INFO";
export const SET_APP_USEAGE = "applayout/SET_APP_USEAGE";
export const FROM_PLAN_CONTACT = "applayout/FROM_PLAN_CONTACT";
export const SET_INCLUDE_PAYROLL_INFORMATION =
  "applayout/SET_INCLUDE_PAYROLL_INFORMATION";
export const SET_PARENT_FILE_ID = "applayout/SET_PARENT_FILE_ID";

export const setUserRole = (payload) => ({
  type: GLOBAL_USER_ROLE_CONFIGURATION,
  payload,
});
export const setUser = (payload) => ({
  type: GLOBAL_USER_CONFIGURATION,
  payload,
});

export const setSelectedMenu = (payload) => ({
  type: APP_LAYOUT_SET_SELECTED_MENU,
  payload,
});

export const setSelectedSDUIMenu = (payload) => ({
  type: APP_LAYOUT_SET_SELECTED_SDUIMENU,
  payload,
});

export const setSelectedSDUISubMenu = (payload) => ({
  type: APP_LAYOUT_SET_SELECTED_SDUISUBMENU,
  payload,
});

export const setCompanyDetails = (payload) => ({
  type: APP_LAYOUT_SET_COMPANY_DETAILS,
  payload,
});

export const setPlanDetails = (payload) => ({
  type: APP_LAYOUT_SET_PLAN_DETAILS,
  payload,
});

export const setEligibilityDetails = (payload) => ({
  type: APP_LAYOUT_SET_ELIGIBILITY_DETAILS,
  payload,
});

export const globalToastInfo = (payload) => ({
  type: GLOBAL_TOAST_MESSAGE,
  payload,
});

export const setPermissions = (payload) => ({
  type: GLOBAL_PERMISSIONS_CONFIGURATION,
  payload,
});
export const setPadNumber = (payload) => ({
  type: PAD_NUMBER_CONFIGURATION,
  payload,
});
export const navigateToPayroll = (payload) => ({
  type: SET_MANAGE_DASHBOARD_PAYROLL,
  payload,
});
export const setGlobalCache = (payload) => ({
  type: GLOBAL_CACHE_CONFIGURATION,
  payload,
});

export const setManageAdvisorPathInfo = (payload) => ({
  type: SET_MANAGE_ADVISOR_PATH_INFO,
  payload,
});
export const setAppUseage = (payload) => ({
  type: SET_APP_USEAGE,
  payload,
});

export const setIncludePayrollInformation = (payload) => ({
  type: SET_INCLUDE_PAYROLL_INFORMATION,
  payload,
});

export const setParentFileId = (payload) => ({
  type: SET_PARENT_FILE_ID,
  payload,
});
