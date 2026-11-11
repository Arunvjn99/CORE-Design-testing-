import React from "react";
import { Form } from "react-bootstrap";
import FormControl from "@/components/FormControl";

const FieldTextarea = ({ field, rows = 3, onChange, form, ...rest }) => {
  const { max, min = 0 } = rest;

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text").trim();
    const currentValue = field.value || "";

    if (max) {
      const remainingLength = max - currentValue.length;
      if (remainingLength > 0) {
        const newText = currentValue + pastedText.substring(0, remainingLength);
        form.setFieldValue(field.name, newText);
      }
    } else {
      const newText = currentValue + pastedText;
      form.setFieldValue(field.name, newText);
    }
  };

  return (
    <FormControl {...field} {...form} {...rest}>
      <Form.Control
        as="textarea"
        rows={rows}
        {...field}
        {...rest}
        autoComplete="off"
        onKeyDown={(evt) => {
          if (max && evt.target.value.length >= max) {
            if (evt.keyCode != 8) {
              evt.preventDefault();
            }
          }
        }}
        onChange={(evt) => {
          if (evt.target.value == "") {
            evt.target.value = null;
          }
          onChange(evt);
        }}
        onPaste={handlePaste}
        className="global-placeholder-color"
      />
    </FormControl>
  );
};

export default FieldTextarea;
