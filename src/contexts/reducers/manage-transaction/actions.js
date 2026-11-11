import { saveInProgressLoanRequest } from "@/services/withdrawal";
export const MANAGE_TRANSACTION_SET_FLOW = "manageTransaction/SET_FLOW";
export const MANAGE_TRANSACTION_SET_SELECTED_MENU =
  "manageTransaction/SET_SELECTED_MENU";
export const MANAGE_TRANSACTION_SET_TOAST_INFO =
  "manageTransaction/SET_TOAST_INFO";
export const MANAGE_TRANSACTION_LOCAL_CACHE = "manageTransaction/LOCAL_CACHE";
export const MANAGE_TRANSACTION_CLEAR_LOCAL_CACHE =
  "manageTransaction/CLEAR_LOCAL_CACHE";
export const MANAGE_TRANSACTION_POST_API_ERROR =
  "manageTransaction/POST_API_ERROR";
// export const MANAGE_TRANSACTION_SET_LOAN_DATA =
//   "manageTransaction/SET_LOAN_DATA";
export const MANAGE_TRANSACTION_POST_API_RESPONSE =
  "manageTransaction/POST_API_RESPONSE";
export const MANAGE_TRANSACTION_POST_API_REQUEST =
  "manageTransaction/POST_API_REQUEST";
export const MANAGE_INVOICE_FILE_DATA =
  "manageTransaction/MANAGE_INVOICE_FILE_DATA";

export const setManageTransactionFlow = (payload) => ({
  type: MANAGE_TRANSACTION_SET_FLOW,
  payload,
});

// export const setManageTransactionLoanRequestData = (payload) => (
//   {
//   type: MANAGE_TRANSACTION_SET_LOAN_DATA,
//   payload,}
// );

export const setManageTransactionSelectedMenu = (payload) => ({
  type: MANAGE_TRANSACTION_SET_SELECTED_MENU,
  payload,
});

export const setManageTransactionToastInfo = (payload) => ({
  type: MANAGE_TRANSACTION_SET_TOAST_INFO,
  payload,
});

export const setManageTransactionLocalCache = (payload) => ({
  type: MANAGE_TRANSACTION_LOCAL_CACHE,
  payload,
});

export const clearLocalCacheByModelTransaction = (payload) => ({
  type: MANAGE_TRANSACTION_CLEAR_LOCAL_CACHE,
  payload,
});

export const setManageTransactionPostApiError = (payload) => ({
  type: MANAGE_TRANSACTION_POST_API_ERROR,
  payload,
});

export const saveInProgressLoan1 = (payload, dispatch) => {
  // dispatch({
  //   type: MANAGE_TRANSACTION_POST_API_REQUEST,
  // });
  return saveInProgressLoanRequest(payload)
    .then((response) => {
      if (response) {
        dispatch({
          type: MANAGE_TRANSACTION_POST_API_RESPONSE,
          payload: response,
        });
      }
      return response;
    })
    .catch((error) => {
      // dispatch({
      //   type: MANAGE_TRANSACTION_POST_API_ERROR,
      //   payload: error,
      // });
      throw error;
    });
};

export const setInvoiceFileContextData = (payload) => ({
  type: MANAGE_INVOICE_FILE_DATA,
  payload,
});
