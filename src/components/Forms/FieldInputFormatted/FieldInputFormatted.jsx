import styles from "./FieldInputFormatted.module.scss";
import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { Form } from "react-bootstrap";
import FormControl from "../../FormControl";

const numPadNumberKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105,
];

// rawInput: when true, treat input as free-form text (no caret manipulation)
const FieldInputFormatted = ({
  field,
  form,
  onChange,
  rawInput = false,
  value,
  ...rest
}) => {
  const [cursor, setCursor] = useState();
  const disabled = rest.disabled;

  // Use the explicitly passed value prop if available, otherwise use field.value
  const inputValue = value !== undefined ? value : field ? field.value : "";

  // Extract props we don't want to spread (to avoid overwriting our handlers)
  const {
    onChange: restOnChange,
    onKeyDown: restOnKeyDown,
    onKeyUp: restOnKeyUp,
    value: restValue,
    ...safeRest
  } = rest;

  const handleChange = (e) => {
    // Always call the passed onChange prop - it handles the field update
    if (typeof onChange === "function") {
      onChange(e);
    } else if (field && typeof field.onChange === "function") {
      field.onChange(e);
    } else if (
      form &&
      typeof form.setFieldValue === "function" &&
      field &&
      field.name
    ) {
      form.setFieldValue(field.name, e.target.value);
    }
  };

  const handleKeyDown = (e) => {
    // For rawInput, don't do any caret manipulation - let browser handle naturally
    if (rawInput) {
      return;
    }
    // Formatted input: track caret movement for numeric inputs
    if (e.keyCode == 37 || e.keyCode == 8)
      setCursor(e.target.selectionStart - 1);
    else if (numPadNumberKeyCodes.includes(e.keyCode) || e.keyCode == 39)
      setCursor(e.target.selectionStart + 2);
    else setCursor(e.target.selectionStart);
    onChange && onChange(e);
  };

  const handleKeyUp = (e) => {
    // For rawInput, don't manipulate caret - let browser handle naturally
    if (rawInput) {
      return;
    }
    try {
      e.target.setSelectionRange(cursor, cursor);
    } catch (err) {}
  };

  return (
    <FormControl {...field} {...form} value={inputValue} {...safeRest}>
      <InputGroup className={`input-password-wrapper ${styles["w-v5"]}`}>
        <Form.Control
          name={field ? field.name : undefined}
          type={safeRest.type || "text"}
          placeholder={safeRest.placeholder}
          maxLength={safeRest.maxLength}
          className={safeRest.className}
          autoComplete={safeRest.autoComplete || "off"}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          disabled={disabled}
        />
      </InputGroup>
    </FormControl>
  );
};

export default FieldInputFormatted;
