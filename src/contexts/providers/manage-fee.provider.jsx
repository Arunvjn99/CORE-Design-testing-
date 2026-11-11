import React, { createContext, useReducer } from "react";
import { manageFeeReducer } from "../reducers";
import { FLOW_TYPES } from "@/utils/constants/common";

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

const ManageFeeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(manageFeeReducer, initialState);
  const context = { state, dispatch };
  return (
    <DataContext.Provider value={context}>{children}</DataContext.Provider>
  );
};

export { DataContext as manageFeeStore, ManageFeeProvider };
