import React, { createContext, useReducer } from "react";
import { FLOW_TYPES } from "@/utils/constants/common";
import { manageAdjustmentReducer } from "../reducers";

const initialState = {
  selectedMenu: "",
  flow: FLOW_TYPES.ADD,
  showToast: false,
  toastMessage: "",
  api: {
    isCreate: false,
    isFetching: false,
    isError: false,
    data: {},
    error: null,
  },
};

const DataContext = createContext(initialState);

const ManageAdjustmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(manageAdjustmentReducer, initialState);
  const context = { state, dispatch };
  return (
    <DataContext.Provider value={context}>{children}</DataContext.Provider>
  );
};

export { DataContext as manageAdjustmentStore, ManageAdjustmentProvider };
