import React from "react";

import FormControl from "@/components/FormControl";
import FormButtonGroup from "@/components/FormButtonGroup";

const FieldButtonGroup = ({ field, form, ...rest }) => {
  return (
    <FormControl {...field} {...form} {...rest}>
      <FormButtonGroup {...field} {...rest} />
    </FormControl>
  );
};

export default FieldButtonGroup;
