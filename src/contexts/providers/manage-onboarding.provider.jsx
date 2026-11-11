import React, { createContext, useReducer } from "react";
import { manageOnboardingReducer } from "../reducers/manage-onboarding";
import { FLOW_TYPES } from "@/utils/constants/common";

const initialState = {
  selectedMenu: "",
  flow: FLOW_TYPES.ADD,
  showToast: false,
  toastMessage: "",
  states: [],
  sponsoringOrgList: [],
  isShow1: false,
  api: {
    isFetching: false,
    isError: false,
    data: {},
    error: null,
  },
};

const DataContext = createContext(initialState);
const ManageOnboardingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(manageOnboardingReducer, initialState);
  const context = { state, dispatch };
  return (
    <DataContext.Provider value={context}>{children}</DataContext.Provider>
  );
};

export { DataContext as manageOnboardingStore, ManageOnboardingProvider };
