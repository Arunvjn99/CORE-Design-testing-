export const SET_ADJUSTMENT_ID_INFO = "adjustment/SET_ADJUSTMENT_ID_INFO";
export const MANAGE_ADJUSTMENT_SET_TOAST_INFO = "adjustment/SET_TOAST_INFO";
export const MANAGE_ADJUSTMENT_SET_SELECTED_MENU =
  "adjustment/SET_SELECTED_MENU";
export const MANAGE_CONTRIBUTION_REVERSAL_STATE =
  "adjustment/SET_MANAGE_CONTRIBUTION_REVERSAL_STATE";
export const MANAGE_BATCH_ADJUSTMENT_STATE =
  "adjustment/SET_MANAGE_BATCH_ADJUSTMENT_STATE";
export const SET_FEE_REVERSAL_DATA = "adjustment/SET_FEE_REVERSAL_DATA";

export const setAdjustmentIdInfo = (payload) => ({
  type: SET_ADJUSTMENT_ID_INFO,
  payload,
});

export const setManageAdjustmentToastInfo = (payload) => ({
  type: MANAGE_ADJUSTMENT_SET_TOAST_INFO,
  payload,
});

export const setManageAdjustmentSelectedMenu = (payload) => ({
  type: MANAGE_ADJUSTMENT_SET_SELECTED_MENU,
  payload,
});

export const setManageContributionReversalState = (payload) => ({
  type: MANAGE_CONTRIBUTION_REVERSAL_STATE,
  payload,
});

export const setManageBatchAdjustmentState = (payload) => ({
  type: MANAGE_BATCH_ADJUSTMENT_STATE,
  payload,
});
