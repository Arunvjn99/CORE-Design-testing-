import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const FormMultiSelectButtonGroup = ({
  options = [],
  selectedValue = [],
  onChange,
  disabled,
  disabledValuesForFee = false,
  disabledIndex = null,
}) => {
  const handleToggle = (value) => {
    const newSelected = (selectedValue || [])?.includes(value)
      ? (selectedValue || [])?.filter((v) => v !== value)
      : [...(selectedValue || []), value];

    onChange(newSelected);
  };

  return (
    <ButtonGroup className="multi-select-button">
      {options?.map(({ label, value }, index) => (
        <Button
          key={index}
          variant={selectedValue?.includes(value) ? "primary" : "secondary"}
          active={selectedValue?.includes(value)}
          onClick={() => handleToggle(value)}
          disabled={
            (disabledIndex != null &&
              disabledIndex === index &&
              disabledValuesForFee) ||
            disabled
          }
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};
export default FormMultiSelectButtonGroup;
