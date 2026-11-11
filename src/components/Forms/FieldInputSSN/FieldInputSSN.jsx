import React from "react";

import FormMaskedControl from "@/components/FormMaskedControl";

const FieldInputSSN = ({ field, form, isBank, ...rest }) => {
  return <FormMaskedControl {...field} {...form} {...rest} isBank={isBank} />;
};

export default FieldInputSSN;
