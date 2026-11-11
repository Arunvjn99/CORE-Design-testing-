import React from "react";
import { Form } from "react-bootstrap";
import { getAutoCompleteAttr } from "@/utils/validationHelpers";

import FormControl from "@/components/FormControl";

const FieldNotSpecialChar = ({ field, form, onChange, ...rest }) => {
  const autoCompleteAttr = getAutoCompleteAttr(field.name, rest.type);

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData?.getData("text") || "";
    const sanitizedText = pastedText.replace(/[^a-zA-Z0-9 ]/g, "");
    const input = e.target;
    const cursorStart = input.selectionStart;
    const cursorEnd = input.selectionEnd;
    const currentValue = e.target.value || "";
    const newValue =
      currentValue.substring(0, cursorStart) +
      sanitizedText +
      currentValue.substring(cursorEnd);
    form.setFieldValue(field.name, newValue);
    setTimeout(() => {
      const position = cursorStart + sanitizedText.length;
      input.selectionStart = input.selectionEnd = position;
    }, 0);
  };
  return (
    <FormControl {...field} {...form} {...rest}>
      <Form.Control
        onKeyPress={(e) => {
          var regex = new RegExp("^[a-zA-Z0-9 ]+$");
          var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
          if (!regex.test(key)) {
            e.preventDefault();
            return false;
          }
        }}
        onPaste={handlePaste}
        {...field}
        {...rest}
        {...autoCompleteAttr}
      />
    </FormControl>
  );
};

export default FieldNotSpecialChar;
