import React from "react";

import FormControlDollar from "@/components/FormControlDollar";

const FieldInputDollar = ({
  field,
  form,
  onChange,
  preventNegative = true,
  precision,
  isPriceListing,
  alignRight = false,
  isError = false,
  ...rest
}) => {
  let prevValue;
  const { max = 99999999999.99, min = -99999999999.99 } = rest;
  const countDecimals = function (value) {
    if (Math.floor(value) === value) return 0;
    return value?.toString()?.split(".")[1]?.length || 0;
  };
  return (
    <FormControlDollar
      {...field}
      {...form}
      precision={precision}
      {...rest}
      autoComplete="off"
      type="text"
      step="any"
      isPriceListing={isPriceListing}
      isError={isError}
      alignRight={alignRight}
      onKeyDown={(event) => {
        const key = event.key;
        const value = event.target.value;
        const cursor = event.target.selectionStart;

        // Allow shortcuts like Ctrl+C, Ctrl+V, Ctrl+A etc.
        if (event.ctrlKey || event.metaKey) return;

        // Allow digits
        if (/^[0-9]$/.test(key)) {
          prevValue = event.target.value;
          return;
        }

        // Allow one decimal point (.)
        if (key === ".") {
          if (value.includes(".")) {
            event.preventDefault(); // block second decimal
          }
          prevValue = event.target.value;
          return;
        }

        // Hyphen condition (only at first position)
        if (!preventNegative && key === "-") {
          if (cursor !== 0 || value.includes("-")) {
            event.preventDefault(); // block duplicate or wrong position
          } else {
            prevValue = event.target.value;
          }
          return;
        }

        // Allow control/navigation keys
        const allowedKeys = [
          "Backspace",
          "Delete",
          "ArrowLeft",
          "ArrowRight",
          "Home",
          "End",
          "Tab",
          "Escape",
          "Enter",
        ];
        if (allowedKeys.includes(key)) return;

        // Block all other keys
        event.preventDefault();
        // const key = evt.key;

        // //Allow numbers only
        // if (/^[0-9]$/.test(key)) {
        //   prevValue = evt.target.value;
        //   return true;
        // }

        // //Allow -(negative) only at the beginning
        // if (preventNegative === false) {
        //   if (evt.key === "-" && !evt.target.value.includes("-") && evt.target.selectionStart === 0) {
        //     prevValue = evt.target.value;
        //     return true;
        //   }
        // }

        // // Allow: Backspace, Delete, Tab, Escape, Enter, etc
        // const controlKeys = [
        //   "Backspace", "Delete", "ArrowLeft", "ArrowRight",
        //   "ArrowUp", "ArrowDown", "Tab", "Home", "End"
        // ];

        // if (controlKeys.includes(key)) return true;
        // evt.preventDefault();
        // if(evt.key === "-" && evt.target.value.includes("-")){
        //   evt.preventDefault();
        //   return;
        // }
        // if (
        //   !preventNegative &&
        //   (evt.key === "e" || evt.key === "E" || evt.key === "+")
        // ) {
        //   evt.preventDefault();
        // } else if (
        //   preventNegative &&
        //   (evt.key === "-" && evt.target.value.includes("-"))
        // ) {
        //   evt.preventDefault();
        // }
      }}
      onChange={(evt) => {
        console.log("evt.target.value", evt.target.value, prevValue);
        if (
          (precision && countDecimals(evt.target.value) > precision) ||
          evt.target.value > max ||
          evt.target.value < min
        ) {
          evt.target.value = prevValue;
        } else if (
          (!precision && countDecimals(evt.target.value) > 2) ||
          evt.target.value > max ||
          evt.target.value < min
        ) {
          evt.target.value = prevValue;
        }
        onChange(evt);
      }}
      onWheel={(evt) => evt.target.blur()}
    />
  );
};

export default FieldInputDollar;
