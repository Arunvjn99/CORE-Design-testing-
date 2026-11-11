import React, { createContext, useReducer } from "react";
import { manageTransactionReducer } from "../reducers";
import { FLOW_TYPES } from "@/utils/constants/common";

const initialState = {
  selectedMenu: "",
  flow: FLOW_TYPES.ADD,
  showToast: false,
  reject: false,
  toastMessage: "",
  toastMessage2: "",
  toastMessage1: "",
};

const DataContext = createContext(initialState);

const ManageTransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(manageTransactionReducer, initialState);
  const context = { state, dispatch };
  return (
    <DataContext.Provider value={context}>{children}</DataContext.Provider>
  );
};

export { DataContext as manageTransactionStore, ManageTransactionProvider };
