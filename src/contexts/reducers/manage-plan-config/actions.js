import {
  getMaintenanceDetails,
  saveHoliday,
  deleteHoliday,
  addPlanGroup,
} from "@/services/maintenance";
import { uploadAdvisorLogo } from "@/services/master";

export const MANAGE_PLAN_CONFIG_SET_FLOW = "managePlanConfig/SET_FLOW";
export const MANAGE_PLAN_CONFIG_SET_SELECTED_MENU =
  "managePlanConfig/SET_SELECTED_MENU";
export const MANAGE_PLAN_CONFIG_SET_LOADER = "managePlanConfig/SET_LOADER";
export const MANAGE_PLAN_CONFIG_SET_FULL_PAGE_DATA =
  "managePlanConfig/SET_FULL_PAGE_DATA";
export const MANAGE_PLAN_CONFIG_SET_TOAST_INFO =
  "managePlanConfig/SET_TOAST_INFO";
export const MANAGE_PLAN_CONFIG_SET_PAGE_DATA =
  "managePlanConfig/SET_PAGE_DATA";
export const MANAGE_PLAN_CONFIG_GET_API_RESPONSE =
  "managePlanConfig/ET_API_RESPONSE";
export const MANAGE_PLAN_CONFIG_GET_API_REQUEST =
  "managePlanConfig/GET_API_REQUEST";
export const MANAGE_PLAN_CONFIG_GET_API_ERROR =
  "managePlanConfig/N_GET_API_ERROR";
export const MANAGE_PLAN_CONFIG_POST_API_RESPONSE =
  "managePlanConfig/ST_API_RESPONSE";
export const MANAGE_PLAN_CONFIG_POST_API_ERROR =
  "managePlanConfig/_POST_API_ERROR";
export const MANAGE_PLAN_CONFIG_POST_API_REQUEST =
  "managePlanConfig/OST_API_REQUEST";
export const MANAGE_PLAN_CONFIG_LOCAL_CACHE = "managePlanConfig/LOCAL_CACHE";
export const MANAGE_PLAN_CONFIG_CLEAR_LOCAL_CACHE =
  "managePlanConfig/CLEAR_LOCAL_CACHE";
export const MANAGE_PLAN_CONFIG_INNER_DETAILS =
  "managePlanConfig/INNER_DETAILS";
export const MANAGE_PLAN_CONFIG_IMAGE =
  "managePlanConfig/MANAGE_PLAN_CONFIG_IMAGE";
export const MANAGE_PLAN_CONFIG_SET_POST_FETCHING_FALSE =
  "managePlanConfig/SET_FETCHING_FALSE";
export const SAVE_ADVISOR_REPRESENTATIVES =
  "manaPlanConfig/SAVE_ADVISOR_REPRESENTATIVES";
export const SAVE_CLEARING_PARTNER_ACCOUNT =
  "managePlanConfig/SAVE_CLEARING_PARTNER_ACCOUNT";
export const SET_EDIT_ADVISOR_SLIDER_OPEN =
  "managePlanConfig/SET_EDIT_ADVISOR_SLIDER_OPEN";
export const setManagePlanConfigSelectedMenu = (payload) => ({
  type: MANAGE_PLAN_CONFIG_SET_SELECTED_MENU,
  payload,
});
export const setManagePlanConfigImage = (payload) => ({
  type: MANAGE_PLAN_CONFIG_IMAGE,
  payload,
});
export const setManagePlanConfigFlow = (payload) => ({
  type: MANAGE_PLAN_CONFIG_SET_FLOW,
  payload,
});

export const setManagePlanConfigLoader = (payload) => ({
  type: MANAGE_PLAN_CONFIG_SET_LOADER,
  payload,
});

export const setManagePlanConfigFullPageData = (payload) => ({
  type: MANAGE_PLAN_CONFIG_SET_FULL_PAGE_DATA,
  payload,
});

export const setManagePlanConfigToastInfo = (payload) => ({
  type: MANAGE_PLAN_CONFIG_SET_TOAST_INFO,
  payload,
});

export const setManagePlanConfigPageLevelData = (payload) => ({
  type: MANAGE_PLAN_CONFIG_SET_PAGE_DATA,
  payload,
});

export const getPlanConfigDetailsAction = (payload, dispatch) => {
  dispatch({
    type: MANAGE_PLAN_CONFIG_GET_API_REQUEST,
  });

  return getMaintenanceDetails(payload)
    .then((response) => {
      dispatch({
        type: MANAGE_PLAN_CONFIG_GET_API_RESPONSE,
        payload: response,
      });
      return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_PLAN_CONFIG_GET_API_ERROR,
        payload: error,
      });
    });
};
export const saveAdvisorImage = (payload, dispatch, state) => {
  dispatch({
    type: MANAGE_PLAN_CONFIG_POST_API_REQUEST,
  });
  return uploadAdvisorLogo(payload)
    .then((response) => {
      dispatch({
        type: MANAGE_PLAN_CONFIG_SET_POST_FETCHING_FALSE,
        payload: false,
      });
      dispatch(
        setManagePlanConfigLocalCache({
          model: "logo",
          data: response.result,
        })
      );
      return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_PLAN_CONFIG_POST_API_ERROR,
        payload: error,
      });
      throw error;
    });
};
export const saveHolidayDetailsAction = (payload, dispatch) => {
  dispatch({
    type: MANAGE_PLAN_CONFIG_POST_API_REQUEST,
  });
  return saveHoliday(payload)
    .then((response) => {
      if (response) {
        dispatch({
          type: MANAGE_PLAN_CONFIG_POST_API_RESPONSE,
          payload: new Date(payload.holidayDate).getFullYear(),
        });
      }
      return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_PLAN_CONFIG_POST_API_ERROR,
        payload: error,
      });
      throw error;
    });
};
export const deleteHolidayAction = (payload, dispatch) => {
  dispatch({
    type: MANAGE_PLAN_CONFIG_POST_API_REQUEST,
  });
  return deleteHoliday(payload.id)
    .then((response) => {
      if (response) {
        dispatch({
          type: MANAGE_PLAN_CONFIG_POST_API_RESPONSE,
          payload: payload.holidayDate,
        });
      }
      return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_PLAN_CONFIG_POST_API_ERROR,
        payload: error,
      });
      throw error;
    });
};
export const savePlanGroupsAction = (payload, dispatch) => {
  dispatch({
    type: MANAGE_PLAN_CONFIG_POST_API_REQUEST,
  });
  return addPlanGroup(payload)
    .then((response) => {
      if (response) {
        dispatch({
          type: MANAGE_PLAN_CONFIG_POST_API_RESPONSE,
          payload: payload,
        });
      }
      return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_PLAN_CONFIG_POST_API_ERROR,
        payload: error,
      });
      throw error;
    });
};

export const setManagePlanConfigLocalCache = (payload) => ({
  type: MANAGE_PLAN_CONFIG_LOCAL_CACHE,
  payload,
});

export const clearLocalCacheByModelPlanConfig = (payload) => ({
  type: MANAGE_PLAN_CONFIG_CLEAR_LOCAL_CACHE,
  payload,
});

export const setManageInnerDetails = (payload) => ({
  type: MANAGE_PLAN_CONFIG_INNER_DETAILS,
  payload,
});
export const saveAdvisorRepresentatives = (payload) => ({
  type: SAVE_ADVISOR_REPRESENTATIVES,
  payload,
});
export const saveClearingPartnerAccount = (payload) => ({
  type: SAVE_CLEARING_PARTNER_ACCOUNT,
  payload,
});
export const setEditAdvisorSliderOpen = (payload) => ({
  type: SET_EDIT_ADVISOR_SLIDER_OPEN,
  payload,
});
