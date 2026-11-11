import {
  MANAGE_TRANSACTION_MAINTENANCE_SET_DATA,
  MANAGE_TRANSACTION_MAINTENANCE_SET_HEADERDATA,
  MANAGE_TRANSACTION_MAINTENANCE_SET_FILTER_DATA,
  MANAGE_TRANSACTION_MAINTENANCE_SET_DIVIDEND_ROUTING_DATA,
  MANAGE_TRANSACTION_MAINTENANCE_SET_REQUEST_DATA,
} from "./actions";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case MANAGE_TRANSACTION_MAINTENANCE_SET_DATA:
      return {
        ...state,
        data: payload,
      };
    case MANAGE_TRANSACTION_MAINTENANCE_SET_HEADERDATA:
      return {
        ...state,
        headerData: payload,
      };
    case MANAGE_TRANSACTION_MAINTENANCE_SET_FILTER_DATA:
      return {
        ...state,
        filterData: payload,
      };
    case MANAGE_TRANSACTION_MAINTENANCE_SET_DIVIDEND_ROUTING_DATA:
      return {
        ...state,
        dividendData: payload,
      };
    case MANAGE_TRANSACTION_MAINTENANCE_SET_REQUEST_DATA:
      return {
        ...state,
        requestData: payload,
      };
    default:
      return state;
  }
};

export default reducer;
