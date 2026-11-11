import React from "react";

import FormControl from "@/components/FormControl";
import Dropside from "@/components/Dropside";

const FieldDropSide = ({ field, form, ...rest }) => {
  return (
    <FormControl {...field} {...form} {...rest}>
      <Dropside {...field} {...rest} />
    </FormControl>
  );
};

export default FieldDropSide;
