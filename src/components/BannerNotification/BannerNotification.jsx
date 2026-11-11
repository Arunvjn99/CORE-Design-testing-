import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faLightbulbExclamation,
} from "@fortawesome/pro-solid-svg-icons";

const BannerNotification = ({
  infoType,
  message,
  className = "",
  showIcon = true,
}) => {
  const Data = [
    {
      type: 1,
      icon: faExclamationCircle,
      className: "bc-critical bg-color-critical-light critical-text-color",
    },
    {
      type: 2,
      icon: faExclamationTriangle,
      className: "bc-warning warningBackground warning-text-color",
    },
    {
      type: 3,
      icon: faInfoCircle,
      className: "infoBorder infoBackground highlight-text-color",
    },
    {
      type: 4,
      icon: faCheckCircle,
      className: "bc-success bg-color-success-light success-text-color",
    },
    {
      type: 5,
      icon: faLightbulbExclamation,
      className: "bc-strong bg-color-layer2 default-text-color",
    },
    {
      type: 6,
      icon: faInfoCircle,
      className: "subtle-least-text-color bc-strong",
    },
  ];

  const style = Data.filter((_) => _.type === infoType);

  return (
    <div className={`BannerStyle ${className} ${style[0].className}`}>
      {showIcon && (
        <FontAwesomeIcon className="iconStyle-banner" icon={style[0].icon} />
      )}
      <div className="message-banner">{message} </div>
    </div>
  );
};
export default BannerNotification;
