export const SET_DIVIDEND_BASIC_DETAILS_DATA =
  "corporateAction/SET_DIVIDEND_BASIC_DETAILS_DATA";
export const MANAGE_DIVIDEND_SET_SELECTED_MENU =
  "corporateAction/MANAGE_DIVIDEND_SET_SELECTED_MENU";
export const SET_SCHEDULE_DIVIDEND_DATA =
  "corporateAction/SET_SCHEDULE_DIVIDEND_DATA";
export const SET_DIVIDEND_EXCLUSION_DETAILS_DATA =
  "corporateAction/SET_DIVIDEND_EXCLUSION_DETAILS_DATA";

export const MANAGE_DIVIDEND_SUMMARY_INFO =
  "corporateAction/MANAGE_DIVIDEND_SUMMARY_INFO";
export const SET_DIVIDEND_DETAILS_DATA =
  "corporateAction/SET_DIVIDEND_DETAILS_DATA";
export const SET_DIVIDEND_ID_INFO = "corporateAction/SET_DIVIDEND_ID_INFO";
export const MANAGE_DIVIDEND_ID_INFO =
  "corporateAction/MANAGE_DIVIDEND_ID_INFO";
export const MANAGE_DIVIDEND_SUMMARY_SET_SELECTED_MENU =
  "corporateAction/MANAGE_DIVIDEND_SUMMARY_SET_SELECTED_MENU";
export const SET_DETAILED_DIVIDEND_DATA =
  "corporateAction/SET_DETAILED_DIVIDEND_DATA";
export const SET_FUND_MERGER_SUMMARY =
  "corporateAction/SET_FUND_MERGER_SUMMARY";
export const MANAGE_FILE_MANAGER_SET_FLOW =
  "corporateAction/MANAGE_FILE_MANAGER_SET_FLOW";
export const FileManagerFLow = (payload) => ({
  type: MANAGE_FILE_MANAGER_SET_FLOW,
  payload,
});
export const setDividendIdInfo = (payload) => ({
  type: SET_DIVIDEND_ID_INFO,
  payload,
});

export const manageDividendIdInfo = (payload) => ({
  type: MANAGE_DIVIDEND_ID_INFO,
  payload,
});

export const setManagedividendSelectedMenu = (payload) => ({
  type: MANAGE_DIVIDEND_SET_SELECTED_MENU,
  payload,
});
export const setDividendBasicDetailsData = (payload) => ({
  type: SET_DIVIDEND_BASIC_DETAILS_DATA,
  payload,
});

export const setDividendDetailsData = (payload) => ({
  type: SET_DIVIDEND_DETAILS_DATA,
  payload,
});

export const setDividendExclusionDetailsData = (payload) => ({
  type: SET_DIVIDEND_EXCLUSION_DETAILS_DATA,
  payload,
});

export const setScheduleDividendData = (payload) => ({
  type: SET_SCHEDULE_DIVIDEND_DATA,
  payload,
});

export const setDividendSummaryInfo = (payload) => ({
  type: MANAGE_DIVIDEND_SUMMARY_INFO,
  payload,
});

export const setManageDividendSummarySelectedMenu = (payload) => ({
  type: MANAGE_DIVIDEND_SUMMARY_SET_SELECTED_MENU,
  payload,
});

export const setDetailedDividendData = (payload) => ({
  type: SET_DETAILED_DIVIDEND_DATA,
  payload,
});

export const setFundMergerSummary = (payload) => ({
  type: SET_FUND_MERGER_SUMMARY,
  payload,
});
