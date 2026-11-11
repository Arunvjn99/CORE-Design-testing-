import { get } from "lodash-es";
import { MANAGE_INPLANROTH_SET_TOAST_INFO } from "./actions";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case MANAGE_INPLANROTH_SET_TOAST_INFO:
      return {
        ...state,
        showToast: get(payload, "showToast", false),
        toastMessage: get(payload, "toastMessage", ""),
      };
    default:
      return state;
  }
};

export default reducer;
