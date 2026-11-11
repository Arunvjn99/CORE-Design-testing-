import { get } from "lodash-es";
import {
  MANAGE_TRADE_SET_FLOW,
  MANAGE_TRADE_SET_SELECTED_MENU,
  MANAGE_TRADE_SET_TOAST_INFO,
  MANAGE_TRADE_LOCAL_CACHE,
  MANAGE_TRADE_CLEAR_LOCAL_CACHE,
  MANAGE_TRADE_POST_API_ERROR,
  MANAGER_TRADE_FILE_DETAILS,
} from "./actions";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case MANAGE_TRADE_SET_SELECTED_MENU:
      return {
        ...state,
        selectedMenu: payload,
      };
    case MANAGE_TRADE_SET_FLOW:
      return {
        ...state,
        ...payload,
      };
    case MANAGE_TRADE_SET_TOAST_INFO: {
      return {
        ...state,
        showToast: get(payload, "showToast", false),
        toastMessage: get(payload, "toastMessage", ""),
      };
    }
    case MANAGE_TRADE_LOCAL_CACHE:
      return {
        ...state,
        [payload.model]: payload.data,
      };
    case MANAGE_TRADE_CLEAR_LOCAL_CACHE:
      delete state[payload];
      return {
        ...state,
      };
    case MANAGE_TRADE_POST_API_ERROR:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          isError: true,
          error: payload,
        },
      };
    case MANAGER_TRADE_FILE_DETAILS:
      return {
        ...state,
        payload,
      };
    default:
      return state;
  }
};

export default reducer;
