import { toLower } from "lodash-es";
import React from "react";
import { Form } from "react-bootstrap";

import FormControl from "@/components/FormControl";
import { BLOCKED_KEYS_PATTERN } from "@/utils/nameValidation";

const FieldInput = ({
  field,
  fields,
  form,
  className = "",
  max,
  noLabelTransform,
  isRequired,
  layoutType,
  touched,
  ...rest
}) => {
  const {
    preventSpecialCharacter = false,
    onlyNumbersAndHyphen = false,
    onlyDigits = false,
    forMapper = false,
    isCensusPayrollError = false,
  } = rest;
  let format = BLOCKED_KEYS_PATTERN;
  let numPadNumberKeyCodes = [
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
    104, 105,
  ];
  var invalidChars = ["-", "+", "e", "E"];
  let autoCompleteAttr = {
    autoComplete: "off",
  };
  if (["name", "firstName", "lastName", "middleName"].includes(field.name)) {
    autoCompleteAttr = {
      autoComplete: "new-name",
    };
  }
  if (rest.type === "password") {
    autoCompleteAttr = {
      autoComplete: "new-password",
    };
  }
  if (field.name === "email") {
    autoCompleteAttr = {
      autoComplete: "new-email",
    };
  }

  if (
    toLower(field.name).indexOf("postal") !== -1 ||
    toLower(field.name).indexOf("zip") !== -1
  ) {
    autoCompleteAttr = {
      autoComplete: "new-zip",
    };
  }

  const getFormattedPhone = (value) => {
    let val = (value || "").replace(/\D/g, "");
    val = val.replace(/^(\d{3})(\d{1})/, "$1-$2");
    val = val.replace(/(\d)-(\d{3})(\d{1})/, "$1-$2-$3");
    val = val.replace(/(\d)-(\d)-(\d{4}).*/, "$1-$2-$3");
    return val;
  };

  const handlePaste = (e) => {
    if (field.name === "search" || rest.disabled) return;
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const sanitizedText = onlyDigits
      ? pastedText.replace(/\D/g, "")
      : pastedText;
    const input = e.target;
    const cursorStart = input.selectionStart;
    const cursorEnd = input.selectionEnd;
    const currentValue = field.value || "";
    const isPhoneNumber =
      field.name === "primaryContactNumber" ||
      field.name === "secondaryContactNumber"; // or other phone field names

    if (isPhoneNumber) {
      const digitsOnly = sanitizedText.replace(/\D/g, "").slice(0, 10);
      const formatted = getFormattedPhone(digitsOnly);

      form.setFieldValue(field.name, formatted);

      setTimeout(() => {
        const position = formatted.length;
        input.selectionStart = input.selectionEnd = position;
      }, 0);
    } else {
      const sanitizedText = preventSpecialCharacter
        ? pastedText.replace(/[!#$%_+=\[\]{};:"\\|,<>?`~]/g, "")
        : pastedText;

      const newValue =
        currentValue.substring(0, cursorStart) +
        sanitizedText +
        currentValue.substring(cursorEnd);

      const finalValue =
        max || rest?.maxLength
          ? newValue.substring(0, max || rest?.maxLength)
          : newValue;

      form.setFieldValue(field.name, finalValue);

      // Move the cursor to the end of pasted text
      setTimeout(() => {
        input.selectionStart = input.selectionEnd =
          cursorStart + sanitizedText.length;
      }, 0);
    }
  };
  return (
    <FormControl
      {...field}
      {...form}
      {...rest}
      isCensusPayrollError={isCensusPayrollError}
      noLabelTransform={noLabelTransform}
      isRequired={isRequired}
      layoutType={layoutType}
      touched={touched}
    >
      <Form.Control
        onKeyDown={(event) => {
          if (
            (preventSpecialCharacter && event.key.match(format)) ||
            (onlyNumbersAndHyphen &&
              numPadNumberKeyCodes.includes(event.keyCode)) ||
            (rest.type === "number" && invalidChars.includes(event.key)) ||
            (onlyDigits && event.key.length === 1 && !/^[0-9]$/.test(event.key))
          ) {
            event.preventDefault();
          }
        }}
        onPaste={handlePaste}
        {...field}
        {...rest}
        {...autoCompleteAttr}
        className={
          forMapper
            ? "container-size global-placeholder-color"
            : `${className} global-placeholder-color`
        }
      />
    </FormControl>
  );
};

export default FieldInput;
