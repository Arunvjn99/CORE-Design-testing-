import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { Form } from "react-bootstrap";
import FormControl from "@/components/FormControl";
import { otherInputFieldSize } from "@/utils/helpers";

const FormControlDollar = ({
  field,
  form,
  precision,
  size,
  isWarning = false,
  isPriceListing = false,
  alignRight,
  isError,
  ...rest
}) => {
  const [focusClass, setFocusClass] = useState("");
  const disabled = rest.disabled;
  const otherSizes = otherInputFieldSize(size);

  const onDollarInputFocus = () => {
    setFocusClass("focus-within");
  };

  const onDollarInputBlur = (e) => {
    const { handleBlur } = rest;

    if (e.target.value) {
      e.target.value = precision
        ? parseFloat(e.target.value)?.toFixed(precision)
        : parseFloat(e.target.value)?.toFixed(2);
    }

    setFocusClass("");
    handleBlur(e);
  };

  const stateClass = isError
    ? "input-dollar-error"
    : isWarning
    ? "input-dollar-warning"
    : "input-dollar";

  return (
    <FormControl {...field} {...form} {...rest} otherSizes={otherSizes}>
      <InputGroup
        className={`input-dollar-wrapper ${focusClass} ${
          alignRight ? "d-flex justify-content-end" : ""
        }`}
      >
        <InputGroup.Text
          className={`${stateClass} ${disabled ? "disabled" : ""} ${
            isPriceListing ? "border-none" : ""
          }`}
        >
          $
        </InputGroup.Text>

        <Form.Control
          {...field}
          {...rest}
          className={isPriceListing ? "priceListing" : stateClass}
          style={{
            borderRadius: "0px 5px 5px 0px",
            flexGrow: 0,
            borderLeft: "0px",
          }}
          onFocus={onDollarInputFocus}
          onBlur={onDollarInputBlur}
        />
      </InputGroup>
    </FormControl>
  );
};

export default FormControlDollar;
