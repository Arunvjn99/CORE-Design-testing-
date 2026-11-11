// import { get, isEmpty } from "lodash-es";
// import {
//   getPlanDetails,
//   postPlanDetails,
//   getBasicPlanDetails,
//   listBasicPlanDetails,
//   getReviewAndPlanDetails,
//   setPlanStatus,
//   getReviewAndOnboardingPlanDetails,
//   getBasicOnboardingPlanDetails,
//   postOnboardingPlanDetails,
// } from "../../../services";
// import { populateManagePlanForm } from "../../../utils";

// export const CREATE_ONBOARDING_PLAN_SET_PAGE_DATA =
//   "createonboardingplan/SET_PAGE_DATA";
// export const MANAGE_ONBOARDING_PLAN_SET_FLOW = "createonboardingplan/SET_FLOW";
// export const MANAGE_ONBOARDING_PLAN_SET_SELECTED_MENU =
//   "createonboardingplan/SET_SELECTED_MENU";
// export const MANAGE_ONBOARDING_PLAN_SET_LOADER =
//   "createonboardingplan/SET_LOADER";
// export const MANAGE_ONBOARDING_PLAN_SET_FULL_PAGE_DATA =
//   "createonboardingplan/SET_FULL_PAGE_DATA";
// export const MANAGE_ONBOARDING_PLAN_SET_TOAST_INFO =
//   "createonboardingplan/SET_TOAST_INFO";
// export const MANAGE_ONBOARDING_PLAN_SET_PAGE_DATA =
//   "manageonboardingplan/SET_PAGE_DATA";
// export const MANAGE_ONBOARDING_PLAN_GET_API_REQUEST =
//   "manageonboardingplan/GET_API_REQUEST";
// export const MANAGE_ONBOARDING_PLAN_POST_API_REQUEST =
//   "manageonboardingplan/OST_API_REQUEST";
// export const MANAGE_ONBOARDING_PLAN_GET_API_RESPONSE =
//   "manageonboardingplan/ET_API_RESPONSE";
// export const MANAGE_ONBOARDING_REVIEW_AND_PLAN_DETAILS =
//   "manageonboardingplan/REVIEW_API_RESPONSE";
// export const CHANGE_ONBOARDING_REVIEW_FLAG = "updateReviewFlag";
// export const MANAGE_ONBOARDING_PLAN_POST_API_RESPONSE =
//   "manageonboardingplan/ST_API_RESPONSE";
// export const MANAGE_ONBOARDING_PLAN_POST_VALIDATION_ERROR =
//   "manageonboardingPlan/POST_VALIDATION_ERROR";
// export const MANAGE_ONBOARDING_PLAN_GET_API_ERROR =
//   "manageonboardingplan/N_GET_API_ERROR";
// export const MANAGE_ONBOARDING_PLAN_POST_API_ERROR =
//   "manageonboardingplan/_POST_API_ERROR";
// export const MANAGE_ONBOARDING_PLAN_LOCAL_CACHE =
//   "manageonboardingplan/LOCAL_CACHE";
// export const MANAGE_ONBOARDING_PLAN_CLEAR_LOCAL_CACHE =
//   "manageonboardingplan/CLEAR_LOCAL_CACHE";
// export const MANAGE_ONBOARDING_PLAN_SAVE_EMPLOYEE_CLASSIFICATION =
//   "manageonboardingplan/SAVE_EMPLOYEE_CLASSIFICATION";
// export const MANAGE_ONBOARDING_PLAN_SET_PLAN_STATUS = "setonboardingPlanStatus";
// export const MANAGE_ONBOARDING_PLAN_SET_PLAN_EFFECTIVE_DATE =
//   "setonboardingPlanEffectiveDate";
// export const INCREASE_ONBOARDING_SOURCE_HIERARCHY = "increaseSourceHierarchy";
// export const DECREASE_ONBOARDING_SOURCE_HIERARCHY = "decreaseSourceHierarchy";
// export const UPDATE_ONBOARDING_AUTOENROLLMENT = "updateAutoEnrollment";
// export const MANAGE_ONBOARDING_PLAN_STATUS =
//   "manageonboardingplan/SET_PLAN_STATUS";
// export const MANAGE_ONBOARDING_PLAN_EDIT =
//   "manageonboardingplan/MANAGE_ONBOARDING_PLAN_EDIT";

// export const increaseOnboardingSourceHierarchy = (payload) => ({
//   type: INCREASE_ONBOARDING_SOURCE_HIERARCHY,
//   payload,
// });

// export const decreaseOnboardingSourceHierarchy = (payload) => ({
//   type: DECREASE_ONBOARDING_SOURCE_HIERARCHY,
//   payload,
// });

// export const updateOnboardingAutoEnrollment = (payload) => ({
//   type: UPDATE_ONBOARDING_AUTOENROLLMENT,
//   payload,
// });

// export const setManageOnboardingPlanSelectedMenu = (payload) => ({
//   type: MANAGE_ONBOARDING_PLAN_SET_SELECTED_MENU,
//   payload,
// });

// export const setManageCreateOnboardingData = (payload) => ({
//   type: CREATE_ONBOARDING_PLAN_SET_PAGE_DATA,
//   payload,
// });

// export const setManageOnboardingPlanFlow = (payload) => ({
//   type: MANAGE_ONBOARDING_PLAN_SET_FLOW,
//   payload,
// });

// export const setManageOnboardingPlanLoader = (payload) => ({
//   type: MANAGE_ONBOARDING_PLAN_SET_LOADER,
//   payload,
// });

// export const setManageOnboardingPlanFullPageData = (payload) => ({
//   type: MANAGE_ONBOARDING_PLAN_SET_FULL_PAGE_DATA,
//   payload,
// });

// export const setManageOnboardingPlanToastInfo = (payload) => ({
//   type: MANAGE_ONBOARDING_PLAN_SET_TOAST_INFO,
//   payload,
// });

// export const setManageOnboardingPlanPageLevelData = (payload) => ({
//   type: MANAGE_ONBOARDING_PLAN_SET_PAGE_DATA,
//   payload,
// });
// export const setchangeOnboardingReviewFlag = (payload) => ({
//   type: CHANGE_ONBOARDING_REVIEW_FLAG,
//   payload,
// });

// export const getOnboardingPlanDetailsAction = (payload, dispatch) => {
//   dispatch({
//     type: MANAGE_ONBOARDING_PLAN_GET_API_REQUEST,
//   });

//   return getBasicOnboardingPlanDetails(payload)
//     .then(async (response) => {
//       // Employee classification list for the company id to be retrieveconst employeeClassification = get(state, "employeeClassification", []);
//       // const employeeClassificationApiData = await getEmployeeClassifications(
//       //   get(response, "companyId")
//       // );
//       // savePlanEmployeeClassification(employeeClassificationApiData || []);
//       if (!isEmpty(get(response, "plan"))) {
//         const formData = populateManagePlanForm(get(response, "plan"));
//         dispatch(setManageOnboardingPlanFullPageData(formData));
//         dispatch({
//           type: MANAGE_ONBOARDING_PLAN_GET_API_RESPONSE,
//           payload: get(response, "plan"),
//         });
//         return get(response, "plan");
//       }
//     })
//     .catch((error) => {
//       dispatch({
//         type: MANAGE_ONBOARDING_PLAN_GET_API_ERROR,
//         payload: error,
//       });
//     });
// };
// export const getReviewAndOnboardingPlanDetailsAction = (payload, dispatch) => {
//   dispatch({
//     type: MANAGE_ONBOARDING_PLAN_GET_API_REQUEST,
//   });

//   return getReviewAndOnboardingPlanDetails(payload)
//     .then(async (response) => {
//       // Employee classification list for the company id to be retrieveconst employeeClassification = get(state, "employeeClassification", []);
//       // const employeeClassificationApiData = await getEmployeeClassifications(
//       //   get(response, "companyId")
//       // );
//       // savePlanEmployeeClassification(employeeClassificationApiData || []);
//       if (!isEmpty(get(response, "reviewAndPlanDetail"))) {
//         const formData = populateManagePlanForm(
//           get(response, "reviewAndPlanDetail")
//         );
//         dispatch(setManageOnboardingPlanFullPageData(formData));
//         dispatch({
//           type: MANAGE_ONBOARDING_REVIEW_AND_PLAN_DETAILS,
//           payload: get(response, "reviewAndPlanDetail"),
//         });
//         return get(response, "reviewAndPlanDetail");
//       }
//     })
//     .catch((error) => {
//       dispatch({
//         type: MANAGE_ONBOARDING_PLAN_GET_API_ERROR,
//         payload: error,
//       });
//     });
// };

// export const saveOnboardingPlanDetailsAction = (payload, dispatch, state) => {
//   dispatch({
//     type: MANAGE_ONBOARDING_PLAN_POST_API_REQUEST,
//   });
//   const apiData = get(state, "api.data", {});
//   return postOnboardingPlanDetails({
//     ...apiData,
//     ...payload,
//     tenantId: 1, //TODO: remove hardcoding & take it from JWT
//   })
//     .then(async (response) => {
//       // Employee classification list for the company id to be retrieve
//       // const employeeClassification = get(state, "employeeClassification", []);
//       // if (isEmpty(employeeClassification)) {
//       //   const employeeClassificationApiData = await getEmployeeClassifications(
//       //     get(response, "companyId")
//       //   );
//       //   savePlanEmployeeClassification(employeeClassificationApiData);
//       // }

//       if (response.isSuccessful) {
//         dispatch({
//           type: MANAGE_ONBOARDING_PLAN_POST_API_RESPONSE,
//           payload: response.plan,
//         });
//         const formData = populateManagePlanForm(response.plan);
//         dispatch(setManageOnboardingPlanFullPageData(formData));
//       } else {
//         dispatch({
//           type: MANAGE_ONBOARDING_PLAN_POST_VALIDATION_ERROR,
//           payload: null,
//         });
//       }
//       return response;
//     })
//     .catch((error) => {
//       dispatch({
//         type: MANAGE_ONBOARDING_PLAN_POST_API_ERROR,
//         payload: error,
//       });
//       throw error;
//     });
// };

// export const setManageOnboardingPlanLocalCache = (payload) => ({
//   type: MANAGE_ONBOARDING_PLAN_LOCAL_CACHE,
//   payload,
// });

// export const clearOnboardingLocalCacheByModel = (payload) => ({
//   type: MANAGE_ONBOARDING_PLAN_CLEAR_LOCAL_CACHE,
//   payload,
// });

// export const saveOnboardingPlanEmployeeClassification = (payload) => ({
//   type: MANAGE_ONBOARDING_PLAN_SAVE_EMPLOYEE_CLASSIFICATION,
//   payload,
// });
// export const setPageLevelOnboardingPlanStatus = (payload) => ({
//   type: MANAGE_ONBOARDING_PLAN_SET_PLAN_STATUS,
//   payload,
// });
// export const setPageLevelOnboardingPlanEffectiveDate = (payload) => ({
//   type: MANAGE_ONBOARDING_PLAN_SET_PLAN_EFFECTIVE_DATE,
//   payload,
// });

// export const showEditPreview = (payload) => ({
//   type: MANAGE_ONBOARDING_PLAN_EDIT,
//   payload,
// });
