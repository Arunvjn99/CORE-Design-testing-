import { toUpper } from "lodash-es";
import React from "react";
import { faCheckCircle, faTimesCircle } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faCircle } from "@fortawesome/pro-solid-svg-icons";

const GetInitialsNew = ({ name, className, status, size }) => {
  const getInitials = (name = "") => {
    if (!name) return "";

    if (name.includes(",")) {
      const [lastName, firstName] = name.split(",").map((s) => s.trim());

      return `${lastName.charAt(0)}${firstName.charAt(0)}`;
    }

    const words = name.trim().split(/\s+/);

    if (words.length === 1) return words[0].charAt(0);

    return `${words[words.length - 1].charAt(0)}${words[0].charAt(0)}`;
  };
  const initials = getInitials(name);
  const sizeClass = size ? size : "";
  const renderStatusIcon = () => {
    switch (status) {
      case "Active":
        return (
          <FontAwesomeIcon icon={faCheckCircle} className="avt-Status active" />
        );
      case "Terminated":
        return (
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="avt-Status cancelled"
          />
        );
      case "Retired":
        return (
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="avt-Status cancelled"
          />
        );
      case "Locked":
        return <FontAwesomeIcon icon={faLock} className="avt-Status locked" />;
      case "Deceased":
        return (
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="avt-Status cancelled"
          />
        );
      case "Disabled":
        return (
          <FontAwesomeIcon
            icon={faCircle}
            className="avt-Status disabled-status-employee"
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className={`avt-wrapper ${sizeClass}`}>
      <div className={`name-initials ${className} h-5r w-5r`}>
        {toUpper(initials)}
      </div>
      {renderStatusIcon(status)}
    </div>
  );
};

export default GetInitialsNew;
