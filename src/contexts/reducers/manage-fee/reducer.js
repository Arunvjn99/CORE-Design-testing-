import { get } from "lodash-es";
import {
  MANAGE_FEE_SET_FLOW,
  MANAGE_FEE_SET_SELECTED_MENU,
  MANAGE_FEE_SET_TOAST_INFO,
  SET_BASIC_FEE_DATA,
  SET_SCHEDULE_DATA,
  MANAGE_FEE_LOADING,
  MANAGE_FEE_ID_INFO,
  MANAGE_FEE_SET_CALCULATION_DATA,
  MANAGE_FEE_SET_APPLICABLE_DATA,
  MANAGE_FEE_CALCULATION_DATA,
  MANAGE_FEE_SUMMARY_INFO,
  MANAGE_FEE_TRANSACTION_INFO,
  MANAGE_FEE_RUN_DATE,
} from "./actions";

const reducer = (state, action) => {
  const { type, payload } = action;
  console.log(payload, "bjbkjnkj");
  switch (type) {
    case MANAGE_FEE_SET_SELECTED_MENU:
      return {
        ...state,
        selectedMenu: payload,
      };
    case MANAGE_FEE_SET_FLOW:
      return {
        ...state,
        ...payload,
      };
    case MANAGE_FEE_SET_TOAST_INFO:
      console.log("TOAST ON ", payload);
      return {
        ...state,
        showToast: get(payload, "showToast", false),
        toastMessage: get(payload, "toastMessage", ""),
      };
    case SET_BASIC_FEE_DATA:
      return {
        ...state,
        isLoading: false,
        api: {
          ...state.api,
          isSuccessfull: payload.isSuccessfull,
          data: {
            ...state.api.data,
            basicFeeDetails: payload.basicFeeDetails,
          },
        },
      };
    case SET_SCHEDULE_DATA:
      return {
        ...state,
        isLoading: false,
        api: {
          ...state.api,
          isSuccessfull: payload.isSuccessfull,
          data: {
            ...state.api.data,
            feeSchedule: payload.feeSchedule,
          },
        },
      };
    case MANAGE_FEE_CALCULATION_DATA:
      return {
        ...state,
        isLoading: false,
        api: {
          ...state.api,
          isSuccessfull: payload.isSuccessful,
          data: {
            ...state.api.data,
            calculationDetails: payload.calculationDetails,
          },
        },
      };
    case MANAGE_FEE_SET_APPLICABLE_DATA:
      return {
        ...state,
        isLoading: false,
        api: {
          ...state.api,
          isSuccessfull: true,
          data: {
            ...state.api.data,
            feeApplicableTo: payload.feeApplicableTo,
          },
        },
      };
    case MANAGE_FEE_SET_CALCULATION_DATA:
      return {
        ...state,
        isLoading: false,
        api: {
          ...state.api,
          isSuccessfull: payload.isSuccessfull,
          data: {
            ...state.api.data,
            calculationDetails: payload.calculationDetails,
          },
        },
      };
    case MANAGE_FEE_SUMMARY_INFO:
      // return {
      //   ...state,
      //   isLoading: false,
      //   api: {
      //     ...state.api,
      //     isSuccessfull: payload.isSuccessful,
      //     data: {
      //       ...state.api.data,
      //       summaryDetails: payload.summaryDetails,
      //     },
      //   },
      // };
      return {
        ...state,
        showToast: get(payload, "showToast", false),
        toastMessage: get(payload, "toastMessage", ""),
      };
    case MANAGE_FEE_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case MANAGE_FEE_ID_INFO:
      return {
        ...state,
        feeId: payload.id,
        step: payload.step,
      };
    case MANAGE_FEE_TRANSACTION_INFO:
      return {
        ...state,
        isLoading: false,
        api: {
          ...state.api,
          isSuccessfull: payload.isSuccessfull,
          data: {
            ...state.api.data,
            feeTransactionDetails: payload.feeTransactionDetails,
          },
        },
      };
    case MANAGE_FEE_RUN_DATE:
      return {
        ...state,
        feeRunDate: payload.feeRunDate,
      };

    default:
      return state;
  }
};

export default reducer;
