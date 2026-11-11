import React, { createContext, useReducer } from "react";
import { manageIntegrationsReducer } from "../reducers/manage-integrations";
const initialState = {
  formValues: {},
  showToast: false,
};
const DataContext = createContext(initialState);

const ManageIntegrationsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(manageIntegrationsReducer, initialState);
  const context = { state, dispatch };
  return (
    <DataContext.Provider value={context}>{children}</DataContext.Provider>
  );
};

export { DataContext as manageIntegrationsStore, ManageIntegrationsProvider };
