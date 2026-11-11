import { get } from "lodash-es";
import {
  MANAGE_PLAN_CONFIG_SET_FLOW,
  MANAGE_PLAN_CONFIG_SET_SELECTED_MENU,
  MANAGE_PLAN_CONFIG_SET_LOADER,
  MANAGE_PLAN_CONFIG_SET_FULL_PAGE_DATA,
  MANAGE_PLAN_CONFIG_SET_TOAST_INFO,
  MANAGE_PLAN_CONFIG_SET_PAGE_DATA,
  MANAGE_PLAN_CONFIG_GET_API_RESPONSE,
  MANAGE_PLAN_CONFIG_GET_API_REQUEST,
  MANAGE_PLAN_CONFIG_GET_API_ERROR,
  MANAGE_PLAN_CONFIG_POST_API_RESPONSE,
  MANAGE_PLAN_CONFIG_POST_API_ERROR,
  MANAGE_PLAN_CONFIG_POST_API_REQUEST,
  MANAGE_PLAN_CONFIG_LOCAL_CACHE,
  MANAGE_PLAN_CONFIG_CLEAR_LOCAL_CACHE,
  MANAGE_PLAN_CONFIG_INNER_DETAILS,
  MANAGE_PLAN_CONFIG_IMAGE,
  MANAGE_PLAN_CONFIG_SET_POST_FETCHING_FALSE,
  SAVE_ADVISOR_REPRESENTATIVES,
  SAVE_CLEARING_PARTNER_ACCOUNT,
  SET_EDIT_ADVISOR_SLIDER_OPEN,
} from "./actions";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case MANAGE_PLAN_CONFIG_SET_SELECTED_MENU:
      return {
        ...state,
        selectedMenu: payload,
      };
    case MANAGE_PLAN_CONFIG_IMAGE: {
      const { formName, fieldData } = payload;
      return {
        ...state,
        [formName]: fieldData,
      };
    }
    case MANAGE_PLAN_CONFIG_SET_POST_FETCHING_FALSE:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          error: null,
        },
      };
    case MANAGE_PLAN_CONFIG_SET_FLOW:
      return {
        ...state,
        ...payload,
      };
    case MANAGE_PLAN_CONFIG_SET_FULL_PAGE_DATA:
      return {
        ...state,
        ...payload,
      };
    case MANAGE_PLAN_CONFIG_SET_LOADER:
      return {
        ...state,
        isLoading: payload,
      };
    case MANAGE_PLAN_CONFIG_SET_PAGE_DATA: {
      const { formName, fieldData } = payload;
      return {
        ...state,
        [formName]: { ...fieldData },
      };
    }
    case MANAGE_PLAN_CONFIG_SET_TOAST_INFO: {
      return {
        ...state,
        showToast: get(payload, "showToast", false),
        toastMessage: get(payload, "toastMessage", ""),
      };
    }

    case MANAGE_PLAN_CONFIG_GET_API_REQUEST:
    case MANAGE_PLAN_CONFIG_POST_API_REQUEST:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: true,
          error: null,
        },
      };
    case MANAGE_PLAN_CONFIG_GET_API_RESPONSE:
    case MANAGE_PLAN_CONFIG_POST_API_RESPONSE:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          data: payload,
          isError: false,
        },
      };
    case MANAGE_PLAN_CONFIG_GET_API_ERROR:
    case MANAGE_PLAN_CONFIG_POST_API_ERROR:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          isError: true,
          error: payload,
        },
      };

    case MANAGE_PLAN_CONFIG_LOCAL_CACHE:
      return {
        ...state,
        [payload.model]: payload.data,
      };
    case MANAGE_PLAN_CONFIG_CLEAR_LOCAL_CACHE:
      delete state[payload];
      return {
        ...state,
      };
    case MANAGE_PLAN_CONFIG_INNER_DETAILS:
      return {
        ...state,
        innerDetailsFlag: payload,
      };
    case SAVE_ADVISOR_REPRESENTATIVES:
      return {
        ...state,
        nextAdvisor: payload,
      };
    case SAVE_CLEARING_PARTNER_ACCOUNT:
      return {
        ...state,
        nextClearingPartner: payload,
      };
    case SET_EDIT_ADVISOR_SLIDER_OPEN:
      return {
        ...state,
        editAdvisorSliderOpen: payload,
      };
    default:
      return state;
  }
};

export default reducer;
