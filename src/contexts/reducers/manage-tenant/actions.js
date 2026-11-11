export const MANAGE_TENANT_SET_FLOW = "managetenant/SET_FLOW";
export const MANAGE_TENANT_SET_SELECTED_MENU = "managetenant/SET_SELECTED_MENU";
export const MANAGE_TENANT_SET_TOAST_INFO = "managetenant/SET_TOAST_INFO";
export const SET_TENANT_ID_INFO = "managetenant/SET_TENANT_ID_INFO";
export const MANAGE_TENANT_ID_INFO = "managetenant/MANAGE_TENANT_ID_INFO";

export const setTenantIdInfo = (payload) => ({
  type: SET_TENANT_ID_INFO,
  payload,
});

export const manageTenantIdInfo = (payload) => ({
  type: MANAGE_TENANT_ID_INFO,
  payload,
});
export const setManageTenantFlow = (payload) => ({
  type: MANAGE_TENANT_SET_FLOW,
  payload,
});

export const setManageTenantSelectedMenu = (payload) => ({
  type: MANAGE_TENANT_SET_SELECTED_MENU,
  payload,
});

export const setManageTenantToastInfo = (payload) => ({
  type: MANAGE_TENANT_SET_TOAST_INFO,
  payload,
});
