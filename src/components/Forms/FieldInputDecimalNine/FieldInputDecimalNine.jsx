import React from "react";
import FormControlDecimal from "@/components/FormControlDecimal";

const FieldInputDecimalNine = ({
  field,
  form,
  onChange,
  size,
  preventNegative = true,
  maxLimit = true,
  ...rest
}) => {
  let prevValue = "";
  const { max = 999999999.999999999 } = rest;

  const countDecimals = (value) => {
    const s = value?.toString() ?? "";
    if (!s.includes(".")) return 0;
    return s.split(".")[1]?.length || 0;
  };

  return (
    <FormControlDecimal
      {...field}
      {...form}
      {...rest}
      precisionCount={9}
      autoComplete="off"
      type="text"
      step="any"
      onKeyDown={(evt) => {
        const allowedKeys = [
          "Backspace",
          "Delete",
          "ArrowLeft",
          "ArrowRight",
          "Tab",
        ];

        if (allowedKeys.includes(evt.key)) return;
        if (/^[0-9]$/.test(evt.key)) return;
        if (evt.key === "." && !evt.target.value.includes(".")) return;
        evt.preventDefault();
      }}
      onPaste={(evt) => {
        const paste = evt.clipboardData.getData("text");

        if (!/^\d*\.?\d*$/.test(paste)) {
          evt.preventDefault();
        }
      }}
      onChange={(evt) => {
        const value = evt.target.value;

        if (countDecimals(value) <= 9 && (!maxLimit || Number(value) <= max)) {
          prevValue = value;
        } else {
          evt.target.value = prevValue;
          return;
        }

        onChange(evt);
      }}
      size={size ?? "sm"}
    />
  );
};

export default FieldInputDecimalNine;
