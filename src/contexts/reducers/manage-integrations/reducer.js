// import { get } from "lodash-es";
import { get } from "lodash-es";
import {
  MANAGE_INTEGRATIONS_FORM_VALUES,
  MANAGE_INTEGRATIONS_LISTING_DATA,
  MANAGE_INTEGRATION_SET_TOAST_INFO,
} from "./actions";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case MANAGE_INTEGRATIONS_FORM_VALUES:
      return {
        ...state,
        formValues: payload,
      };
    case MANAGE_INTEGRATIONS_LISTING_DATA:
      return {
        ...state,
        listingData: payload,
      };
    case MANAGE_INTEGRATION_SET_TOAST_INFO: {
      return {
        ...state,
        showToast: get(payload, "showToast", false),
        toastMessage: get(payload, "toastMessage"),
      };
    }
    default:
      return state;
  }
};

export default reducer;
