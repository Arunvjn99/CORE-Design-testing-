import styles from "./FormControlPassword.module.scss";
import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { Form } from "react-bootstrap";
import FormControl from "@/components/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/pro-light-svg-icons";

const FormControlPassword = ({ field, form, ...rest }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [focusClass, setFocusClass] = useState("");
  const disabled = rest.disabled;
  const onDollarInputFocus = () => {
    setFocusClass("focus");
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const onDollarInputBlur = (e) => {
    const { handleBlur } = rest;
    setFocusClass("");
    handleBlur(e);
  };

  return (
    <FormControl {...field} {...form} {...rest}>
      <InputGroup className={`input-password-wrapper ${focusClass}`}>
        <Form.Control
          {...field}
          {...rest}
          type={passwordShown ? "text" : "password"}
          onFocus={onDollarInputFocus}
          onBlur={onDollarInputBlur}
          autoComplete="new-password"
          className={`${styles.formcontrolpassword}`}
        />
        <InputGroup.Text
          className={`input-password ${disabled ? "disabled" : ""}`}
        >
          {passwordShown === true ? (
            <span className={`mr-15px`}>
              <FontAwesomeIcon onClick={togglePasswordVisiblity} icon={faEye} />
            </span>
          ) : (
            <span className={`${styles["m-r-13px"]}`}>
              <FontAwesomeIcon
                onClick={togglePasswordVisiblity}
                icon={faEyeSlash}
              />
            </span>
          )}
        </InputGroup.Text>
      </InputGroup>
    </FormControl>
  );
};

export default FormControlPassword;
