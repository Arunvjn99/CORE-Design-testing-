import styles from "./FormControlBasisPointBox.module.scss";
import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { Form } from "react-bootstrap";
import FormControl from "@/components/FormControl";

const FormControlBasisPointBox = ({ field, form, ...rest }) => {
  const [focusClass, setFocusClass] = useState("");
  const disabled = rest.disabled;
  const onDollarInputFocus = () => {
    setFocusClass("focus");
  };

  const onDollarInputBlur = (e) => {
    const { handleBlur } = rest;
    setFocusClass("");
    handleBlur(e);
  };

  return (
    <FormControl {...field} {...form} {...rest}>
      <InputGroup
        className={`${
          styles.formcontrolbasispointbox
        } ${`input-dollar-wrapper ${focusClass}`}`}
      >
        <Form.Control
          {...field}
          {...rest}
          onFocus={onDollarInputFocus}
          onBlur={onDollarInputBlur}
          className={`input-group-prepend`}
        />
        <div className="input-group-append">
          <span
            className={`input-group-text input-dollar-box1 ${
              disabled ? "disabled" : ""
            }`}
          >
            BP
          </span>
        </div>
      </InputGroup>
    </FormControl>
  );
};

export default FormControlBasisPointBox;
