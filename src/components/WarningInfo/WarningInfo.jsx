import { faInfoCircle } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
const WarningInfo = ({ className, page, message }) => (
  <div
    className={
      page == "ManageSourceCompensationComponent"
        ? `${className}`
        : `${className} text-nowrap`
    }
  >
    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
    {message}
  </div>
);
export default WarningInfo;
