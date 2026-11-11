import styles from "./FormControlPercentageBox.module.scss";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import FormControl from "@/components/FormControl";

const FormControlPercentageBox = ({
  field,
  form,
  showDecimal = false,
  ...rest
}) => {
  const [focusClass, setFocusClass] = useState("");
  const disabled = rest.disabled;
  const onDollarInputFocus = () => {
    setFocusClass("focus");
  };

  const onDollarInputBlur = (e) => {
    const { handleBlur } = rest;
    if (showDecimal && e.target.value)
      e.target.value = parseFloat(e.target.value)?.toFixed(2);
    setFocusClass("");
    handleBlur(e);
  };

  return (
    <FormControl {...field} {...form} {...rest}>
      <div
        className={`${
          styles["flex-items-center-v3"]
        } ${`input-dollar-wrapper ${focusClass}`}`}
      >
        <Form.Control
          {...field}
          {...rest}
          onFocus={onDollarInputFocus}
          onBlur={onDollarInputBlur}
          className={`input-group-prepend`}
        />
        <div
          className={`${styles["p-0p5750p75r"]} ${`input-dollar-box ${
            disabled ? "disabled" : ""
          }`}`}
        >
          %
        </div>
      </div>
    </FormControl>
  );
};

export default FormControlPercentageBox;
