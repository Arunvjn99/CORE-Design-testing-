import React from "react";
import { Button, Form } from "react-bootstrap";
import { getAutoCompleteAttr } from "@/utils/validationHelpers";

import FormControl from "@/components/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/pro-light-svg-icons";

const FieldInputAdd = ({ field, form, className = "", ...rest }) => {
  const clearText = () => {
    return () => {
      form.setFieldValue(field.name, "");
    };
  };
  const {
    preventSpecialCharacter = false,
    onlyNumbersAndHyphen = false,
    forMapper = false,
    isCensusPayrollError = false,
  } = rest;
  let format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  let numPadNumberKeyCodes = [
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
    104, 105,
  ];
  var invalidChars = ["-", "+", "e", "E"];
  const autoCompleteAttr = getAutoCompleteAttr(field.name, rest.type);
  return (
    <FormControl
      {...field}
      {...form}
      {...rest}
      isCensusPayrollError={isCensusPayrollError}
    >
      <div className="d-flex field-input-add">
        <Form.Control
          onKeyDown={(event) => {
            if (
              (preventSpecialCharacter && event.key.match(format)) ||
              (onlyNumbersAndHyphen &&
                numPadNumberKeyCodes.includes(event.keyCode)) ||
              (rest.type == "number" && invalidChars.includes(event.key))
            ) {
              event.preventDefault();
            }
          }}
          {...field}
          {...rest}
          {...autoCompleteAttr}
          className={forMapper ? "container-size" : className}
        />
        <Button
          className="field-input-add-button"
          variant="icon-transparent"
          type="submit"
        >
          <FontAwesomeIcon icon={faCheck} />
        </Button>
        <div className="input-add-separator"></div>
        <Button
          className="field-input-clear-button"
          variant="icon-transparent"
          onClick={clearText()}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </div>
    </FormControl>
  );
};

export default FieldInputAdd;
