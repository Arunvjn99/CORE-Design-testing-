import styles from "./FormControlPercentage.module.scss";
import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { Form } from "react-bootstrap";
import FormControl from "@/components/FormControl";
import { otherInputFieldSize } from "@/utils/helpers";

const FormControlPercentage = ({ field, form, showDecimal, size, ...rest }) => {
  const [focusClass, setFocusClass] = useState("");
  const disabled = rest.disabled;
  const classNamePer = rest.fieldColor;
  const otherSizes = otherInputFieldSize(size);

  const onDollarInputFocus = () => {
    setFocusClass("focus");
  };

  const onDollarInputBlur = (e) => {
    const { handleBlur } = rest;
    if (showDecimal && e.target.value) {
      e.target.value = parseFloat(e.target.value)?.toFixed(2);
    }
    setFocusClass("");
    handleBlur(e);
  };

  return (
    <FormControl {...field} {...form} otherSizes={otherSizes} {...rest}>
      <InputGroup
        className={`flex-nowrap ${`input-dollar-wrapper ${focusClass} ${classNamePer}`}`}
      >
        <Form.Control
          {...field}
          {...rest}
          onFocus={onDollarInputFocus}
          onBlur={onDollarInputBlur}
          className={`${styles.formcontrolpercentage}`}
        />
        <InputGroup.Text
          className={`input-dollar ${disabled ? "disabled" : ""}`}
        >
          %
        </InputGroup.Text>
      </InputGroup>
    </FormControl>
  );
};

export default FormControlPercentage;
