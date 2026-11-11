import React, { createContext, useReducer } from "react";
import { manageRkaasReducer } from "../reducers";
import { FLOW_TYPES } from "@/utils/constants/common";

const initialState = {
  selectedMenu: "",
  flow: FLOW_TYPES.ADD,
  showToast: false,
  toastMessage: "",
};

const DataContext = createContext(initialState);

const ManageRkaasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(manageRkaasReducer, initialState);
  const context = { state, dispatch };
  return (
    <DataContext.Provider value={context}>{children}</DataContext.Provider>
  );
};

export { DataContext as manageRkaasStore, ManageRkaasProvider };
