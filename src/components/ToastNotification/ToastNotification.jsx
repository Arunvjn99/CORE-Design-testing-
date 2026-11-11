import React from "react";
import { Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
  faLightbulbExclamation,
} from "@fortawesome/pro-solid-svg-icons";
import { faTimes } from "@fortawesome/pro-light-svg-icons";

const ToastNotification = ({
  showToast,
  toastMessage,
  handleClose,
  infoType,
  primaryBackGround = true,
  subToastMessage,
  position,
  autoHide = true,
  delay = 3000,
  fullWidth = false,
}) => {
  const toastTypes = [
    {
      type: 1,
      icon: faExclamationTriangle,
      className: `bc-critical ${
        primaryBackGround ? `bg-color-critical-light` : "bg-color-layer1"
      }`,
      iconClassName: "critical-text-color",
    },
    {
      type: 2,
      icon: faExclamationTriangle,
      className: `bc-warning ${
        primaryBackGround ? `warningBackground` : "bg-color-layer1"
      }`,
      iconClassName: "warning-text-color",
    },
    {
      type: 3,
      icon: faInfoCircle,
      className: `infoBorder ${
        primaryBackGround ? `infoBackground` : "bg-color-layer1"
      }`,
      iconClassName: "highlight-text-color",
    },
    {
      type: 4,
      icon: faCheckCircle,
      className: `bc-success ${
        primaryBackGround ? `bg-color-success-light` : "bg-color-layer1"
      }`,
      iconClassName: "success-text-color",
    },
    {
      type: 5,
      icon: faLightbulbExclamation,
      className: `bc-strong ${
        primaryBackGround ? `bg-color-layer2` : "bg-color-layer1"
      }`,
      iconClassName: "default-text-color",
    },
  ];

  const selectedType = toastTypes.find((type) => type.type === infoType);

  return (
    <div className="ToastStyle">
      <Toast
        onClose={handleClose}
        show={showToast}
        style={{
          ...position,
        }}
        className={`toast ${selectedType.className} ${
          fullWidth ? "fullWidthToast" : ""
        }`}
        delay={autoHide ? delay : null}
        autohide={autoHide}
      >
        <Toast.Body
          className={` d-flex flex-col toast-body ${
            fullWidth ? "fullWidthToast" : ""
          }`}
        >
          <div className="d-flex justify-content-between align-items-center">
            <FontAwesomeIcon
              icon={selectedType.icon}
              className={`iconStyle-toast ${selectedType.iconClassName} mr-2`}
            />
            <div>
              {toastMessage && (
                <div className="toastMessageStyle">{toastMessage}</div>
              )}
            </div>
            <FontAwesomeIcon
              icon={faTimes}
              className="cancelStyle"
              onClick={handleClose}
            />
          </div>
          {subToastMessage && (
            <div className="subToastMessage ml-1p5r pl-1">
              {subToastMessage}
            </div>
          )}
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastNotification;
