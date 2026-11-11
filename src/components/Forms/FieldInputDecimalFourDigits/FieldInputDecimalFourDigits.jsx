import React from "react";

import FormControlDecimal from "@/components/FormControlDecimal";

const FieldInputDecimalFourDigits = ({
  field,
  form,
  onChange,
  size,
  preventNegative,
  maxLimit = true,
  ...rest
}) => {
  let prevValue;
  let precisionCount;
  const { max = 999.99 } = rest;
  const countDecimals = function (value) {
    if (Math.floor(value) === value) return 0;
    return value?.toString()?.split(".")[1]?.length || 0;
  };

  return (
    <FormControlDecimal
      {...field}
      {...form}
      {...rest}
      precisionCount={4}
      autoComplete="off"
      type="number"
      step="any"
      onKeyDown={(evt) => {
        if (!preventNegative && (evt.key === "e" || evt.key === "E")) {
          evt.preventDefault();
        } else if (
          preventNegative &&
          (evt.key === "e" || evt.key === "E" || evt.key === "-")
        ) {
          evt.preventDefault();
        }
        prevValue = evt.target.value;
      }}
      onChange={(evt) => {
        if (
          countDecimals(evt.target.value) > 4 ||
          (maxLimit && evt.target.value > max)
        ) {
          evt.target.value = prevValue;
        }
        onChange(evt);
      }}
      size={size ?? "sm"}
    />
  );
};

export default FieldInputDecimalFourDigits;
