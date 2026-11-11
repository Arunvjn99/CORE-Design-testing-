import { get } from "lodash-es";
import {
  MANAGE_RKAAS_SET_FLOW,
  MANAGE_RKAAS_SET_SELECTED_MENU,
  MANAGE_RKAAS_SET_TOAST_INFO,
  MANAGE_RKAAS_LOCAL_CACHE,
  MANAGE_RKAAS_CLEAR_LOCAL_CACHE,
  MANAGE_RKAAS_POST_API_ERROR,
} from "./actions";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case MANAGE_RKAAS_SET_SELECTED_MENU:
      return {
        ...state,
        selectedMenu: payload,
      };
    case MANAGE_RKAAS_SET_FLOW:
      return {
        ...state,
        ...payload,
      };
    case MANAGE_RKAAS_SET_TOAST_INFO: {
      return {
        ...state,
        showToast: get(payload, "showToast", false),
        toastMessage: get(payload, "toastMessage", ""),
      };
    }
    case MANAGE_RKAAS_LOCAL_CACHE:
      return {
        ...state,
        [payload.model]: payload.data,
      };
    case MANAGE_RKAAS_CLEAR_LOCAL_CACHE:
      delete state[payload];
      return {
        ...state,
      };
    case MANAGE_RKAAS_POST_API_ERROR:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          isError: true,
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;
