export const MANAGE_FEE_SET_FLOW = "managemaster/SET_FLOW";
export const MANAGE_FEE_SET_SELECTED_MENU = "managemaster/SET_SELECTED_MENU";
export const MANAGE_FEE_SET_TOAST_INFO = "managemaster/SET_TOAST_INFO";
export const SET_BASIC_FEE_DATA = "managemaster/SET_BASIC_FEE_DATA";
export const SET_SCHEDULE_DATA = "managemaster/SET_SCHEDULE_DATA";
export const MANAGE_FEE_SET_CALCULATION_DATA =
  "managemaster/SET_CALCULATION_FEE_DATA";
export const MANAGE_FEE_SET_APPLICABLE_DATA =
  "managemaster/SET_FEE_APPLICABLE_DATA";
export const MANAGE_FEE_CALCULATION_DATA =
  "managemaster/SET_FEE_CALCULATION_DATA";
export const MANAGE_FEE_LOADING = "managemaster/LOADING";
export const MANAGE_FEE_ID_INFO = "managemaster/FEE_ID_INFO";
export const MANAGE_FEE_SUMMARY_INFO = "managemaster/FEE_SUMMARY_INFO";
export const MANAGE_FEE_TRANSACTION_INFO = "managemaster/FEE_TRANSACTION_INFO";
export const MANAGE_FEE_RUN_DATE = "managemaster/FEE_RUN_DATE";

export const setManageFeeFlow = (payload) => ({
  type: MANAGE_FEE_SET_FLOW,
  payload,
});

export const setManageFeeSelectedMenu = (payload) => ({
  type: MANAGE_FEE_SET_SELECTED_MENU,
  payload,
});

export const setManageFeeToastInfo = (payload) => ({
  type: MANAGE_FEE_SET_TOAST_INFO,
  payload,
});

export const setBasicFeeData = (payload) => ({
  type: SET_BASIC_FEE_DATA,
  payload,
});

export const setScheduleData = (payload) => ({
  type: SET_SCHEDULE_DATA,
  payload,
});

export const setManageFeeApplicableData = (payload) => ({
  type: MANAGE_FEE_SET_APPLICABLE_DATA,
  payload,
});

export const setManageCalculationData = (payload) => ({
  type: MANAGE_FEE_SET_CALCULATION_DATA,
  payload,
});

export const setFeeCalculationData = (payload) => ({
  type: MANAGE_FEE_CALCULATION_DATA,
  payload,
});

export const setFeeIsLoading = (payload) => ({
  type: MANAGE_FEE_LOADING,
  payload,
});

export const setFeeIdInfo = (payload) => ({
  type: MANAGE_FEE_ID_INFO,
  payload,
});
export const setFeeSummaryInfo = (payload) => ({
  type: MANAGE_FEE_SUMMARY_INFO,
  payload,
});

export const setFeeTransactionInfo = (payload) => ({
  type: MANAGE_FEE_TRANSACTION_INFO,
  payload,
});
export const setFeeRunDate = (payload) => ({
  type: MANAGE_FEE_RUN_DATE,
  payload,
});
