import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import AddToolTip from "../AddToolTip/AddToolTip";

const IconDownloadButtons = ({
  icon,
  iconColor,
  data,
  url,
  color = false,
  noGap = false,
}) => {
  const handleDownload = () => {
    if (url) {
      window.open(url, "_blank");
    } else {
      console.error("Download URL is missing!");
    }
  };

  return (
    <div
      className={`download-container d-flex align-items-center ${!noGap && ""}`}
    >
      <FontAwesomeIcon color={iconColor} icon={icon} size="sm" />
      <AddToolTip className="core-body-text-regular-medium" name={data}>
        <span
          className={`download-link cursor-pointer fw-medium ms-2 ${
            color ? "link-decoration-underlined" : "text-decoration-underline"
          }`}
          onClick={handleDownload}
        >
          {data}
        </span>
      </AddToolTip>
    </div>
  );
};

export default IconDownloadButtons;
