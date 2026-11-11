import styles from "./FormControlDecimal.module.scss";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import FormControl from "../FormControl"; // Ensure the correct path and default import
import InputGroup from "react-bootstrap/InputGroup";

const FormControlDecimal = ({ field, size, form, precisionCount, ...rest }) => {
  const [focusClass, setFocusClass] = useState("");
  const disabled = rest.disabled;
  const onDollarInputFocus = () => {
    setFocusClass("focus");
  };

  const onDollarInputBlur = (e) => {
    const { handleBlur } = rest;
    if (e.target.value)
      e.target.value = parseFloat(e.target.value)?.toFixed(precisionCount);
    setFocusClass("");
    handleBlur(e);
  };
  const { hide, errorId, setErrorId } = rest;
  return (
    <FormControl {...field} {...form} {...rest} size={size}>
      <InputGroup className={`flex-nowrap`}>
        <Form.Control
          {...field}
          {...rest}
          onFocus={onDollarInputFocus}
          onBlur={onDollarInputBlur}
          className={`${styles["formcontroldecimal-v2"]} ${
            rest?.className ?? ""
          }`}
        />
      </InputGroup>
    </FormControl>
  );
};

export default FormControlDecimal;
