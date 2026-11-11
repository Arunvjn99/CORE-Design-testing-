import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const useCustomContext = (initialState = {}) => {
  const [state, setState] = useState(initialState);

  const updateState = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const removeState = (key) => {
    setState((prevState) => {
      const { [key]: removed, ...newState } = prevState;
      return newState;
    });
  };

  return { state, updateState, removeState };
};

export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({});

  const updateGlobalState = (key, value) => {
    setGlobalState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const removeGlobalState = (key) => {
    setGlobalState((prevState) => {
      const { [key]: removed, ...newState } = prevState;
      return newState;
    });
  };

  return (
    <GlobalContext.Provider
      value={{ globalState, updateGlobalState, removeGlobalState }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// UseEffectTrigger Context
const UseEffectTriggerContext = createContext();

export const useUseEffectTriggerContext = () => {
  return useContext(UseEffectTriggerContext);
};

export const UseEffectTriggerProvider = ({ children }) => {
  const {
    state: effectTriggerState,
    updateState,
    removeState,
  } = useCustomContext();

  return (
    <UseEffectTriggerContext.Provider
      value={{
        effectTriggerState,
        updateEffectTriggerState: updateState,
        removeEffectTriggerState: removeState,
      }}
    >
      {children}
    </UseEffectTriggerContext.Provider>
  );
};
