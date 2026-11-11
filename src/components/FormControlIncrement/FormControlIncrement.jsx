import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { Form } from "react-bootstrap";
import FormControl from "@/components/FormControl";
import { faChevronUp, faChevronDown } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const FormControlIncrement = ({ field, form, value, onChange, ...rest }) => {
  const [focusClass, setFocusClass] = useState("");
  const [initialValue, setInitialValue] = useState(value);
  const disabled = rest.disabled;

  const Increment = () => {
    onChange(parseInt(value) + 1);
  };
  const decrement = () => {
    onChange(parseInt(value) - 1);
  };
  const onDollarInputFocus = () => {
    setFocusClass("focus");
  };

  //   const onDollarInputBlur = (e) => {
  //     const { handleBlur } = rest;
  //     if (e.target.value) e.target.value = parseFloat(e.target.value)?.toFixed(2);
  //     setFocusClass("");
  //     handleBlur(e);
  //   };

  return (
    <FormControl {...field} {...form} {...rest} size="xs">
      <InputGroup className={`input-dollar-wrapper ${focusClass}`}>
        <Form.Control
          {...field}
          {...rest}
          onFocus={onDollarInputFocus}
          className={`input-group-prepend`}
        />
        <div className="input-group-append">
          <div className="field-arrows">
            <FontAwesomeIcon icon={faChevronUp} onClick={Increment} />
            <FontAwesomeIcon icon={faChevronDown} onClick={decrement} />
          </div>
        </div>
      </InputGroup>
    </FormControl>
  );
};

export default FormControlIncrement;
