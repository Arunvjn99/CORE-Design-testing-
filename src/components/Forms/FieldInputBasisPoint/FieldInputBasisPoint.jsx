import React from "react";

import FormControlBasisPointBox from "@/components/FormControlBasisPointBox";

const FieldInputBasisPoint = ({ field, form, onChange, ...rest }) => {
  let prevValue;
  const { max, maxLength } = rest;
  const countDecimals = function (value) {
    if (Math.floor(value) === value) return 0;
    return value?.toString()?.split(".")[1]?.length || 0;
  };

  return (
    <FormControlBasisPointBox
      {...field}
      {...form}
      {...rest}
      autoComplete="off"
      type="number"
      step="1"
      onKeyDown={(evt) => {
        if (evt.key === "e" || evt.key === "E" || evt.key === "-")
          evt.preventDefault();
        prevValue = evt.target.value;
      }}
      onChange={(evt) => {
        const inputValue = evt.target.value;
        const maxLen = maxLength || 16;

        if (inputValue.length > maxLen) {
          evt.target.value = prevValue;
          form.setFieldError(
            field.name,
            `Basis Points value cannot exceed ${maxLen} characters including decimal points`
          );
          return;
        } else if (countDecimals(inputValue) > 2 || inputValue > max) {
          evt.target.value = prevValue;
          return;
        } else {
          form.setFieldError(field.name, undefined);
        }
        onChange(evt);
      }}
    />
  );
};

export default FieldInputBasisPoint;
