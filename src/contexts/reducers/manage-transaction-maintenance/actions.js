export const MANAGE_TRANSACTION_MAINTENANCE_SET_DATA =
  "manageTransactionMaintenance/SET_DATA";
export const MANAGE_TRANSACTION_MAINTENANCE_SET_HEADERDATA =
  "manageTransactionMaintenance/SET_HEADER_DATA";
export const MANAGE_TRANSACTION_MAINTENANCE_SET_FILTER_DATA =
  "manageTransactionMaintenance/SET_FILTER_DATA";
export const MANAGE_TRANSACTION_MAINTENANCE_SET_DIVIDEND_ROUTING_DATA =
  "manageTransactionMaintenance/SET_DIVIDEND_ROUTING_DATA";
export const MANAGE_TRANSACTION_MAINTENANCE_SET_REQUEST_DATA =
  "manageTransactionMaintenance/SET_REQUEST_DATA";

export const setTransactionMaintenanceRecordsData = (payload) => ({
  type: MANAGE_TRANSACTION_MAINTENANCE_SET_DATA,
  payload,
});

export const setTransactionMaintenanceHeaderData = (payload) => ({
  type: MANAGE_TRANSACTION_MAINTENANCE_SET_HEADERDATA,
  payload: payload,
});

export const setTransactionMaintenanceFilterData = (payload) => ({
  type: MANAGE_TRANSACTION_MAINTENANCE_SET_FILTER_DATA,
  payload: payload,
});

export const setTransactionMaintenanceDividendRoutingData = (payload) => ({
  type: MANAGE_TRANSACTION_MAINTENANCE_SET_DIVIDEND_ROUTING_DATA,
  payload: payload,
});

export const setTransactionMaintenanceRequestData = (payload) => ({
  type: MANAGE_TRANSACTION_MAINTENANCE_SET_REQUEST_DATA,
  payload: payload,
});
