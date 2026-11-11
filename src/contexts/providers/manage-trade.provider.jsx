import React, { createContext, useReducer } from "react";
import { manageTradeReducer } from "../reducers";
import { FLOW_TYPES } from "@/utils/constants/common";

const initialState = {
  selectedMenu: "",
  flow: FLOW_TYPES.ADD,
  showToast: false,
  toastMessage: "",
};

const DataContext = createContext(initialState);

const ManageTradeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(manageTradeReducer, initialState);
  const context = { state, dispatch };
  return (
    <DataContext.Provider value={context}>{children}</DataContext.Provider>
  );
};

export { DataContext as manageTradeStore, ManageTradeProvider };
