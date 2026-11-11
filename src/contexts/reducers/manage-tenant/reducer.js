import { get } from "lodash-es";
import {
  MANAGE_TENANT_SET_FLOW,
  MANAGE_TENANT_SET_SELECTED_MENU,
  MANAGE_TENANT_SET_TOAST_INFO,
  MANAGE_TENANT_ID_INFO,
  SET_TENANT_ID_INFO,
} from "./actions";
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case MANAGE_TENANT_SET_SELECTED_MENU:
      return {
        ...state,
        selectedMenu: payload,
      };
    case MANAGE_TENANT_SET_FLOW:
      return {
        ...state,
        ...payload,
      };
    case MANAGE_TENANT_SET_TOAST_INFO: {
      return {
        ...state,
        showToast: get(payload, "showToast", false),
        toastMessage: get(payload, "toastMessage", ""),
      };
    }
    case SET_TENANT_ID_INFO:
      return {
        ...state,
        id: payload.id,
        step: payload.step,
      };
    case MANAGE_TENANT_ID_INFO:
      return {
        ...state,
        tenantId: payload.id,
        step: payload.step,
      };
    default:
      return state;
  }
};

export default reducer;
