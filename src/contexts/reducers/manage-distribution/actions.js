import { getMaintenanceDetails } from "@/services/maintenance";

import {
  saveTransferDetails,
  saveDraftOfTransferDetails,
  saveDraftOfRebalanceDetails,
  saveRebalanceDetails,
} from "@/services/transaction";

import {
  saveWithdrawalRequest,
  saveInProgressLoanRequest,
  uploadLoanDocumentsRequest,
  uploadWithdrawalDocumentsRequest,
} from "@/services/withdrawal";

export const MANAGE_DISTRIBUTION_SET_TOAST_INFO =
  "managedistribution/SET_TOAST_INFO";
export const MANAGE_WITHDRAWAL_REQUEST_PAGE_DATA =
  "managedistribution/DISTRIBUTION_PAGE_DATA";
export const MANAGE_DISTRIBUTION_GET_API_RESPONSE =
  "managedistribution/ET_API_RESPONSE";
export const MANAGE_DISTRIBUTION_GET_API_REQUEST =
  "managedistribution/GET_API_REQUEST";
export const MANAGE_DISTRIBUTION_GET_API_ERROR =
  "managedistribution/N_GET_API_ERROR";
export const MANAGE_DISTRIBUTION_POST_API_RESPONSE =
  "managedistribution/ST_API_RESPONSE";
export const MANAGE_CENSUS_DATA_FROM_API =
  "managedistribution/CENSUS_API_RESPONSE";
export const MANAGE_DISTRIBUTION_POST_API_ERROR =
  "managedistribution/_POST_API_ERROR";
export const MANAGE_DISTRIBUTION_POST_API_REQUEST =
  "managedistribution/OST_API_REQUEST";
export const MANAGE_DISTRIBUTION_SET_FLOW = "managedistribution/SET_FLOW";
export const MANAGE_TRANSACTION_SET_LOAN_DATA =
  "manageTransaction/SET_LOAN_DATA";
export const MANAGE_LOAN_SUMMARY_TOAST_INFO =
  "managedistribution/LOAN_SUMMARY_TOAST";
// export const MANAGE_DISTRIBUTION_LOAN_POST_API_REQUEST = "managedistribution/loan/POST_API_REQUEST";

//Transfers
export const MANAGE_TRANSFER_REQUEST_PAGE_DATA =
  "managetransfer/TRANSFER_PAGE_DATA";
export const MANAGE_TRANSFER_POST_API_REQUEST =
  "managetransfer/POST_API_REQUEST";
export const MANAGE_TRANSFER_POST_API_RESPONSE =
  "managetransfer/POST_API_RESPONSE";
export const MANAGE_TRANSFER_POST_API_ERROR = "managetransfer/POST_API_ERROR";
export const CACHE_WITHDRAWAL_REQUEST_DATA =
  "managedistribution/CACHE_WITHDRAWAL_REQUEST_DATA";

export const setManageDistributionToastInfo = (payload) => ({
  type: MANAGE_DISTRIBUTION_SET_TOAST_INFO,
  payload,
});

export const setWithdrawalRequestPageData = (payload) => ({
  type: MANAGE_WITHDRAWAL_REQUEST_PAGE_DATA,
  payload,
});

export const loanSummaryToastInfo = (payload) => ({
  type: MANAGE_LOAN_SUMMARY_TOAST_INFO,
  payload,
});

export const setManageDistributionFlow = (payload) => ({
  type: MANAGE_DISTRIBUTION_SET_FLOW,
  payload,
});

export const getRequestDetailsAction = (payload, dispatch) => {
  dispatch({
    type: MANAGE_DISTRIBUTION_GET_API_REQUEST,
  });

  return getMaintenanceDetails(payload)
    .then((response) => {
      dispatch({
        type: MANAGE_DISTRIBUTION_GET_API_RESPONSE,
        payload: response,
      });
      return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_DISTRIBUTION_GET_API_ERROR,
        payload: error,
      });
    });
};

export const cacheWithdrawalRequestPageLevelData = (payload) => ({
  type: CACHE_WITHDRAWAL_REQUEST_DATA,
  payload,
});

export const saveRequest = (payload, dispatch) => {
  dispatch({
    type: MANAGE_DISTRIBUTION_POST_API_REQUEST,
  });
  return saveWithdrawalRequest(payload)
    .then((response) => {
      if (response.isSuccessful) {
        dispatch({
          type: MANAGE_DISTRIBUTION_POST_API_RESPONSE,
          payload: response,
        });
        return response;
      } else {
        // dispatch({
        //   type: MANAGE_DISTRIBUTION_POST_API_ERROR,
        //   payload: response,
        // });
        return response;
      }
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_DISTRIBUTION_POST_API_ERROR,
        payload: error,
      });
      throw error;
    });
};

export const setDistributionPostRequest = () => ({
  type: MANAGE_DISTRIBUTION_POST_API_REQUEST,
});

export const setDistributionPostResponse = (payload) => ({
  type: MANAGE_DISTRIBUTION_POST_API_RESPONSE,
  payload,
});
export const setCensusDataFromAPI = (payload) => ({
  type: MANAGE_CENSUS_DATA_FROM_API,
  payload,
});

export const saveInProgressLoan = (payload, dispatch) => {
  dispatch({
    type: MANAGE_DISTRIBUTION_POST_API_REQUEST,
  });
  return saveInProgressLoanRequest(payload)
    .then((response) => {
      if (response) {
        // dispatch({
        //   type: MANAGE_DISTRIBUTION_POST_API_RESPONSE,
        //   payload: response,
        // });
      }
      // return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_DISTRIBUTION_POST_API_ERROR,
        payload: error,
      });
      throw error;
    });
};

export const setManageTransactionLoanRequestData = (payload) => ({
  type: MANAGE_TRANSACTION_SET_LOAN_DATA,
  payload,
});

export const uploadWithdrawalDocuments = (payload, dispatch) => {
  dispatch({
    type: MANAGE_DISTRIBUTION_POST_API_REQUEST,
  });
  return uploadWithdrawalDocumentsRequest(payload)
    .then((response) => {
      if (response) {
        dispatch({
          type: MANAGE_DISTRIBUTION_POST_API_RESPONSE,
          payload: response,
        });
      }
      return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_DISTRIBUTION_POST_API_ERROR,
        payload: error,
      });
      throw error;
    });
};

export const uploadLoanDocuments = (payload, dispatch) => {
  dispatch({
    type: MANAGE_DISTRIBUTION_POST_API_REQUEST,
  });
  return uploadLoanDocumentsRequest(payload)
    .then((response) => {
      if (response) {
        dispatch({
          type: MANAGE_DISTRIBUTION_POST_API_RESPONSE,
          payload: response,
        });
      }
      return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_DISTRIBUTION_POST_API_ERROR,
        payload: error,
      });
      throw error;
    });
};

//Transfer
export const setTransferRequestPageData = (payload) => ({
  type: MANAGE_TRANSFER_REQUEST_PAGE_DATA,
  payload,
});

export const saveTransferRequest = (payload, isDraft, dispatch) => {
  dispatch({
    type: MANAGE_TRANSFER_POST_API_REQUEST,
  });
  if (isDraft) {
    return saveDraftOfTransferDetails(payload)
      .then((response) => {
        if (response) {
          dispatch({
            type: MANAGE_TRANSFER_POST_API_RESPONSE,
            payload: response,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: MANAGE_TRANSFER_POST_API_ERROR,
          payload: error,
        });
        throw error;
      });
  } else {
    return saveTransferDetails(payload)
      .then((response) => {
        if (response) {
          dispatch({
            type: MANAGE_TRANSFER_POST_API_RESPONSE,
            payload: response,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: MANAGE_TRANSFER_POST_API_ERROR,
          payload: error,
        });
        throw error;
      });
  }
};

export const saveRebalanceRequest = (payload, isDraft, dispatch) => {
  dispatch({
    type: MANAGE_TRANSFER_POST_API_REQUEST,
  });
  if (isDraft) {
    return saveDraftOfRebalanceDetails(payload)
      .then((response) => {
        if (response) {
          dispatch({
            type: MANAGE_TRANSFER_POST_API_RESPONSE,
            payload: response,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: MANAGE_TRANSFER_POST_API_ERROR,
          payload: error,
        });
        throw error;
      });
  } else {
    return saveRebalanceDetails(payload)
      .then((response) => {
        if (response) {
          dispatch({
            type: MANAGE_TRANSFER_POST_API_RESPONSE,
            payload: response,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: MANAGE_TRANSFER_POST_API_ERROR,
          payload: error,
        });
        throw error;
      });
  }
};
