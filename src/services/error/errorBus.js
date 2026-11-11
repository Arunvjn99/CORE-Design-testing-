export const NETWORK_ERROR_EVENT = "showNetworkErrorModal";
export const NETWORK_RESTORED_EVENT = "showNetworkRestoredModal";
export const NETWORK_ERROR_CODE = "ERR_INTERNET_DISCONNECTED";
export const NETWORK_ERROR_HEADER = "Network Error";
export const NETWORK_ERROR_MESSAGE =
  "The request could not be completed due to a network issue. Please check your connection and try again.";
export const NETWORK_SUCCESS_HEADER = "Back Online";
export const NETWORK_SUCCESS_MESSAGE = "Internet Connection has been restored.";
const NETWORK_DEBOUNCE_MS = 1500;

const getErrorCode = (error) =>
  `${
    error?.code ||
    error?.response?.data?.errorCode ||
    error?.response?.data?.code ||
    ""
  }`.toUpperCase();

export const isInternetDisconnectedError = (error) => {
  const code = getErrorCode(error);
  const message = `${error?.message || ""}`.toUpperCase();

  return (
    code === NETWORK_ERROR_CODE ||
    code === "ERR_NETWORK" ||
    message.includes(NETWORK_ERROR_CODE) ||
    message.includes("ERR_NETWORK") ||
    message.includes("NETWORK ERROR")
  );
};

export const emitNetworkError = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.__isNetworkOffline = true;

  const now = Date.now();
  const lastShownAt = window.__lastNetworkErrorModalAt || 0;
  if (now - lastShownAt < NETWORK_DEBOUNCE_MS) {
    return;
  }
  window.__lastNetworkErrorModalAt = now;

  window.dispatchEvent(
    new CustomEvent(NETWORK_ERROR_EVENT, {
      detail: {
        header: NETWORK_ERROR_HEADER,
        message: NETWORK_ERROR_MESSAGE,
      },
    })
  );
};

export const emitNetworkRestored = () => {
  if (typeof window === "undefined") {
    return;
  }

  const wasOffline =
    !!window.__isNetworkOffline ||
    (typeof navigator !== "undefined" && !navigator.onLine);

  window.__isNetworkOffline = false;

  if (!wasOffline) {
    return;
  }

  const now = Date.now();
  const lastShownAt = window.__lastNetworkRestoredModalAt || 0;
  if (now - lastShownAt < NETWORK_DEBOUNCE_MS) {
    return;
  }
  window.__lastNetworkRestoredModalAt = now;

  window.dispatchEvent(
    new CustomEvent(NETWORK_RESTORED_EVENT, {
      detail: {
        header: NETWORK_SUCCESS_HEADER,
        message: NETWORK_SUCCESS_MESSAGE,
      },
    })
  );
};
