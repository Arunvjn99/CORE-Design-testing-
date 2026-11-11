import React from "react";
import FormControlDecimal from "@/components/FormControlDecimal";

const FieldInputDecimal = (props) => {
  const { field, form, onChange, onKeyDown = () => {}, ...rest } = props;
  let prevValue;
  const { max = 999.99 } = rest;

  const countDecimals = (value) => {
    if (Math.floor(value) === value) return 0;
    return value?.toString()?.split(".")[1]?.length || 0;
  };

  return (
    <FormControlDecimal
      {...field}
      {...form}
      {...rest}
      precisionCount={2}
      autoComplete="off"
      type="text"
      step="any"
      onKeyDown={(e) => {
        onKeyDown(e);
        const { key, target } = e;
        const value = target.value;

        const allowedKeys = [
          "Backspace",
          "Delete",
          "ArrowLeft",
          "ArrowRight",
          "Tab",
          ".",
          "-",
          "Home",
          "End",
        ];
        if (!/[0-9]/.test(key) && !allowedKeys.includes(key)) {
          e.preventDefault();
        }

        if (key === "e" || key === "E" || key === "+") {
          e.preventDefault();
        }
        if (key === "-") {
          if (value.includes("-") || target.selectionStart !== 0) {
            e.preventDefault();
          }
        }

        if (key === "." && value.includes(".")) {
          e.preventDefault();
        }

        prevValue = value;
      }}
      onChange={(e) => {
        const newValue = e.target.value;

        const hyphenCount = (newValue.match(/-/g) || []).length;
        if (
          /[^0-9.-]/.test(newValue) ||
          countDecimals(newValue) > 2 ||
          parseFloat(newValue) > max ||
          hyphenCount > 1 ||
          (hyphenCount === 1 && !newValue.startsWith("-"))
        ) {
          e.target.value = prevValue;
        }

        onChange(e);
      }}
    />
  );
};

export default FieldInputDecimal;
