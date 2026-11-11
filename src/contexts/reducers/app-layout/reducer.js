import {
  APP_LAYOUT_SET_SELECTED_MENU,
  APP_LAYOUT_SET_COMPANY_DETAILS,
  APP_LAYOUT_SET_PLAN_DETAILS,
  APP_LAYOUT_SET_ELIGIBILITY_DETAILS,
  GLOBAL_TOAST_MESSAGE,
  GLOBAL_USER_ROLE_CONFIGURATION,
  GLOBAL_USER_CONFIGURATION,
  GLOBAL_PERMISSIONS_CONFIGURATION,
  PAD_NUMBER_CONFIGURATION,
  SET_MANAGE_DASHBOARD_PAYROLL,
  GLOBAL_CACHE_CONFIGURATION,
  SET_MANAGE_ADVISOR_PATH_INFO,
  SET_APP_USEAGE,
  FROM_PLAN_CONTACT,
  APP_LAYOUT_SET_SELECTED_SDUIMENU,
  APP_LAYOUT_SET_SELECTED_SDUISUBMENU,
  SET_INCLUDE_PAYROLL_INFORMATION,
  SET_PARENT_FILE_ID,
} from "./actions";
import { get } from "lodash-es";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GLOBAL_USER_ROLE_CONFIGURATION:
      return {
        ...state,
        userRole: payload,
      };
    case GLOBAL_USER_CONFIGURATION:
      return {
        ...state,
        user: payload,
      };
    case APP_LAYOUT_SET_SELECTED_MENU:
      return {
        ...state,
        selectedMenu: payload,
      };
    case APP_LAYOUT_SET_SELECTED_SDUIMENU:
      return {
        ...state,
        selectedSDUIMenu: payload,
      };
    case APP_LAYOUT_SET_SELECTED_SDUISUBMENU:
      return {
        ...state,
        selectedSDUISubMenu: payload,
      };
    case GLOBAL_PERMISSIONS_CONFIGURATION:
      return {
        ...state,
        permissions: payload,
      };
    case PAD_NUMBER_CONFIGURATION:
      return {
        ...state,
        padnumbers: payload,
      };
    case GLOBAL_TOAST_MESSAGE: {
      return {
        ...state,
        showToast: get(payload, "showToast", false),

        toastMessage: get(payload, "toastMessage", ""),
        // toastMessage2: get(payload, "toastMessage2", ""),
        toastMessage1: get(payload, "toastMessage1", ""),
        // reject: get(payload, "reject", false),
      };
    }
    case APP_LAYOUT_SET_COMPANY_DETAILS:
      return {
        ...state,
        companyDetails: payload,
      };
    case APP_LAYOUT_SET_PLAN_DETAILS:
      return {
        ...state,
        planDetails: payload,
      };
    case APP_LAYOUT_SET_ELIGIBILITY_DETAILS:
      return {
        ...state,
        eligibilityDetails: payload,
      };
    case SET_MANAGE_DASHBOARD_PAYROLL:
      return {
        ...state,
        planDashboardPayrollDetails: payload,
      };
    case GLOBAL_CACHE_CONFIGURATION: {
      const { label, data } = payload;
      return {
        ...state,
        [label]: data,
      };
    }
    case SET_MANAGE_ADVISOR_PATH_INFO: {
      return {
        ...state,
        manageAdvisorPathInfo: payload,
      };
    }
    case SET_APP_USEAGE: {
      return {
        ...state,
        appUsage: action.payload,
      };
    }
    case FROM_PLAN_CONTACT: {
      return {
        ...state,
        isFromPlanContact: action.payload,
      };
    }
    case SET_INCLUDE_PAYROLL_INFORMATION: {
      return {
        ...state,
        includePayrollInformation: payload,
      };
    }
    case SET_PARENT_FILE_ID: {
      return {
        ...state,
        parentFileId: payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
