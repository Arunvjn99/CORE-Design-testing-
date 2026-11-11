import React from "react";

import FormControlPercentage from "@/components/FormControlPercentage";

const FieldInputPercentage = ({ field, form, onChange, ...rest }) => {
  let prevValue;
  let prevKeyValue;
  const { min = 0, max = 100, isAllowNegative } = rest;
  const countDecimals = function (value) {
    if (Math.floor(value) === value) return 0;
    return value?.toString()?.split(".")[1]?.length || 0;
  };

  return (
    <FormControlPercentage
      {...field}
      {...form}
      {...rest}
      autoComplete="off"
      type="number"
      step="0.01"
      onKeyDown={(evt) => {
        if (
          !isAllowNegative &&
          (evt.key === "e" || evt.key === "E" || evt.key === "-")
        )
          evt.preventDefault();
        if (isAllowNegative && (evt.key === "e" || evt.key === "E"))
          evt.preventDefault();
        if (evt.key === "-") {
          if (prevKeyValue === "-") {
            evt.preventDefault();
          }
          prevKeyValue = evt.key;
        }
        if (evt.key === "+") {
          evt.preventDefault();
        }
        if (evt.key == "Backspace") {
          prevKeyValue = null;
        }
        prevValue = evt.target.value;
      }}
      onChange={(evt) => {
        if (
          countDecimals(evt.target.value) > 2 ||
          evt.target.value > max ||
          evt.target.value < min
        ) {
          evt.target.value = prevValue;
        }
        onChange(evt);
      }}
    />
  );
};

export default FieldInputPercentage;
