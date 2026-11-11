import styles from "./FormControlYearBox.module.scss";
import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { Form } from "react-bootstrap";
import FormControl from "@/components/FormControl";

const FormControlYearBox = ({ field, form, precision, ...rest }) => {
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
    <FormControl {...field} {...form} {...rest} size="sm">
      <InputGroup
        className={`${styles.formcontrolyearbox} ${`input-dollar-wrapper`}`}
      >
        <Form.Control
          {...field}
          {...rest}
          onFocus={onDollarInputFocus}
          onBlur={onDollarInputBlur}
          className={`input-segmented-start`}
        />
        <InputGroup.Text
          className={`input-segmented-end ${`input-dollar-box ${
            disabled ? "disabled" : ""
          }`}`}
        >
          Years
        </InputGroup.Text>
      </InputGroup>
    </FormControl>
  );
};

export default FormControlYearBox;
