import { get } from "lodash-es";
import {
  MANAGE_ADJUSTMENT_SET_SELECTED_MENU,
  MANAGE_ADJUSTMENT_SET_TOAST_INFO,
  MANAGE_CONTRIBUTION_REVERSAL_STATE,
  SET_ADJUSTMENT_ID_INFO,
  MANAGE_BATCH_ADJUSTMENT_STATE,
  SET_FEE_REVERSAL_DATA,
} from "./action";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ADJUSTMENT_ID_INFO:
      return {
        ...state,
        id: payload.id,
        step: payload.step,
      };
    case MANAGE_ADJUSTMENT_SET_TOAST_INFO:
      return {
        ...state,
        showToast: get(payload, "showToast", false),
        toastMessage: get(payload, "toastMessage", ""),
      };
    case MANAGE_ADJUSTMENT_SET_SELECTED_MENU:
      return {
        ...state,
        selectedMenu: payload,
      };
    case MANAGE_CONTRIBUTION_REVERSAL_STATE:
      return {
        ...state,
        ...payload,
      };
    case MANAGE_BATCH_ADJUSTMENT_STATE:
      return {
        ...state,
        ...payload,
      };
    case SET_FEE_REVERSAL_DATA:
      return {
        ...state,
        feeReversalData: payload,
      };
  }
};

export default reducer;
