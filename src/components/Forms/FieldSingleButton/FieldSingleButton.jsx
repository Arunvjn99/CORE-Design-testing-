import React from "react";

import FormControl from "@/components/FormControl";
import FormSingleButtonGroup from "@/components/FormSingleButtonGroup";

const FieldSingleButton = ({ field, form, ...rest }) => {
  return (
    <FormControl {...field} {...form} {...rest}>
      <FormSingleButtonGroup {...field} {...rest} />
    </FormControl>
  );
};

export default FieldSingleButton;
