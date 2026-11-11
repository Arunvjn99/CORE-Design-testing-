export const MANAGE_RKAAS_SET_FLOW = "managerkaas/SET_FLOW";
export const MANAGE_RKAAS_SET_SELECTED_MENU = "managerkaas/SET_SELECTED_MENU";
export const MANAGE_RKAAS_SET_TOAST_INFO = "managerkaas/SET_TOAST_INFO";
export const MANAGE_RKAAS_LOCAL_CACHE = "managerkaas/LOCAL_CACHE";
export const MANAGE_RKAAS_CLEAR_LOCAL_CACHE = "managerkaas/CLEAR_LOCAL_CACHE";
export const MANAGE_RKAAS_POST_API_ERROR = "managerkaas/POST_API_ERROR";

export const setManageRkaasFlow = (payload) => ({
  type: MANAGE_RKAAS_SET_FLOW,
  payload,
});

export const setManageRkaasSelectedMenu = (payload) => ({
  type: MANAGE_RKAAS_SET_SELECTED_MENU,
  payload,
});

export const setManageRkaasToastInfo = (payload) => ({
  type: MANAGE_RKAAS_SET_TOAST_INFO,
  payload,
});

export const setManageRkaasLocalCache = (payload) => ({
  type: MANAGE_RKAAS_LOCAL_CACHE,
  payload,
});

export const clearLocalCacheByModelRkaas = (payload) => ({
  type: MANAGE_RKAAS_CLEAR_LOCAL_CACHE,
  payload,
});

export const setManageRkaasPostApiError = (payload) => ({
  type: MANAGE_RKAAS_POST_API_ERROR,
  payload,
});
