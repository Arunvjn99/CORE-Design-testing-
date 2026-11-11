import React from "react";

import FormControlMonthBox from "../../FormControlMonthBox";

const FieldInputMonthBox = ({
  field,
  form,
  onChange,
  preventNegative,
  precision,
  ...rest
}) => {
  let prevValue;
  const { max = 99999999999.99 } = rest;
  const countDecimals = function (value) {
    if (Math.floor(value) === value) return 0;
    return value?.toString()?.split(".")[1]?.length || 0;
  };

  return (
    <FormControlMonthBox
      {...field}
      {...form}
      precision={precision}
      {...rest}
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
          (precision && countDecimals(evt.target.value) > precision) ||
          evt.target.value > max
        ) {
          evt.target.value = prevValue;
        } else if (
          (!precision && countDecimals(evt.target.value) > 2) ||
          evt.target.value > max
        ) {
          evt.target.value = prevValue;
        }
        onChange(evt);
      }}
    />
  );
};

export default FieldInputMonthBox;
