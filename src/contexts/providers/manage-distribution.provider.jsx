import React, { createContext, useReducer } from "react";
import { manageDistributionReducer } from "../reducers";
import { FLOW_TYPES } from "@/utils/constants/common";

const initialState = {
  selectedMenu: "",
  flow: FLOW_TYPES.ADD,
  showToast: false,
  toastMessage: "",
};

const DataContext = createContext(initialState);

const ManageDistributionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(manageDistributionReducer, initialState);
  const context = { state, dispatch };
  return (
    <DataContext.Provider value={context}>{children}</DataContext.Provider>
  );
};

export { DataContext as manageDistributionStore, ManageDistributionProvider };
