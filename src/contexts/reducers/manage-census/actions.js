import { getCensusDetails } from "@/services/census";

export const MANAGE_CENSUS_SET_FLOW = "managecensus/SET_FLOW";
export const MANAGE_CENSUS_SET_SELECTED_MENU = "managecensus/SET_SELECTED_MENU";
export const MANAGE_CENSUS_SET_LOADER = "managecensus/SET_LOADER";
export const MANAGE_CENSUS_SET_FULL_PAGE_DATA =
  "managecensus/SET_FULL_PAGE_DATA";
export const MANAGE_CENSUS_SET_TOAST_INFO = "managecensus/SET_TOAST_INFO";
export const ROLLOVER_REQUEST_PAGE_DATA = "managecensus/R_PAGE_DATA";
export const MANAGE_CENSUS_SET_PAGE_DATA = "managecensus/SET_PAGE_DATA";
export const MANAGE_CENSUS_GET_API_RESPONSE = "managecensus/ET_API_RESPONSE";
export const MANAGE_CENSUS_GET_API_REQUEST = "managecensus/GET_API_REQUEST";
export const MANAGE_CENSUS_GET_API_ERROR = "managecensus/N_GET_API_ERROR";
export const MANAGE_CENSUS_POST_API_RESPONSE = "managecensus/ST_API_RESPONSE";
export const MANAGE_CENSUS_POST_API_ERROR = "managecensus/_POST_API_ERROR";
export const MANAGE_CENSUS_POST_API_REQUEST = "managecensus/OST_API_REQUEST";
export const MANAGE_CENSUS_IMAGE = "managecensus/MANAGE_CENSUS_IMAGE";
export const MANAGE_CENSUS_LOCAL_CACHE = "managecensus/SET_LOCAL_CACHE";
export const MANAGE_CENSUS_CLEAR_LOCAL_CACHE = "managecensus/CLEAR_LOCAL_CACHE";
export const MANAGE_CENSUS_CLEAR_ALL = "managecensus/CLEAR_ALL";
export const MANAGE_CENSUS_CLEAR = "managecensus/MANAGE_CENSUS_CLEA";
export const SET_IRA_USAGE = "managecensus/SET_IRA_USAGE";
export const SET_BACK_NAVIGATION_PATH = "managecensus/SET_BACK_NAVIGATION_PATH";
export const MANAGE_LOAN_REQUEST_TOAST_INFO = "managecensus/LOAN_REQUEST_TOAST";
export const MANAGE_WITHDRAWAL_REQUEST_TOAST_INFO =
  "managecensus/WITHDRAWAL_REQUEST_TOAST";

export const loanRequestToastInfo = (payload) => ({
  type: MANAGE_LOAN_REQUEST_TOAST_INFO,
  payload,
});

export const withdrawalRequestToastInfo = (payload) => ({
  type: MANAGE_WITHDRAWAL_REQUEST_TOAST_INFO,
  payload,
});

export const setManageCensusSelectedMenu = (payload) => ({
  type: MANAGE_CENSUS_SET_SELECTED_MENU,
  payload,
});

export const setManageCensusFlow = (payload) => ({
  type: MANAGE_CENSUS_SET_FLOW,
  payload,
});

export const setManageCensusLoader = (payload) => ({
  type: MANAGE_CENSUS_SET_LOADER,
  payload,
});

export const setManageCensusFullPageData = (payload) => ({
  type: MANAGE_CENSUS_SET_FULL_PAGE_DATA,
  payload,
});

export const setManageCensusToastInfo = (payload) => ({
  type: MANAGE_CENSUS_SET_TOAST_INFO,
  payload,
});

export const setRollOverRequestPageData = (payload) => ({
  type: ROLLOVER_REQUEST_PAGE_DATA,
  payload,
});

export const setManageCensusPageLevelData = (payload) => ({
  type: MANAGE_CENSUS_SET_PAGE_DATA,
  payload,
});

export const setManageCensusImageData = (payload) => ({
  type: MANAGE_CENSUS_IMAGE,
  payload,
});

export const getCensusDetailsAction = (payload, dispatch) => {
  dispatch({
    type: MANAGE_CENSUS_GET_API_REQUEST,
  });

  return getCensusDetails(payload)
    .then((response) => {
      dispatch({
        type: MANAGE_CENSUS_GET_API_RESPONSE,
        payload: response,
      });
      return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_CENSUS_GET_API_ERROR,
        payload: error,
      });
    });
};

export const setManageCensusLocalCache = (payload) => ({
  type: MANAGE_CENSUS_LOCAL_CACHE,
  payload,
});

export const clearMamangeCensusLocalCacheByModel = (payload) => ({
  type: MANAGE_CENSUS_CLEAR_LOCAL_CACHE,
  payload,
});

export const clearManageCensusAll = () => ({
  type: MANAGE_CENSUS_CLEAR_ALL,
});
export const clearManageCensusData = () => ({
  type: MANAGE_CENSUS_CLEAR,
});
export const setIRAUsage = (payload) => ({
  type: SET_IRA_USAGE,
  payload,
});
export const setBackNavigationPath = (payload) => ({
  type: SET_BACK_NAVIGATION_PATH,
  payload,
});
