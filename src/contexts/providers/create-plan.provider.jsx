import React, { createContext, useReducer } from "react";
import { createPlanReducer } from "../reducers";
import { FLOW_TYPES } from "@/utils/constants/common";

const initialState = {
  selectedMenu: "",
  flow: FLOW_TYPES.ADD,
  showToast: false,
  toastMessage: "",
  isShow1: false,
  id: 1,
  runId: 1,
};

const DataContext = createContext(initialState);

const CreatePlanProvider = ({ children }) => {
  const [state, dispatch] = useReducer(createPlanReducer, initialState);
  const context = { state, dispatch };
  return (
    <DataContext.Provider value={context}>{children}</DataContext.Provider>
  );
};

export { DataContext as createPlanStore, CreatePlanProvider };
