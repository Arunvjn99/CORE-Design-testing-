import { faChevronRight } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { arrowButtonStyle } from "./style";

export default function Arrow(props) {
  const { showPopup, onClick, disabled, direction } = props;

  const isOpenClass = !disabled && showPopup ? "is-open" : "";
  return (
    <span
      style={{ ...arrowButtonStyle }}
      onClick={onClick}
      disabled={disabled}
      className={`dropSide-custom-select-arrow ${direction} ${isOpenClass}`}
    >
      <span className="arrow-item">
        <FontAwesomeIcon size="xs" icon={faChevronRight} />
      </span>
    </span>
  );
}
