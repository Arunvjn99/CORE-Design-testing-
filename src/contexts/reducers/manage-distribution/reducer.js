import { get } from "lodash-es";
import {
  MANAGE_WITHDRAWAL_REQUEST_PAGE_DATA,
  MANAGE_DISTRIBUTION_SET_TOAST_INFO,
  MANAGE_DISTRIBUTION_GET_API_REQUEST,
  MANAGE_DISTRIBUTION_POST_API_REQUEST,
  MANAGE_DISTRIBUTION_GET_API_RESPONSE,
  MANAGE_DISTRIBUTION_POST_API_RESPONSE,
  MANAGE_DISTRIBUTION_GET_API_ERROR,
  MANAGE_DISTRIBUTION_POST_API_ERROR,
  MANAGE_DISTRIBUTION_SET_FLOW,
  MANAGE_TRANSACTION_SET_LOAN_DATA,
  MANAGE_CENSUS_DATA_FROM_API,
  MANAGE_TRANSFER_REQUEST_PAGE_DATA,
  MANAGE_TRANSFER_POST_API_REQUEST,
  MANAGE_TRANSFER_POST_API_RESPONSE,
  MANAGE_TRANSFER_POST_API_ERROR,
  CACHE_WITHDRAWAL_REQUEST_DATA,
  MANAGE_LOAN_SUMMARY_TOAST_INFO,
} from "./actions";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case MANAGE_DISTRIBUTION_SET_FLOW:
      return {
        ...state,
        ...payload,
      };
    case MANAGE_TRANSACTION_SET_LOAN_DATA: {
      return {
        ...state,
        loanData: payload,
      };
    }
    case MANAGE_LOAN_SUMMARY_TOAST_INFO: {
      return {
        ...state,
        showToast: get(payload, "showToast", false),
        toastMessage: get(payload, "toastMessage", ""),
      };
    }
    case MANAGE_DISTRIBUTION_SET_TOAST_INFO:
      return {
        ...state,
        showToast: get(payload, "showToast", false),
        toastMessage: get(payload, "toastMessage", ""),
      };
    case MANAGE_WITHDRAWAL_REQUEST_PAGE_DATA: {
      const { formName, fieldData } = payload;
      return {
        ...state,
        [formName]: fieldData,
      };
    }
    case MANAGE_TRANSFER_REQUEST_PAGE_DATA: {
      const { formName, fieldData } = payload;
      return {
        ...state,
        [formName]: fieldData,
      };
    }
    case MANAGE_DISTRIBUTION_GET_API_REQUEST:
    case MANAGE_DISTRIBUTION_POST_API_REQUEST:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: true,
          error: null,
        },
      };
    case MANAGE_DISTRIBUTION_GET_API_RESPONSE:
    case MANAGE_DISTRIBUTION_POST_API_RESPONSE:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          data: payload,
          isError: false,
        },
      };
    case MANAGE_DISTRIBUTION_GET_API_ERROR:
    case MANAGE_DISTRIBUTION_POST_API_ERROR:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          isError: true,
          data: payload,
          error: payload.errorMessages,
        },
      };
    case MANAGE_CENSUS_DATA_FROM_API:
      return {
        ...state,
        api: {
          ...state.api,
          censusInformation: payload,
        },
      };
    case MANAGE_TRANSFER_POST_API_REQUEST:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: true,
          error: null,
        },
      };
    case MANAGE_TRANSFER_POST_API_RESPONSE:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          data: payload,
          isError: false,
        },
      };
    case MANAGE_TRANSFER_POST_API_ERROR:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          isError: true,
          error: payload,
        },
      };
    case CACHE_WITHDRAWAL_REQUEST_DATA: {
      state = {
        ...state,
        api: {
          ...state.api,
          withdrawalRequestCache: {
            ...payload,
          },
        },
      };
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default reducer;
