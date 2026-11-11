import React from "react";
import { Form } from "react-bootstrap";

import FormControl from "@/components/FormControl";

const FieldInputAlphabet = ({ field, form, onChange, ...rest }) => {
  return (
    <FormControl {...field} {...form} {...rest}>
      <Form.Control
        onKeyPress={(e) => {
          var regex = new RegExp("^[a-zA-Z ]*$");
          var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
          if (!regex.test(key)) {
            e.preventDefault();
            return false;
          }
          if (rest.max && rest.max > 0) {
            if (e.target.value.length >= rest.max) {
              e.preventDefault();
              return false;
            }
          }
        }}
        {...field}
        {...form}
        {...rest}
      />
    </FormControl>
  );
};

export default FieldInputAlphabet;
