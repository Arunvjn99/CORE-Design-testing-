export const MANAGE_TRADE_SET_FLOW = "managetrade/SET_FLOW";
export const MANAGE_TRADE_SET_SELECTED_MENU = "managetrade/SET_SELECTED_MENU";
export const MANAGE_TRADE_SET_TOAST_INFO = "managetrade/SET_TOAST_INFO";
export const MANAGE_TRADE_LOCAL_CACHE = "managetrade/LOCAL_CACHE";
export const MANAGE_TRADE_CLEAR_LOCAL_CACHE = "managetrade/CLEAR_LOCAL_CACHE";
export const MANAGE_TRADE_POST_API_ERROR = "managetrade/POST_API_ERROR";
export const MANAGER_TRADE_FILE_DETAILS = "managetrade/FILE_DETAILS";

export const setManageTradeFlow = (payload) => ({
  type: MANAGE_TRADE_SET_FLOW,
  payload,
});

export const setManageTradeSelectedMenu = (payload) => ({
  type: MANAGE_TRADE_SET_SELECTED_MENU,
  payload,
});

export const setManageTradeToastInfo = (payload) => ({
  type: MANAGE_TRADE_SET_TOAST_INFO,
  payload,
});

export const setManageTradeLocalCache = (payload) => ({
  type: MANAGE_TRADE_LOCAL_CACHE,
  payload,
});

export const clearLocalCacheByModelTrade = (payload) => ({
  type: MANAGE_TRADE_CLEAR_LOCAL_CACHE,
  payload,
});

export const setManageTradePostApiError = (payload) => ({
  type: MANAGE_TRADE_POST_API_ERROR,
  payload,
});

export const setManageTradeFileDetails = (payload) => ({
  type: MANAGER_TRADE_FILE_DETAILS,
  payload,
});
