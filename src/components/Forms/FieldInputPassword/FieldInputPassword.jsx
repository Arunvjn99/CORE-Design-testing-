import React from "react";

import FormControlPassword from "@/components/FormControlPassword";

const FieldInputPassword = ({ field, form, ...rest }) => {
  return <FormControlPassword {...field} {...form} {...rest} />;
};

export default FieldInputPassword;
