import React from "react";

import FormControl from "@/components/FormControl";
import FormMultiSelectButtonGroup from "@/components/FormMultiSelectButtonGroup";

const FieldMultiSelectButtonGroup = ({ field, form, ...rest }) => {
  return (
    <FormControl {...field} {...form} {...rest}>
      <FormMultiSelectButtonGroup {...field} {...rest} />
    </FormControl>
  );
};

export default FieldMultiSelectButtonGroup;
