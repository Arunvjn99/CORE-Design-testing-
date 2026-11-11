import { get } from "lodash-es";
import {
  MANAGE_DIVIDEND_ID_INFO,
  MANAGE_DIVIDEND_SET_SELECTED_MENU,
  SET_SCHEDULE_DIVIDEND_DATA,
  MANAGE_DIVIDEND_SUMMARY_INFO,
  SET_DIVIDEND_DETAILS_DATA,
  SET_DIVIDEND_BASIC_DETAILS_DATA,
  SET_DIVIDEND_EXCLUSION_DETAILS_DATA,
  SET_DIVIDEND_ID_INFO,
  MANAGE_DIVIDEND_SUMMARY_SET_SELECTED_MENU,
  SET_DETAILED_DIVIDEND_DATA,
  SET_FUND_MERGER_SUMMARY,
  MANAGE_FILE_MANAGER_SET_FLOW,
} from "./action";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case MANAGE_DIVIDEND_SUMMARY_SET_SELECTED_MENU:
      return {
        ...state,
        selectedMenu: payload,
      };
    case SET_DIVIDEND_DETAILS_DATA:
      return {
        ...state,
        isLoading: false,
        api: {
          ...state.api,
          isSuccessfull: payload.isSuccessfull,
          data: {
            ...state.api.data,
            dividendDetails: payload.dividendDetails,
          },
        },
      };
    case SET_DIVIDEND_ID_INFO:
      return {
        ...state,
        id: payload.id,
        step: payload.step,
      };
    case MANAGE_DIVIDEND_SET_SELECTED_MENU:
      return {
        ...state,
        selectedMenu: payload,
      };
    case MANAGE_DIVIDEND_ID_INFO:
      return {
        ...state,
        dividendId: payload.id,
        step: payload.step,
      };
    case SET_SCHEDULE_DIVIDEND_DATA:
      return {
        ...state,
        isLoading: false,
        api: {
          ...state.api,
          isSuccessfull: payload.isSuccessfull,
          data: {
            ...state.api.data,
            scheduleDividendDetails: payload.scheduleDividendDetails,
          },
        },
      };
    case SET_DIVIDEND_BASIC_DETAILS_DATA:
      return {
        ...state,
        isLoading: false,
        api: {
          ...state.api,
          isSuccessfull: payload.isSuccessfull,
          data: {
            ...state.api.data,
            dividendBasicDetails: payload.dividendBasicDetails,
          },
        },
      };
    case SET_DIVIDEND_EXCLUSION_DETAILS_DATA:
      return {
        ...state,
        isLoading: false,
        api: {
          ...state.api,
          isSuccessfull: payload.isSuccessfull,
          data: {
            ...state.api.data,
            exclusionDividendDetails: payload.exclusionDividendDetails,
          },
        },
      };
    case MANAGE_FILE_MANAGER_SET_FLOW:
      return {
        ...state,
        fileManager: payload,
      };
    case MANAGE_DIVIDEND_SUMMARY_INFO:
      return {
        ...state,
        showToast: get(payload, "showToast", false),
        toastMessage: get(payload, "toastMessage", ""),
      };
    case SET_DETAILED_DIVIDEND_DATA:
      return {
        ...state,
        detailedDividendData: payload,
      };
    case SET_FUND_MERGER_SUMMARY:
      return {
        ...state,
        fundmergersummary: payload,
      };
  }
};

export default reducer;
