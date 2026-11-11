import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import FormControl from "@/components/FormControl";
import styles from "./FiledInputNumber.module.scss";

const FieldInputNumber = ({ field, form, onChange, ...rest }) => {
  const { max } = rest;
  const { min = 0 } = rest;
  const { isAllowNegative } = rest;
  const { ishierarchy = false, hide, errorId, setErrorId } = rest;

  return (
    <FormControl
      {...field}
      {...form}
      {...rest}
      autoComplete="off"
      type="number"
      step="1"
      ishierarchy={ishierarchy}
    >
      <InputGroup className={`${styles.formcontroldecimal} w-fit-content`}>
        <Form.Control
          {...field}
          {...rest}
          type="number"
          step="1"
          onKeyDown={(evt) => {
            if (
              !isAllowNegative &&
              (evt.key === "e" ||
                evt.key === "E" ||
                evt.key === "." ||
                evt.key === "-")
            ) {
              evt.preventDefault();
            } else if (
              isAllowNegative &&
              (evt.key === "e" || evt.key === "E")
            ) {
              evt.preventDefault();
            }
            if (
              max &&
              ((document.getSelection().type === "Caret" &&
                (parseInt(
                  evt.target.value.toString() + evt.key.toString(),
                  10
                ) > max ||
                  parseInt(
                    evt.target.value.toString() + evt.key.toString(),
                    10
                  ) < min)) ||
                (document.getSelection().type === "Range" &&
                  (parseInt(evt.key.toString(), 10) > max ||
                    parseInt(evt.key.toString(), 10)) < min))
            ) {
              evt.preventDefault();
            }
          }}
          onChange={(evt) => {
            if (evt.target.value == "" && !isAllowNegative) {
              evt.target.value = null;
            }
            onChange(evt);
          }}
          className={`${styles["formcontroldecimal-v2"]} ${
            rest?.className ?? ""
          }`}
        />
      </InputGroup>
    </FormControl>
  );
};

export default FieldInputNumber;
