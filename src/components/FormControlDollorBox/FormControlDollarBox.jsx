import styles from "./FormControlDollarBox.module.scss";
import React, { useState } from "react";
import { isEmpty } from "lodash-es";
// Ensure this matches the export type in FormControl
import FormControl from "../FormControl/FormControl";

const FormControlDollarBox = ({
  field,
  form,
  isSmall,
  boxSize,
  precision,
  ...rest
}) => {
  const [focusClass, setFocusClass] = useState("");
  const disabled = rest.disabled;
  const onDollarInputFocus = () => {
    setFocusClass("focus");
  };

  const onDollarInputBlur = (e) => {
    const { handleBlur } = rest;
    if (e.target.value)
      e.target.value = precision
        ? parseFloat(e.target.value)?.toFixed(precision)
        : parseFloat(e.target.value)?.toFixed(2);
    setFocusClass("");
    handleBlur(e);
  };

  return (
    <FormControl {...field} {...form} {...rest}>
      <div
        className={`input-dollar-wrapper ${focusClass}`}
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: isSmall ? "110px" : isEmpty(boxSize) ? "200px" : boxSize,
          flexWrap: "nowrap",
          border: `1px solid ${
            focusClass
              ? "var(--brand-border-primary-default)"
              : "var(--neutral-border-strong)"
          }`,
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <span className={`input-dollar-box ${disabled ? "disabled" : ""}`}>
          $
        </span>
        <input
          {...field}
          {...rest}
          onFocus={onDollarInputFocus}
          onBlur={onDollarInputBlur}
          className={`${styles["p-0p3750p75r"]}`}
        />
      </div>
    </FormControl>
  );
};

export default FormControlDollarBox;
