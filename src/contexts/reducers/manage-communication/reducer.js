import { get } from "lodash-es";
import {
  MANAGE_COMMUNICATION_SET_FLOW,
  MANAGE_COMMUNICATION_SET_SELECTED_MENU,
  MANAGE_COMMUNICATION_SET_LOADER,
  MANAGE_COMMUNICATION_SET_FULL_PAGE_DATA,
  MANAGE_COMMUNICATION_SET_TOAST_INFO,
  MANAGE_COMMUNICATION_SET_PAGE_DATA,
  MANAGE_COMMUNICATION_GET_API_REQUEST,
  MANAGE_COMMUNICATION_LOCALCACHE,
} from "./actions";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case MANAGE_COMMUNICATION_SET_SELECTED_MENU:
      return {
        ...state,
        selectedMenu: payload,
      };
    case MANAGE_COMMUNICATION_SET_FLOW:
      return {
        ...state,
        ...payload,
      };
    case MANAGE_COMMUNICATION_SET_FULL_PAGE_DATA:
      return {
        ...state,
        ...payload,
      };
    case MANAGE_COMMUNICATION_SET_LOADER:
      return {
        ...state,
        isLoading: payload,
      };
    case MANAGE_COMMUNICATION_SET_PAGE_DATA: {
      const { formName, fieldData } = payload;
      return {
        ...state,
        [formName]: { ...fieldData },
      };
    }
    case MANAGE_COMMUNICATION_SET_TOAST_INFO: {
      return {
        ...state,
        showToast: get(payload, "showToast", false),
        toastMessage: get(payload, "toastMessage", ""),
      };
    }

    case MANAGE_COMMUNICATION_GET_API_REQUEST:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: true,
          error: null,
        },
      };
    case MANAGE_COMMUNICATION_LOCALCACHE:
      return {
        ...state,
        [payload.model]: payload.data,
      };
    default:
      return state;
  }
};

export default reducer;
