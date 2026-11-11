import React from "react";
import { Image } from "react-bootstrap";
import ExcelImage from "../../assets/png/export-img.png";
import { faRedoAlt } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ButtonWithIcon = ({
  type,
  width = "20px",
  onButtonClick = () => {},
  className = "core-body-text-regular-bold-primary mr-2",
  buttonData = { image: ExcelImage, name: "Data" },
}) => {
  switch (type) {
    case 1:
      return (
        <span
          className={`cursor-pointer d-flex align-items-center gap-2 ${className}`} // Added flex, items-center, and gap-1
          onClick={() => onButtonClick()}
        >
          <Image src={ExcelImage} width={width} />
          <a>Export</a>
        </span>
      );
    case 2:
      return (
        <span
          className={`cursor-pointer d-flex align-items-center gap-2 btn btn-link ${className}`} // gap-2 for 8px spacing
          onClick={() => onButtonClick()}
        >
          <FontAwesomeIcon icon={faRedoAlt} />
          <a>Refresh</a>
        </span>
      );
    case 3:
      return (
        <span
          className={`cursor-pointer ${className}`}
          onClick={() => onButtonClick()}
        >
          <Image
            src={buttonData?.image}
            width={width}
            className="mr-1"
            alt="No icon"
          />
          <a>{buttonData?.name}</a>
        </span>
      );
    case 4:
      return (
        <span
          className={`cursor-pointer ${className}`}
          onClick={() => onButtonClick()}
        >
          <FontAwesomeIcon icon={buttonData?.image} className="mr-2" />
          <a>{buttonData?.name}</a>
        </span>
      );
    default:
      return <div>Unknown type</div>;
  }
};

export default ButtonWithIcon;
