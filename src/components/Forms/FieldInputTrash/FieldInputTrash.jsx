import styles from "./FieldInputTrash.module.scss";
import { faTrashAlt } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import FormControl from "@/components/FormControl";
import { getAutoCompleteAttr } from "@/utils/validationHelpers";

const FieldInputTrash = ({ field, form, ...rest }) => {
  const {
    preventSpecialCharacter = false,
    onlyNumbersAndHyphen = false,
    forMapper = false,
    disabled,
    isAdded,
    onDeleteClick,
    maxLength = 16,
  } = rest;
  const [focusClass, setFocusClass] = useState("");
  let format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  let numPadNumberKeyCodes = [
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
    104, 105,
  ];

  const isNumeric = (value) => !isNaN(value) && value.trim() !== "";
  const autoCompleteAttr = getAutoCompleteAttr(field.name, rest.type);
  const onDollarInputFocus = () => {
    setFocusClass("focus");
  };

  const onDollarInputBlur = (e) => {
    // const { handleBlur } = rest;
    setFocusClass("");
    // handleBlur(e);
  };

  const currentValue = field.value || "";
  const isCurrentValueNumeric = isNumeric(currentValue);

  return (
    <FormControl {...field} {...form} {...rest}>
      {!isAdded ? (
        <>
          <Form.Control
            onKeyDown={(event) => {
              if (
                (preventSpecialCharacter && event.key.match(format)) ||
                (onlyNumbersAndHyphen &&
                  numPadNumberKeyCodes.includes(event.keyCode))
              ) {
                event.preventDefault();
              }
            }}
            {...field}
            {...rest}
            {...autoCompleteAttr}
            className={forMapper ? "container-size" : ""}
            maxLength={isCurrentValueNumeric ? maxLength : undefined}
          />
        </>
      ) : (
        <InputGroup
          className={`${
            styles.fieldinputtrash
          } ${`input-dollar-wrapper ${focusClass}`}`}
        >
          <Form.Control
            onKeyDown={(event) => {
              if (
                (preventSpecialCharacter && event.key.match(format)) ||
                (onlyNumbersAndHyphen &&
                  numPadNumberKeyCodes.includes(event.keyCode))
              ) {
                event.preventDefault();
              }
            }}
            {...field}
            {...rest}
            {...autoCompleteAttr}
            onFocus={onDollarInputFocus}
            onBlur={onDollarInputBlur}
            className={forMapper ? "container-size-new" : ""}
          />
          <div className="input-group-append">
            <span
              className={`input-dollar ${disabled ? "disabled" : ""} ${
                forMapper ? "trash-container-size" : ""
              }`}
            >
              {isAdded && (
                <FontAwesomeIcon
                  color="var(--semantics-critical-text)"
                  className="fs-16px mr-1 cursor-pointer"
                  icon={faTrashAlt}
                  onClick={() => onDeleteClick()}
                />
              )}
            </span>
          </div>
        </InputGroup>
      )}
    </FormControl>
  );
};

export default FieldInputTrash;
