import styles from "./NetworkErrorToast.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { faWifiSlash, faWifi, faTimes } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toast } from "react-bootstrap";
import {
  NETWORK_ERROR_EVENT,
  NETWORK_RESTORED_EVENT,
  NETWORK_ERROR_HEADER,
  NETWORK_ERROR_MESSAGE,
  NETWORK_SUCCESS_HEADER,
  NETWORK_SUCCESS_MESSAGE,
} from "../../services/error/errorBus";

const AUTO_HIDE_DELAY = 3000;

const NetworkErrorToast = () => {
  const [errorState, setErrorState] = useState({
    show: false,
    type: "error",
    header: "",
    message: "",
  });
  const wasOfflineRef = useRef(
    (typeof navigator !== "undefined" && !navigator.onLine) ||
      (typeof window !== "undefined" && !!window.__isNetworkOffline)
  );

  const handleClose = () => {
    setErrorState((prev) => ({ ...prev, show: false }));
  };

  useEffect(() => {
    const handleNetworkError = (event) => {
      wasOfflineRef.current = true;
      if (typeof window !== "undefined") {
        window.__isNetworkOffline = true;
      }
      setErrorState({
        show: true,
        type: "error",
        header: event?.detail?.header || NETWORK_ERROR_HEADER,
        message: event?.detail?.message || NETWORK_ERROR_MESSAGE,
      });
    };

    const handleOffline = () => {
      wasOfflineRef.current = true;
      if (typeof window !== "undefined") {
        window.__isNetworkOffline = true;
      }
      setErrorState({
        show: true,
        type: "error",
        header: NETWORK_ERROR_HEADER,
        message: NETWORK_ERROR_MESSAGE,
      });
    };

    const handleOnline = (event) => {
      const wasOffline =
        wasOfflineRef.current ||
        (typeof window !== "undefined" && !!window.__isNetworkOffline);
      if (!wasOffline) return;
      wasOfflineRef.current = false;
      if (typeof window !== "undefined") {
        window.__isNetworkOffline = false;
      }
      setErrorState({
        show: true,
        type: "success",
        header: event?.detail?.header || NETWORK_SUCCESS_HEADER,
        message: event?.detail?.message || NETWORK_SUCCESS_MESSAGE,
      });
    };

    window.addEventListener(NETWORK_ERROR_EVENT, handleNetworkError);
    window.addEventListener(NETWORK_RESTORED_EVENT, handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener(NETWORK_ERROR_EVENT, handleNetworkError);
      window.removeEventListener(NETWORK_RESTORED_EVENT, handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const isSuccess = errorState.type === "success";

  return (
    <div className={styles.toastWrapper}>
      <div className="ToastStyle">
        <Toast
          key={errorState.type}
          onClose={handleClose}
          show={errorState.show}
          delay={AUTO_HIDE_DELAY}
          autohide={isSuccess}
          className={`toast fullWidthToast ${styles.networkErrorToast} ${
            isSuccess ? "bg-color-success-light" : "bg-color-critical-light"
          }`}
        >
          <Toast.Body className="toast-body fullWidthToast">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                {isSuccess ? (
                  <FontAwesomeIcon
                    icon={faWifi}
                    className="iconStyle-toast success-text-color mr-2"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faWifiSlash}
                    className="iconStyle-toast critical-text-color mr-2"
                  />
                )}
                <div>
                  <div
                    className={`toastMessageStyle ${
                      isSuccess ? "success-text-color" : "critical-text-color"
                    }`}
                  >
                    {errorState.header}
                  </div>
                  {errorState.message && (
                    <div
                      className={`subToastMessage ${
                        isSuccess ? "success-text-color" : "critical-text-color"
                      }`}
                    >
                      {errorState.message}
                    </div>
                  )}
                </div>
              </div>
              {isSuccess && (
                <button
                  type="button"
                  className="cancelStyle success-text-color"
                  onClick={handleClose}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </div>
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default NetworkErrorToast;
