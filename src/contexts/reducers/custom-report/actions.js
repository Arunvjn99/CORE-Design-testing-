export const MANAGE_CUSTOM_REPORT_SET_FLOW = "managecustomreport/SET_FLOW";
export const MANAGE_CUSTOM_REPORT_SET_SELECTED_MENU =
  "managecustomreport/SET_SELECTED_MENU";
export const MANAGE_CUSTOM_REPORT_SET_TOAST_INFO =
  "managecustomreport/SET_TOAST_INFO";
export const MANAGE_CUSTOM_REPORT_LOCAL_CACHE =
  "managecustomreport/LOCAL_CACHE";
export const MANAGE_CUSTOM_REPORT_CLEAR_LOCAL_CACHE =
  "managecustomreport/CLEAR_LOCAL_CACHE";
export const MANAGE_CUSTOM_REPORT_POST_API_ERROR =
  "managecustomreport/POST_API_ERROR";

export const setManageCustomReportFlow = (payload) => ({
  type: MANAGE_CUSTOM_REPORT_SET_FLOW,
  payload,
});

export const setManageCustomReportSelectedMenu = (payload) => ({
  type: MANAGE_CUSTOM_REPORT_SET_SELECTED_MENU,
  payload,
});

export const setManageCustomReportToastInfo = (payload) => ({
  type: MANAGE_CUSTOM_REPORT_SET_TOAST_INFO,
  payload,
});

export const setManageCustomReportLocalCache = (payload) => ({
  type: MANAGE_CUSTOM_REPORT_LOCAL_CACHE,
  payload,
});

export const clearLocalCacheByModelCustomReport = (payload) => ({
  type: MANAGE_CUSTOM_REPORT_CLEAR_LOCAL_CACHE,
  payload,
});

export const setManageCustomReportPostApiError = (payload) => ({
  type: MANAGE_CUSTOM_REPORT_POST_API_ERROR,
  payload,
});
