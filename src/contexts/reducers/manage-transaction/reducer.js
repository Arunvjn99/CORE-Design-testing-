import { get } from "lodash-es";
import {
  MANAGE_TRANSACTION_SET_SELECTED_MENU,
  MANAGE_TRANSACTION_SET_FLOW,
  MANAGE_TRANSACTION_SET_TOAST_INFO,
  // MANAGE_TRANSACTION_SET_LOAN_DATA,
  MANAGE_TRANSACTION_POST_API_RESPONSE,
  MANAGE_INVOICE_FILE_DATA,
} from "./actions";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case MANAGE_TRANSACTION_SET_SELECTED_MENU:
      return {
        ...state,
        selectedMenu: payload,
      };
    case MANAGE_TRANSACTION_SET_FLOW:
      return {
        ...state,
        ...payload,
      };
    case MANAGE_TRANSACTION_SET_TOAST_INFO: {
      return {
        ...state,
        showToast: get(payload, "showToast", false),
        toastMessage: get(payload, "toastMessage", ""),
        toastMessage2: get(payload, "toastMessage2", ""),
        toastMessage1: get(payload, "toastMessage1", ""),
        reject: get(payload, "reject", false),
      };
    }
    // case MANAGE_TRANSACTION_SET_LOAN_DATA: {
    //   debugger;
    //   return {
    //     ...state,
    //     loanData: get(payload,"loan",[]),
    //   };
    // }
    // case MANAGE_TRANSACTION_GET_API_RESPONSE:
    case MANAGE_TRANSACTION_POST_API_RESPONSE:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          data: payload,
          isError: false,
        },
      };
    case MANAGE_INVOICE_FILE_DATA:
      return {
        ...state,
        invoiceFileDetails: payload,
      };

    default:
      return state;
  }
};

export default reducer;
