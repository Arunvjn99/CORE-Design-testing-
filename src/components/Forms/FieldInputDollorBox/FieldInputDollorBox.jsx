import React, { useState, useRef } from "react";

import FormControlDollarBox from "@/components/FormControlDollorBox";
import { useDeepEffect } from "@/abstracts/hooks";

const FieldInputDollarBox = ({
  field,
  form,
  onChange,
  preventNegative,
  precision,
  value,
  isSmall = false,
  boxSize,
  ...rest
}) => {
  const prevValueRef = useRef("");
  const { max = 99999999999.99 } = rest;
  const countDecimals = function (value) {
    if (Math.floor(value) === value) return 0;
    return value?.toString()?.split(".")[1]?.length || 0;
  };
  const [val, setVal] = useState();
  useDeepEffect(() => {
    if (precision && countDecimals(value) > precision) {
      setVal(value?.toFixed(2));
    } else setVal(value);
  }, [value]);

  return (
    <FormControlDollarBox
      {...field}
      {...form}
      precision={precision}
      {...rest}
      isSmall={isSmall}
      boxSize={boxSize}
      autoComplete="off"
      type="number"
      step="any"
      onPaste={(evt) => {
        const pasted = evt.clipboardData.getData("text");
        const stripped = pasted.replace(/-/g, "");
        const num = parseFloat(stripped);

        if ((preventNegative && /-/.test(pasted)) || isNaN(num) || num > max) {
          evt.preventDefault();
        }
      }}
      onKeyDown={(evt) => {
        if (!preventNegative && (evt.key === "e" || evt.key === "E")) {
          evt.preventDefault();
        } else if (
          preventNegative &&
          (evt.key === "e" || evt.key === "E" || evt.key === "-")
        ) {
          evt.preventDefault();
        }
        prevValueRef.current = evt.target.value;
      }}
      onChange={(evt) => {
        if (
          (precision && countDecimals(evt.target.value) > precision) ||
          evt.target.value > max
        ) {
          evt.target.value = prevValueRef.current;
        } else if (
          (!precision && countDecimals(evt.target.value) > 2) ||
          evt.target.value > max
        ) {
          evt.target.value = prevValueRef.current;
        }
        onChange(evt);
      }}
      value={val}
    />
  );
};

export default FieldInputDollarBox;
