import React, { createContext, useReducer } from "react";
import { FLOW_TYPES } from "@/utils/constants/common";
import { manageTenantReducer } from "../reducers";

const initialState = {
  selectedMenu: "",
  flow: FLOW_TYPES.ADD,
  showToast: false,
  toastMessage: "",
};

const DataContext = createContext(initialState);
const ManageTenantProvider = ({ children }) => {
  const [state, dispatch] = useReducer(manageTenantReducer, initialState);
  const context = { state, dispatch };
  return (
    <DataContext.Provider value={context}>{children}</DataContext.Provider>
  );
};
export { DataContext as manageTenantStore, ManageTenantProvider };
