import styles from "./FormMaskedControl.module.scss";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import FormControl from "@/components/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/pro-light-svg-icons";
import { hyphenatedSSN } from "@/utils/helpers";
import { maskedBankAccountNumberNormalizer } from "@/utils/normaliser";

const numPadNumberKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105,
];

const FormMaskedControl = ({
  field,
  form,
  isBank,
  initialpasswordShown = false,
  ...rest
}) => {
  const [passwordShown, setPasswordShown] = useState(initialpasswordShown);
  const [focusClass, setFocusClass] = useState("");
  const disabled = rest.disabled;

  const onDollarInputFocus = (e) => {
    setFocusClass("focus");
    if (!e.target.value) {
      setPasswordShown(true);
    }
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const onDollarInputBlur = (e) => {
    const { handleBlur } = rest;
    setFocusClass("");
    handleBlur(e);
  };

  const bankNormalizer = (value) => {
    return value?.length == 0 ? null : maskedBankAccountNumberNormalizer(value);
  };

  const maskingClass = !passwordShown ? "mask" : "";
  return (
    <FormControl {...field} {...form} {...rest}>
      <div
        className={`d-flex align-items-center ${`input-password-wrapper ${focusClass} ${maskingClass}`}`}
      >
        <Form.Control
          {...field}
          {...rest}
          onFocus={onDollarInputFocus}
          onBlur={onDollarInputBlur}
          autoComplete="new-password"
          className={`${styles.formmaskedcontrol} global-placeholder-color`}
          onKeyDown={(e) => {
            const input = e.target;
            const cursorPos = input.selectionStart;
            const cursorEnd = input.selectionEnd;
            const value = input.value;

            // Handle backspace and delete for SSN formatting
            if (e.key === "Backspace" || e.key === "Delete") {
              const isBackspace = e.key === "Backspace";

              // If we have a selection, let default behavior handle it
              if (cursorPos !== cursorEnd) {
                return;
              }

              // Handle backspace when cursor is right after a dash
              if (
                isBackspace &&
                cursorPos > 0 &&
                value[cursorPos - 1] === "-"
              ) {
                e.preventDefault();

                // Move cursor before the dash and delete the digit before it
                if (cursorPos > 1) {
                  const beforeDash = value.substring(0, cursorPos - 2);
                  const afterCursor = value.substring(cursorPos);
                  const newValue = beforeDash + afterCursor;

                  // Update the value
                  if (rest.onChange) {
                    const syntheticEvent = {
                      target: { ...input, value: newValue },
                      currentTarget: input,
                    };
                    rest.onChange(syntheticEvent);
                  }

                  // Position cursor correctly
                  requestAnimationFrame(() => {
                    const newCursorPos = cursorPos - 2;
                    input.setSelectionRange(newCursorPos, newCursorPos);
                  });
                }
                return;
              }

              // Handle delete when cursor is right before a dash
              if (
                !isBackspace &&
                cursorPos < value.length &&
                value[cursorPos] === "-"
              ) {
                e.preventDefault();

                // Skip the dash and delete the digit after it
                if (cursorPos + 1 < value.length) {
                  const beforeCursor = value.substring(0, cursorPos);
                  const afterDash = value.substring(cursorPos + 2);
                  const newValue = beforeCursor + "-" + afterDash;

                  // Update the value
                  if (rest.onChange) {
                    const syntheticEvent = {
                      target: { ...input, value: newValue },
                      currentTarget: input,
                    };
                    rest.onChange(syntheticEvent);
                  }

                  // Keep cursor at same position
                  requestAnimationFrame(() => {
                    input.setSelectionRange(cursorPos, cursorPos);
                  });
                }
                return;
              }
            }
          }}
          onInput={(e) => {
            const input = e.target;
            const currentValue = input.value;
            const cursorPos = input.selectionStart;

            // Store the number of digits before cursor for repositioning
            const digitsBefore = (
              currentValue.substring(0, cursorPos).match(/\d/g) || []
            ).length;

            // Let the onChange handle the formatting
            if (rest.onChange) {
              rest.onChange(e);
            }

            // Restore cursor position after React updates the value
            requestAnimationFrame(() => {
              if (input && input.value) {
                const formattedValue = input.value;
                let newCursorPos;

                // Calculate cursor position based on number of digits
                if (digitsBefore <= 3) {
                  newCursorPos = digitsBefore;
                } else if (digitsBefore <= 5) {
                  newCursorPos = digitsBefore + 1; // Account for first dash
                } else {
                  newCursorPos = digitsBefore + 2; // Account for both dashes
                }

                // Ensure cursor doesn't exceed input length
                newCursorPos = Math.min(newCursorPos, formattedValue.length);
                newCursorPos = Math.max(0, newCursorPos);

                input.setSelectionRange(newCursorPos, newCursorPos);
              }
            });
          }}
          onChange={(e) => {
            // This will be called by onInput, so we just need basic handling
            if (rest.onChange) {
              rest.onChange(e);
            }
          }}
          disabled={disabled}
          readOnly={!passwordShown}
        />
        <div
          onClick={togglePasswordVisiblity}
          className={
            rest.errors?.uniquePersonalIdentification
              ? `${styles["w-50px-h-38px-p-l-12px"]} input-password critical-border-color`
              : `${styles["w-50px-h-38px-p-l-12px"]} input-password`
          }
        >
          <FontAwesomeIcon
            icon={passwordShown ? faEye : faEyeSlash}
            size="lg"
            className="pl-2 pt-1"
          />
        </div>
        {!passwordShown && (
          <div className="ssn-masker">
            {isBank ? bankNormalizer(rest.value) : hyphenatedSSN(rest.value)}
          </div>
        )}
      </div>
    </FormControl>
  );
};

export default FormMaskedControl;
