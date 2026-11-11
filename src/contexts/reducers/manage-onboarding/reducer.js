// import { get } from "lodash-es";
// import {
//   MANAGE_ONBOARDING_SET_FLOW,
//   MANAGE_ONBOARDING_SET_SELECTED_MENU,
//   MANAGE_ONBOARDING_SET_PAGE_DATA,
//   MANAGE_ONBOARDING_SET_LOADER,
//   MANAGE_ONBOARDING_SET_FULL_PAGE_DATA,
//   MANAGE_ONBOARDING_SET_TOAST_INFO,
//   // MANAGE_ONBOARDING_POST_API_REQUEST,
//   MANAGE_ONBOARDING_POST_API_RESPONSE,
//   // MANAGE_ONBOARDING_POST_API_ERROR,
//   // MANAGE_ONBOARDING_GET_API_REQUEST,
//   // MANAGE_ONBOARDING_GET_API_RESPONSE,
//   // MANAGE_ONBOARDING_GET_API_ERROR,
//   MANAGE_ONBOARDING_SET_EMPLOYEE_CLASSIFICATION_DATA,
//   // MANAGE_ONBOARDING_LOCAL_CACHE,
//   // MANAGE_ONBOARDING_CLEAR_LOCAL_CACHE,
//   MANAGE_ONBOARDING_SET_POST_FETCHING_FALSE,
//   // GET_MASTERCLASSIFICATION_TYPE_RESPONSE,
//   // GET_MASTERCLASSIFICATION_TYPE_REQUEST,
//   // MANAGE_ONBOARDING_IMAGE,
//   // MANAGE_ONBOARDING_EDIT,
// } from "./action";

const reducer = (state, action) => {
  // const { type, payload } = action;
  // switch (type) {
  //   case MANAGE_ONBOARDING_SET_SELECTED_MENU:
  //     return {
  //       ...state,
  //       selectedMenu: payload,
  //     };
  //   case MANAGE_ONBOARDING_SET_FLOW:
  //     return {
  //       ...state,
  //       ...payload,
  //     };
  //   case MANAGE_ONBOARDING_SET_PAGE_DATA:
  //     const { formName, fieldData } = payload;
  //     return {
  //       ...state,
  //       [formName]: { ...fieldData },
  //     };
  //   case MANAGE_ONBOARDING_SET_POST_FETCHING_FALSE:
  //     return {
  //       ...state,
  //       api: {
  //         ...state.api,
  //         isFetching: false,
  //         error: null,
  //       },
  //     };
  //   case MANAGE_ONBOARDING_SET_FULL_PAGE_DATA:
  //     return {
  //       ...state,
  //       ...payload,
  //     };
  //   case MANAGE_ONBOARDING_SET_LOADER:
  //     return {
  //       ...state,
  //       isLoading: payload,
  //     };
  //   // case MANAGE_ONBOARDING_GET_API_REQUEST:
  //   // case MANAGE_ONBOARDING_POST_API_REQUEST:
  //   //   return {
  //   //     ...state,
  //   //     api: {
  //   //       ...state.api,
  //   //       isFetching: true,
  //   //       error: null,
  //   //     },
  //   //   };
  //   // case MANAGE_ONBOARDING_GET_API_RESPONSE:
  //   case MANAGE_ONBOARDING_POST_API_RESPONSE:
  //     return {
  //       ...state,
  //       api: {
  //         ...state.api,
  //         isFetching: false,
  //         data: payload,
  //         isError: false,
  //       },
  //     };
  //   // case MANAGE_ONBOARDING_GET_API_ERROR:
  //   // case MANAGE_ONBOARDING_POST_API_ERROR:
  //   //   return {
  //   //     ...state,
  //   //     api: {
  //   //       ...state.api,
  //   //       isFetching: false,
  //   //       isError: true,
  //   //       error: payload,
  //   //     },
  //   //   };
  //   case MANAGE_ONBOARDING_SET_TOAST_INFO:
  //     return {
  //       ...state,
  //       showToast: get(payload, "showToast", false),
  //       toastMessage: get(payload, "toastMessage", ""),
  //     };
  //   case MANAGE_ONBOARDING_SET_EMPLOYEE_CLASSIFICATION_DATA:
  //     return {
  //       ...state,
  //       classifications: payload,
  //     };
  //   // case MANAGE_ONBOARDING_LOCAL_CACHE:
  //   //   return {
  //   //     ...state,
  //   //     [payload.model]: payload.data,
  //   //   };
  //   // case MANAGE_ONBOARDING_CLEAR_LOCAL_CACHE:
  //   //   delete state[payload];
  //   //   return {
  //   //     ...state,
  //   //   };
  //   // case GET_MASTERCLASSIFICATION_TYPE_RESPONSE: {
  //   //   return {
  //   //     ...state,
  //   //     masterClassificationDropDown: {
  //   //       isLoading: false,
  //   //     },
  //   //     api: {
  //   //       ...state.api,
  //   //       isFetching: false,
  //   //     },
  //   //   };
  //   // }
  //   // case MANAGE_ONBOARDING_IMAGE: {
  //   //   const { formName, fieldData } = payload;
  //   //   return {
  //   //     ...state,
  //   //     [formName]: fieldData,
  //   //   };
  //   // }
  //   // case GET_MASTERCLASSIFICATION_TYPE_REQUEST: {
  //   //   return {
  //   //     ...state,
  //   //     masterClassificationDropDown: {
  //   //       isLoading: true,
  //   //     },
  //   //     api: {
  //   //       ...state.api,
  //   //       isFetching: true,
  //   //     },
  //   //   };
  //   // }
  //   // case MANAGE_ONBOARDING_EDIT: {
  //   //   return {
  //   //     ...state,
  //   //     isShow1: get(payload, "isShow1", false),
  //   //   };
  //   // }
  //   default:
  //     return state;
  // }
};

export default reducer;
