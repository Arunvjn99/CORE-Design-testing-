import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { getAutoCompleteAttr } from "@/utils/validationHelpers";

import FormControl from "@/components/FormControl";
const numPadNumberKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105,
];

const FieldInputNumberAsString = ({ field, form, onChange, ...rest }) => {
  const [cursor, setCursor] = useState();
  const autoCompleteAttr = getAutoCompleteAttr(field.name, rest.type);

  return (
    <FormControl {...field} {...form} {...rest}>
      <Form.Control
        onKeyDown={(e) => {
          console.log(e, e.keyCode);
          if (
            (e.keyCode == 37 || e.keyCode == 8) &&
            e.target.selectionStart !== 0
          )
            setCursor(e.target.selectionStart - 1);
          else if (
            (numPadNumberKeyCodes.includes(e.keyCode) || e.keyCode == 39) &&
            !e.shiftKey
          )
            setCursor(e.target.selectionStart + 2);
          // else e.preventDefault();
          else setCursor(e.target.selectionStart);
        }}
        onKeyUp={(e) => {
          if (e.keyCode == 8 || e.keyCode == 46)
            e.target.setSelectionRange(cursor, cursor);
        }}
        {...field}
        {...rest}
        {...autoCompleteAttr}
        onChange={onChange}
        className="global-placeholder-color"
      />
    </FormControl>
  );
};

export default FieldInputNumberAsString;
