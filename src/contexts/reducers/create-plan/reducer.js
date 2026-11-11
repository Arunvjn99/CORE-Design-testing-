import { get } from "lodash-es";
import {
  MANAGE_PLAN_SET_FLOW,
  MANAGE_PLAN_SET_SELECTED_MENU,
  CREATE_PLAN_SET_PAGE_DATA,
  MANAGE_PLAN_SET_LOADER,
  MANAGE_PLAN_SET_FULL_PAGE_DATA,
  MANAGE_PLAN_SET_TOAST_INFO,
  MANAGE_PLAN_SET_PAGE_DATA,
  MANAGE_PLAN_GET_API_REQUEST,
  MANAGE_PLAN_POST_API_REQUEST,
  MANAGE_PLAN_GET_API_RESPONSE,
  MANAGE_PLAN_POST_API_RESPONSE,
  MANAGE_PLAN_POST_VALIDATION_ERROR,
  MANAGE_PLAN_GET_API_ERROR,
  MANAGE_PLAN_POST_API_ERROR,
  MANAGE_PLAN_LOCAL_CACHE,
  MANAGE_PLAN_CLEAR_LOCAL_CACHE,
  MANAGE_PLAN_SET_PLAN_STATUS,
  INCREASE_SOURCE_HIERARCHY,
  DECREASE_SOURCE_HIERARCHY,
  UPDATE_AUTOENROLLMENT,
  MANAGE_REVIEW_AND_PLAN_DETAILS,
  CHANGE_REVIEW_FLAG,
  MANAGE_PLAN_SET_PLAN_EFFECTIVE_DATE,
  MANAGE_ONBOARDING_PLAN_EDIT,
  MANAGE_ONBOARDING_ID_RUNID,
} from "./actions";

const addSourceHierarchy = (sources, source) => {
  const existingSource = sources.find((e) => e.id === source.id);
  if (existingSource) {
    return sources.map((e) =>
      e.id === source.id ? { ...e, hierarchy: e.hierarchy + 1 } : e
    );
  }
  return [...sources, { ...source, hierarchy: 1 }];
};
const reduceSourceHierarchy = (sources, source) => {
  const existingSource = sources.find((e) => e.id === source.id);
  if (existingSource.hierarchy <= 1) {
    return sources.map((e) =>
      e.id === source.id ? { ...e, hierarchy: 0 } : e
    );
  }
  return sources.map((e) =>
    e.id === source.id ? { ...e, hierarchy: e.hierarchy - 1 } : e
  );
};
const reducer = (state, action) => {
  const { type = "", payload } = action;

  switch (type) {
    case MANAGE_PLAN_SET_SELECTED_MENU:
      return {
        ...state,
        selectedMenu: payload,
      };
    case MANAGE_PLAN_SET_FLOW:
      return {
        ...state,
        ...payload,
      };
    case INCREASE_SOURCE_HIERARCHY:
      const { sources, source } = payload;
      return {
        ...state,
        sourceHierarchy: addSourceHierarchy(sources, source),
      };
    case DECREASE_SOURCE_HIERARCHY:
      const { sourceList, reqSource } = payload;
      return {
        ...state,
        sourceHierarchy: reduceSourceHierarchy(sourceList, reqSource),
      };
    case MANAGE_PLAN_SET_PLAN_STATUS:
      const { planStatus } = payload;
      return {
        ...state,
        api: {
          ...state.api,
          reviewAndPlanDetail: {
            ...state.api.reviewAndPlanDetail,
            planStatus: planStatus,
          },
        },
      };
    case MANAGE_PLAN_SET_PLAN_EFFECTIVE_DATE:
      const { effectiveDate } = payload;
      return {
        ...state,
        api: {
          ...state.api,
          reviewAndPlanDetail: {
            ...state.api.reviewAndPlanDetail,
            effectiveDate: effectiveDate,
          },
        },
      };
    case CREATE_PLAN_SET_PAGE_DATA: {
      const { formName, fieldData } = payload;
      return {
        ...state,
        [formName]: { ...fieldData },
      };
    }
    case MANAGE_PLAN_SET_FULL_PAGE_DATA:
      return {
        ...state,
        ...payload,
      };
    case MANAGE_PLAN_SET_LOADER:
      return {
        ...state,
        isLoading: payload,
      };
    case MANAGE_PLAN_SET_PAGE_DATA: {
      const { formName, fieldData } = payload;
      return {
        ...state,
        [formName]: { ...fieldData },
      };
    }
    case MANAGE_PLAN_SET_TOAST_INFO: {
      return {
        ...state,
        showToast: get(payload, "showToast", false),
        toastMessage: get(payload, "toastMessage"),
      };
    }

    case MANAGE_ONBOARDING_PLAN_EDIT: {
      return {
        ...state,
        isShow1: get(payload, "isShow1", false),
      };
    }

    case MANAGE_PLAN_GET_API_REQUEST:
    case MANAGE_PLAN_POST_API_REQUEST:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: true,
          error: null,
        },
      };
    case MANAGE_PLAN_GET_API_RESPONSE:
    case MANAGE_PLAN_POST_API_RESPONSE:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          data: payload,
          isError: false,
        },
      };
    case MANAGE_PLAN_POST_VALIDATION_ERROR:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          isError: false,
        },
      };
    case MANAGE_PLAN_GET_API_ERROR:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          isError: true,
          error: payload,
        },
      };
    case MANAGE_PLAN_POST_API_ERROR:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          isError: true,
          error: payload,
        },
      };
    case MANAGE_REVIEW_AND_PLAN_DETAILS:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          reviewAndPlanDetail: payload,
        },
      };
    case CHANGE_REVIEW_FLAG: {
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          reviewAndPlanDetail: {
            ...(state.api?.reviewAndPlanDetail
              ? state.api.reviewAndPlanDetail
              : {}),
            review: {
              ...(state.api?.reviewAndPlanDetail
                ? state.api.reviewAndPlanDetail.review
                : {}),
              [payload.module]: payload.review,
            },
          },
        },
      };
    }
    case MANAGE_PLAN_LOCAL_CACHE:
      return {
        ...state,
        [payload.model]: payload.data,
      };
    case MANAGE_PLAN_CLEAR_LOCAL_CACHE:
      delete state[payload];
      return {
        ...state,
      };
    case UPDATE_AUTOENROLLMENT: {
      // temp["api"]["data"]["enrollment"]["autoEnrollment"] = payload;
      state = {
        ...state,
        api: {
          ...state.api,
          data: {
            ...state.api.data,
            enrollment: {
              ...state.api.data?.enrollment,
              autoEnrollment: payload,
            },
          },
        },
      };
      return {
        ...state,
      };
    }
    case MANAGE_ONBOARDING_ID_RUNID: {
      return {
        ...state,
        id: get(payload, "id", 1),
        runId: get(payload, "runId", 1),
      };
    }
    default:
      return state;
  }
};

export default reducer;
