// import { get } from "lodash-es";
// import {
//   postCompanyDetails,
//   getCompanyDetails,
//   getMasterClassificationTypes,
//   addMasterClassificationTypes,
//   getGeneratePayrollSchedule,
//   // getSponsoringOrganisationList,
//   uploadCompanyLogo,
//   getCompanyLogo,
//   postOnboardingDetails,
//   OnboardingaddMasterClassificationTypes,
//   OnboardinggetMasterClassificationTypes,
//   getOnboardingDetails,
//   uploadOnboardingCompanyLogo,
//   OnboardinggetGeneratePayrollSchedule,
// } from "../../../services";
// import {
//   populateManageCompanyForm,
//   // tranformListToDropdownValues,
// } from "../../../utils";
// import { MANAGE_COMPANY_GET_API_ERROR, MANAGE_COMPANY_GET_API_REQUEST, MANAGE_COMPANY_GET_API_RESPONSE } from "../manage-company";

// export const MANAGE_ONBOARDING_SET_FLOW = "manageonboarding/SET_FLOW";
// export const MANAGE_ONBOARDING_SET_SELECTED_MENU =
//   "manageonboarding/SET_SELECTED_MENU";
// export const MANAGE_ONBOARDING_SET_PAGE_DATA = "manageonboarding/SET_PAGE_DATA";
// export const MANAGE_ONBOARDING_SET_LOADER = "manageonboarding/SET_LOADER";
// export const MANAGE_ONBOARDING_SET_FULL_PAGE_DATA =
//   "manageonboarding/SET_FULL_PAGE_DATA";
// export const MANAGE_ONBOARDING_SET_TOAST_INFO =
//   "manageonboarding/SET_TOAST_INFO";

// export const MANAGE_ONBOARDING_POST_API_REQUEST =
//   "manageonboarding/POST_API_REQUEST";
// export const MANAGE_ONBOARDING_POST_API_RESPONSE =
//   "manageonboarding/POST_API_RESPONSE";
// export const MANAGE_ONBOARDING_POST_API_ERROR =
//   "manageonboarding/POST_API_ERROR";
// export const MANAGE_ONBOARDING_GET_API_REQUEST =
//   "manageonboarding/GET_API_REQUEST";
// export const GET_MASTERCLASSIFICATION_TYPE_REQUEST =
//   "manageonboarding/GET_MASTERCLASSIFICATION_TYPE_REQUEST";
// export const GET_MASTERCLASSIFICATION_TYPE_RESPONSE =
//   "manageonboarding/GET_MASTERCLASSIFICATION_TYPE_RESPONSE";
// export const MANAGE_ONBOARDING_GET_API_RESPONSE =
//   "manageonboarding/GET_API_RESPONSE";
// export const MANAGE_ONBOARDING_GET_API_ERROR = "manageonboarding/GET_API_ERROR";
// export const MANAGE_ONBOARDING_SET_EMPLOYEE_CLASSIFICATION_DATA =
//   "manageonboarding/SET_EMPLOYEE_CLASSIFICATION_DATA";
// export const MANAGE_ONBOARDING_LOCAL_CACHE = "manageonboarding/SET_LOCAL_CACHE";
// export const MANAGE_ONBOARDING_CLEAR_LOCAL_CACHE =
//   "manageonboarding/CLEAR_LOCAL_CACHE";
// export const MANAGE_ONBOARDING_SET_POST_FETCHING_FALSE =
//   "manageonboarding/SET_FETCHING_FALSE";
// export const MANAGE_ONBOARDING_IMAGE = "manageonboarding/MANAGE_COMPANY_IMAGE";
// export const MANAGE_ONBOARDING_EDIT = "manageonboarding/MANAGE_COMPANY_EDIT";
// export const setManageOnboardingSelectedMenu = (payload) => ({
//   type: MANAGE_ONBOARDING_SET_SELECTED_MENU,
//   payload,
// });

// export const setManageOnboardingFlow = (payload) => ({
//   type: MANAGE_ONBOARDING_SET_FLOW,
//   payload,
// });

// export const setManageOnboardingPageLevelData = (payload) => ({
//   type: MANAGE_ONBOARDING_SET_PAGE_DATA,
//   payload,
// });
// export const setManageOnboardingLoader = (payload) => ({
//   type: MANAGE_ONBOARDING_SET_LOADER,
//   payload,
// });

// export const setManageOnboardingFullPageData = (payload) => ({
//   type: MANAGE_ONBOARDING_SET_FULL_PAGE_DATA,
//   payload,
// });

// export const setManageOnboardingToastInfo = (payload) => ({
//   type: MANAGE_ONBOARDING_SET_TOAST_INFO,
//   payload,
// });

// export const setManageOnboardingSetClassificationData = (payload) => ({
//   type: MANAGE_ONBOARDING_SET_EMPLOYEE_CLASSIFICATION_DATA,
//   payload,
// });

// export const setManageOnboardingImage = (payload) => ({
//   type: MANAGE_ONBOARDING_IMAGE,
//   payload,
// });

// export const getMasterClassificationTypesAction = (
//   payload,
//   dispatch,
//   state
// ) => {
//   dispatch({
//     type: GET_MASTERCLASSIFICATION_TYPE_REQUEST,
//   });
//   return OnboardinggetMasterClassificationTypes(payload)
//     .then((response) => {
//       dispatch({
//         type: GET_MASTERCLASSIFICATION_TYPE_RESPONSE,
//       });
//       return response;
//     })
//     .catch((error) => {
//       dispatch({
//         type: GET_MASTERCLASSIFICATION_TYPE_RESPONSE,
//       });
//     });
// };
// export const addMasterClassificationTypesAction = (
//   payload,
//   dispatch,
//   state
// ) => {
//   dispatch({
//     type: GET_MASTERCLASSIFICATION_TYPE_REQUEST,
//   });
//   return OnboardingaddMasterClassificationTypes(payload)
//     .then((response) => {
//       dispatch({
//         type: GET_MASTERCLASSIFICATION_TYPE_RESPONSE,
//       });
//       return response;
//     })
//     .catch((error) => {
//       dispatch({
//         type: GET_MASTERCLASSIFICATION_TYPE_RESPONSE,
//       });
//     });
// };
// // export const getOnboardingDetailsAction = (payload, dispatch, state) => {
// //   dispatch({
// //     type: MANAGE_COMPANY_GET_API_REQUEST,
// //   });

// //   return getOnboardingDetails(payload)
// //     .then((response) => {
// //       const formData = populateManageCompanyForm(response.company);
// //       dispatch(setManageOnboardingFullPageData(formData));
// //       dispatch({
// //         type: MANAGE_COMPANY_GET_API_RESPONSE,
// //         payload: response.company,
// //       });
// //       dispatch(
// //         setManageOnboardingSetClassificationData(
// //           get(response.company, "classifications", [])
// //         )
// //       );
// //       return response.company;
// //     })
// //     .catch((error) => {
// //       dispatch({
// //         type: MANAGE_COMPANY_GET_API_ERROR,
// //         payload: error,
// //       });
// //     });
// // };

// export const saveOnboardingDetails = (payload, dispatch, state) => {
//   dispatch({
//     type: MANAGE_ONBOARDING_POST_API_REQUEST,
//   });
//   const apiData = get(state, "api.data", {});
//   return postOnboardingDetails({
//     ...apiData,
//     ...payload,
//     tenantId: 1, //TODO: remove hardcoding & take it from JWT
//   })
//     .then((response) => {
//       dispatch({
//         type: MANAGE_ONBOARDING_SET_POST_FETCHING_FALSE,
//         payload: false,
//       });
//       if (response.isSuccessful) {
//         const formData = populateManageCompanyForm(response.company);
//         dispatch(setManageOnboardingFullPageData(formData));
//         dispatch({
//           type: MANAGE_ONBOARDING_POST_API_RESPONSE,
//           payload: response.company,
//         });
//         dispatch(
//           setManageOnboardingSetClassificationData(
//             get(response.company, "classifications", [])
//           )
//         );
//       }
//       return response;
//     })
//     .catch((error) => {
//       dispatch({
//         type: MANAGE_ONBOARDING_POST_API_ERROR,
//         payload: error,
//       });
//       throw error;
//     });
// };

// export const saveOnboardingImage = (payload, dispatch, state) => {
//   dispatch({
//     type: MANAGE_ONBOARDING_POST_API_REQUEST,
//   });
//   return uploadOnboardingCompanyLogo(payload)
//     .then((response) => {
//       dispatch({
//         type: MANAGE_ONBOARDING_SET_POST_FETCHING_FALSE,
//         payload: false,
//       });
//       dispatch(
//         setManageOnboardingLocalCache({
//           model: "logo",
//           data: response.result,
//         })
//       );
//       // const imageUrl = { companyImage: response };
//       // const formData = populateManageCompanyForm(imageUrl);
//       // dispatch(setManageCompanyFullPageData(formData));
//       // dispatch({
//       //   type: MANAGE_COMPANY_POST_API_RESPONSE,
//       //   payload: imageUrl,
//       // });
//       return response;
//     })
//     .catch((error) => {
//       dispatch({
//         type: MANAGE_ONBOARDING_POST_API_ERROR,
//         payload: error,
//       });
//       throw error;
//     });
// };

// export const OnboardinggeneratePayrollSchedule = (payload, dispatch, state) => {
//   dispatch({
//     type: MANAGE_ONBOARDING_POST_API_REQUEST,
//   });
//   const apiData = get(state, "api.data", {});
//   return OnboardinggetGeneratePayrollSchedule({
//     ...apiData,
//     ...payload,
//     tenantId: 1, //TODO: remove hardcoding & take it from JWT
//   })
//     .then((response) => {
//       dispatch({
//         type: MANAGE_ONBOARDING_SET_POST_FETCHING_FALSE,
//         payload: false,
//       });
//       return response;
//     })
//     .catch((error) => {
//       dispatch({
//         type: MANAGE_ONBOARDING_POST_API_ERROR,
//         payload: error,
//       });
//       throw error;
//     });
// };

// export const setManageOnboardingLocalCache = (payload) => ({
//   type: MANAGE_ONBOARDING_LOCAL_CACHE,
//   payload,
// });

// export const clearMamangeOnboardingLocalCacheByModel = (payload) => ({
//   type: MANAGE_ONBOARDING_CLEAR_LOCAL_CACHE,
//   payload,
// });

// export const OnboardingshowEditPreview = (payload) => ({
//   type: MANAGE_ONBOARDING_EDIT,
//   payload,
// });
