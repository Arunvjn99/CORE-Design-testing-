import React from "react";
import { Form } from "react-bootstrap";

import FormControl from "@/components/FormControl";
import { ALPHA_NUMERIC_PATTERN } from "@/utils/nameValidation";

const FieldInputStrictAlphaNumeric = ({ field, form, onChange, ...rest }) => {
  return (
    <FormControl {...field} {...form} {...rest}>
      <Form.Control
        onKeyPress={(e) => {
          var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
          if (!ALPHA_NUMERIC_PATTERN.test(key)) {
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

export default FieldInputStrictAlphaNumeric;
