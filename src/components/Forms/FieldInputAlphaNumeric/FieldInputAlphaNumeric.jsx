import React from "react";
import { Form } from "react-bootstrap";

import FormControl from "@/components/FormControl";
import { VALID_NAME_PATTERN } from "@/utils/nameValidation";

const FieldInputAlphaNumeric = ({ field, form, onChange, ...rest }) => {
  return (
    <FormControl {...field} {...form} {...rest}>
      <Form.Control
        onKeyPress={(e) => {
          var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
          if (!VALID_NAME_PATTERN.test(key)) {
            e.preventDefault();
            return false;
          }
        }}
        {...field}
        {...form}
        {...rest}
      />
    </FormControl>
  );
};

export default FieldInputAlphaNumeric;
