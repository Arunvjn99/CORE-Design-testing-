import React, { createContext, useReducer } from "react";
import { manageTransactionMaintenance } from "../reducers";
import { FLOW_TYPES } from "@/utils/constants/common";

const initialState = {
  selectedMenu: "",
  flow: FLOW_TYPES.ADD,
  showToast: false,
  toastMessage: "",
  api: {
    isFetching: false,
    isError: false,
    data: {},
    error: null,
  },
  data: {},
  headerData: {
    SUB_TRANSACTION_TYPES: {},
    transactionView: null,
    transacVal: null,
    data: null,
    hearderCount: null,
  },
  requestData: {
    from: 0,
    offset: 20,
    stopInfiniteScroll: false,
    pageNumber: 1,
    append: true,
  },
};

const DataContext = createContext(initialState);

const ManageTransactionMaintenanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    manageTransactionMaintenance,
    initialState
  );
  const context = { state, dispatch };
  return (
    <DataContext.Provider value={context}>{children}</DataContext.Provider>
  );
};

export {
  DataContext as manageTransactionMaintenanceStore,
  ManageTransactionMaintenanceProvider,
};
