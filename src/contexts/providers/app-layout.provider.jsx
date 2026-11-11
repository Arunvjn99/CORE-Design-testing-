import React, { createContext, useReducer } from "react";
import { appLayoutReducer } from "../reducers";

const initialState = {
  showToast: false,
  selectedMenu: "/home",
  companyDetails: {},
  planDetails: {},
  eligibilityDetails: {},
  appUsage: "ESP",
  isFromPlanContact: false,
  includePayrollInformation: undefined,
  parentFileId: null,
};

const DataContext = createContext(initialState);

const AppLayoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appLayoutReducer, initialState);
  const context = { state, dispatch };
  return (
    <DataContext.Provider value={context}>{children}</DataContext.Provider>
  );
};

export { DataContext as appLayoutStore, AppLayoutProvider };
