import styles from "./FormButtonGroup.module.scss";
import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { get, camelCase } from "lodash-es";
import { getTestId } from "@/SDUI/utils/testIds";

const FormButtonGroup = ({
  options = [],
  onChange,
  selectedValue,
  style,
  label,
  name,
  disabled,
  disabledValues = [],
  width = "",
  testId,
}) => {
  const className = disabled ? "disabled" : "";

  return (
    <div
      className={`form-button-group ${className}`}
      style={{ width: "max-content", ...style }}
    >
      <ButtonGroup aria-label={label} name={name}>
        {options?.map(({ label, value }, index) => {
          const optionName = `${camelCase(name) || "option"}${index + 1}`;
          let selectedClass =
            selectedValue === value ? "selected" : "notSelected";
          selectedClass =
            selectedClass + (options?.length > 0 ? " button-greater" : "");
          let buttonProps = {};
          if (!disabled) {
            buttonProps = { onClick: () => onChange(value) };
          }
          if (label === "BASIC") {
            return (
              <Button
                key={index}
                type="button"
                className={selectedClass}
                {...buttonProps}
                disabled={disabled}
                data-attr={value}
                data-testid={getTestId(
                  `${testId?.split("-")[0]}-button-${optionName}`
                )}
                style={{ height: get(style, "height", "") }}
              >
                <div className="display-flex">
                  <div className="marg-right-12">{label}</div>
                  <div className="tooltip-basic">
                    <i
                      className={`${styles["m-t-4px-text"]} fal fa-info-circle`}
                    />
                    <span className="tooltiptext">
                      Basic (100% on first 3% + 50% on the next 2%)
                    </span>
                  </div>
                </div>
              </Button>
            );
          } else if (label === "QACA") {
            return (
              <Button
                key={index}
                type="button"
                className={selectedClass}
                {...buttonProps}
                disabled={disabled}
                data-attr={value}
                data-testid={getTestId(
                  `${testId?.split("-")[0]}-button-${optionName}`
                )}
                style={{ height: get(style, "height", "") }}
              >
                <div className="display-flex">
                  <div className="marg-right-12">{label}</div>
                  <div className="tooltip-qaca">
                    <i
                      className={`${styles["m-t-4px-text"]} fal fa-info-circle`}
                    />
                    <span className="tooltiptext">
                      QACA (100% on first 1% + 50% on the next 5%)
                    </span>
                  </div>
                </div>
              </Button>
            );
          } else {
            return (
              <Button
                key={index}
                type="button"
                className={selectedClass}
                {...buttonProps}
                disabled={
                  disabled ||
                  disabledValues.some((_) => _ === value) ||
                  disabledValues.some((_) => _ === label)
                }
                data-attr={value}
                data-testid={getTestId(
                  `${testId?.split("-")[0]}-button-${optionName}`
                )}
                style={{ height: get(style, "height", ""), width: width }}
              >
                {label}
              </Button>
            );
          }
        })}
      </ButtonGroup>
    </div>
  );
};

export default FormButtonGroup;
