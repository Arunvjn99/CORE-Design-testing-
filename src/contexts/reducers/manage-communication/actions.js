import { getCensusDetails } from "@/services/census";

export const MANAGE_COMMUNICATION_SET_FLOW = "managecommunication/SET_FLOW";
export const MANAGE_COMMUNICATION_SET_SELECTED_MENU =
  "managecommunication/SET_SELECTED_MENU";
export const MANAGE_COMMUNICATION_SET_LOADER = "managecommunication/SET_LOADER";
export const MANAGE_COMMUNICATION_SET_FULL_PAGE_DATA =
  "managecommunication/SET_FULL_PAGE_DATA";
export const MANAGE_COMMUNICATION_SET_TOAST_INFO =
  "managecommunication/SET_TOAST_INFO";
export const MANAGE_COMMUNICATION_SET_PAGE_DATA =
  "managecommunication/SET_PAGE_DATA";
export const MANAGE_COMMUNICATION_GET_API_RESPONSE =
  "managecommunication/ET_API_RESPONSE";
export const MANAGE_COMMUNICATION_GET_API_REQUEST =
  "managecommunication/GET_API_REQUEST";
export const MANAGE_COMMUNICATION_GET_API_ERROR =
  "managecommunication/N_GET_API_ERROR";
export const MANAGE_COMMUNICATION_POST_API_RESPONSE =
  "managecommunication/ST_API_RESPONSE";
export const MANAGE_COMMUNICATION_POST_API_ERROR =
  "managecommunication/_POST_API_ERROR";
export const MANAGE_COMMUNICATION_LOCALCACHE = "managecommunication/LOCALCACHE";

export const setManageCommunicationSelectedMenu = (payload) => ({
  type: MANAGE_COMMUNICATION_SET_SELECTED_MENU,
  payload,
});

export const setManageCommunicationFlow = (payload) => ({
  type: MANAGE_COMMUNICATION_SET_FLOW,
  payload,
});

export const setManageCommunicationLoader = (payload) => ({
  type: MANAGE_COMMUNICATION_SET_LOADER,
  payload,
});

export const setManageCommunicationFullPageData = (payload) => ({
  type: MANAGE_COMMUNICATION_SET_FULL_PAGE_DATA,
  payload,
});

export const setManageCommunicationToastInfo = (payload) => ({
  type: MANAGE_COMMUNICATION_SET_TOAST_INFO,
  payload,
});

export const setManageCommunicationPageLevelData = (payload) => ({
  type: MANAGE_COMMUNICATION_SET_PAGE_DATA,
  payload,
});

export const setCommunicationLocalCache = (payload) => ({
  type: MANAGE_COMMUNICATION_LOCALCACHE,
  payload,
});

export const getCommunicationDetailsAction = (payload, dispatch) => {
  dispatch({
    type: MANAGE_COMMUNICATION_GET_API_REQUEST,
  });

  return getCensusDetails(payload)
    .then((response) => {
      dispatch({
        type: MANAGE_COMMUNICATION_GET_API_RESPONSE,
        payload: response,
      });
      return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_COMMUNICATION_GET_API_ERROR,
        payload: error,
      });
    });
};
