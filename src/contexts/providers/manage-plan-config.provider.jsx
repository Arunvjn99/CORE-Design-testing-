import React, { createContext, useReducer } from "react";
import { managePlanConfigReducer } from "../reducers";
import { FLOW_TYPES } from "@/utils/constants/common";

const initialState = {
  selectedMenu: "",
  flow: FLOW_TYPES.ADD,
  showToast: false,
  toastMessage: "",
};

const DataContext = createContext(initialState);

const ManagePlanConfigProvider = ({ children }) => {
  const [state, dispatch] = useReducer(managePlanConfigReducer, initialState);
  const context = { state, dispatch };
  return (
    <DataContext.Provider value={context}>{children}</DataContext.Provider>
  );
};

export { DataContext as managePlanConfigStore, ManagePlanConfigProvider };
