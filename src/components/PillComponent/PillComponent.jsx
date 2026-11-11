import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PillComponent = (props) => {
  const {
    ifCountTobeDisplayed = false,
    count,
    label,
    iconRight = false,
    iconLeft = false,
    icon,
    className,
    handleClick,
    inputForClick,
    secondInput,
    isInput,
    inputFor,
    iconClick,
    isIconClick = false,
    iconClassName,
    handleWholePillClick = false,
    handleWholePillClickFunction,
  } = props;

  return (
    <label
      className={`pillFilterButton ${className}`}
      onClick={() => {
        if (handleWholePillClick) handleWholePillClickFunction();
        if (!isInput) {
          handleClick(inputForClick, secondInput);
        }
      }}
      for={inputFor}
    >
      {iconLeft && (
        <FontAwesomeIcon
          icon={icon}
          onClick={() => {
            if (isIconClick) {
              handleClick(inputForClick, secondInput);
            }
          }}
          className={`pillFilter-tagLeft ${iconClassName}`}
        />
      )}

      {ifCountTobeDisplayed ? (
        <div>{`${label} - ${count}`}</div>
      ) : (
        <div>{label}</div>
      )}
      {iconRight && (
        <div>
          <FontAwesomeIcon
            icon={icon}
            onClick={() => {
              if (isIconClick) {
                iconClick(inputForClick, secondInput);
              }
            }}
            className={`pillFilter-tagRight ${iconClassName}`}
          />
        </div>
      )}
    </label>
  );
};

export default PillComponent;
