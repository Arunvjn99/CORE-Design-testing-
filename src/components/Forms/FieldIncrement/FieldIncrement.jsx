import React from "react";

import FormControl from "@/components/FormControl";
import FormControlIncrement from "@/components/FormControlIncrement";

const FieldIncrement = ({ field, form, ...rest }) => {
  return (
    <FormControl {...field} {...form} {...rest}>
      <FormControlIncrement {...field} {...rest} />
    </FormControl>
  );
};

export default FieldIncrement;
