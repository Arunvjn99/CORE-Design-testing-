import React, { useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import { get, toLower, trim, upperFirst } from "lodash-es";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/pro-solid-svg-icons";
import AddToolTip from "@/components/AddToolTip";
import { Loader } from "@/components/LoaderWrapper";
import { useComponentDidUpdate } from "@/abstracts/hooks";
import { warningCodes } from "../../utils/constants/warningCodes";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { inputFieldSize } from "@/utils/helpers";
import { faInfoCircle } from "@fortawesome/pro-solid-svg-icons";
import { getFieldConfig } from "@/utils/fieldConfigHelper.js";
import styles from "./FormControlModule.module.scss";
import {
  isTenantConfigReady,
  onTenantConfigReady,
} from "@/services/tenant/tenantConfigService";

const FormControl = ({
  label,
  name,
  children,
  isRequired,
  hasSuggestion,
  value,
  suggestionDefaultText,
  isSuggestionLoading,
  isValidSuggestion,
  suggestionErrorMessage,
  shouldDisplaySuggestion,
  size = "md",
  isSuggestionTextItalic,
  noLabelTransform,
  customErrorCode,
  customErrorMessage,
  astriex = false,
  showTickAlways = false,
  ignoreError = false,
  isCensusPayrollError = false,
  ishierarchy = false,
  showSuccess = false,
  suggestionTextClassName,
  textWrap = true,
  otherSizes = null,
  labelSize = "md",
  asterisk = false,
  info = false,
  infomessage = "",
  secondaryInfo = false,
  secondaryInfoMessage = "",
  secondaryLabel,
  isSearchable = false,
  showNoLabelSpacer = true,
  calculateAge = false,
  showCodeInMessage = false,
  formClassName,
  formGroupClassName = "",
  inputWrapperClassName = "",
  labelClassName = "",
  check,
  contribution,
  hide,
  errorId,
  setErrorId,
  ...rest
}) => {
  const screenKey = rest?.screenKey;
  const [tenantReady, setTenantReady] = useState(() => isTenantConfigReady());

  useEffect(() => {
    if (tenantReady) return;

    let cancelled = false;

    onTenantConfigReady(() => {
      if (!cancelled) {
        setTenantReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const fieldConfig = useMemo(() => {
    return getFieldConfig(screenKey, {
      label,
      required: isRequired,
      visibility: true,
    });
  }, [screenKey, name, label, isRequired, tenantReady]);
  if (fieldConfig?.visibility === false) return null;

  const [showTick, setShowTick] = useState(showTickAlways);
  const [showClass, setShowClass] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const { submitCount } = rest;
  useComponentDidUpdate(() => {
    if (!isSuggestionLoading) {
      setShowTick(true);
    }
  }, [isSuggestionLoading]);

  const fullText = () => {
    setShowClass(!showClass);
  };
  const required = fieldConfig.required ?? isRequired;
  let className = label && required ? "required" : "";
  let labelTextClass = inputFieldSize(labelSize);
  let labelClass = noLabelTransform ? `nolabelTransform` : ``;
  // let labelTextClass = labelClassSize;
  let textWrapClass = textWrap ? "" : "text-nowrap";
  const errors = get(rest, `errors`, {});
  const errorMessage = get(errors, name) || errors[name] || "";
  const isTouched = submitCount > 0 || get(rest, `touched.${name}`);

  const validationMessages = Array.isArray(errorMessage)
    ? errorMessage
    : errorMessage
    ? [errorMessage]
    : [];

  const getMessageText = (message) =>
    typeof message === "object" && message !== null
      ? message.messageDescCode ?? ""
      : message;

  const warningMessages = validationMessages.filter((message) => {
    return message?.errorType !== 1;
  });

  const errorMessages = validationMessages.filter(
    (message) => message?.errorType === 1
  );

  const visibleWarningMessages = expanded
    ? warningMessages
    : warningMessages.slice(0, 2);

  const visibleErrorMessages = expanded
    ? errorMessages
    : errorMessages.slice(0, 2);

  const warningCheck =
    isCensusPayrollError &&
    warningMessages.length > 0 &&
    errorMessages.length === 0;

  const isInvalid =
    validationMessages.length > 0 ||
    (showTick && hasSuggestion && !isValidSuggestion);
  className = isInvalid
    ? warningCheck
      ? `${className} invalid-warning`
      : ishierarchy
      ? `${className} hierarchyValidation`
      : `${className} invalid`
    : submitCount > 0 && showSuccess
    ? `${className} valid`
    : className;
  const suggestionTextClass = isSuggestionTextItalic ? "italic" : "";
  let childControls = children;

  if (hasSuggestion) {
    const suggestionCheckClass = isValidSuggestion ? "valid" : "invalid";
    childControls = (
      <div className="d-flex">
        {children}
        {isSuggestionLoading && (
          <span className="check-cirle">
            <Loader size="sm" loaderText="" />
          </span>
        )}
        {(shouldDisplaySuggestion ||
          (!isSuggestionLoading && !value && suggestionDefaultText)) && (
          <span
            className={`suggest-text ${suggestionTextClass}${suggestionTextClassName}`}
          >
            {suggestionDefaultText}
          </span>
        )}
        {!isSuggestionLoading && showTick && (
          <span className={`check-cirle ${suggestionCheckClass}`}>
            <FontAwesomeIcon
              icon={isValidSuggestion ? faCheckCircle : faTimesCircle}
              size="sm"
            />
          </span>
        )}
      </div>
    );
  }

  const transformedLabel = fieldConfig.label
    ? fieldConfig.label
    : noLabelTransform
    ? label
    : upperFirst(toLower(label));

  return (
    <Form.Group
      className={`${className} ${
        otherSizes == null ? size : otherSizes
      } form-group ${formGroupClassName}`}
      id={name}
    >
      {label !== undefined && label !== "" && label !== " " ? (
        <Form.Label
          className={`${labelClass} ${textWrapClass} form-control-label-class ${labelClassName} d-flex`}
        >
          {asterisk && (
            <div className={`${labelTextClass} label-asterisk`}>*</div>
          )}
          <div className={`${labelTextClass} text-nowrap`}>
            {transformedLabel}
          </div>

          {!required && trim(label) && (
            <div className="disabled-text-color">&nbsp;(Optional)</div>
          )}
          {info && (
            <div>
              {infomessage ? (
                <AddToolTip name={infomessage}>
                  <FontAwesomeIcon
                    className={`${labelTextClass} ml-1`}
                    icon={faInfoCircle}
                  />
                </AddToolTip>
              ) : (
                <FontAwesomeIcon
                  className={`${labelTextClass} ml-1`}
                  icon={faInfoCircle}
                />
              )}
            </div>
          )}
          {astriex && trim(label) && (
            <div className={`alert-text-critical`}>*</div>
          )}
        </Form.Label>
      ) : (
        (label == " " || label == "") && (
          <>
            {!isSearchable && showNoLabelSpacer && (
              <div className="form-no-label"></div>
            )}
          </>
        )
      )}
      <div className={inputWrapperClassName}>{childControls}</div>
      {secondaryInfo && (
        <Form.Label className="form-control-label-class d-flex mb-0 mt-2">
          <AddToolTip name={secondaryInfoMessage}>
            <FontAwesomeIcon
              className={`${labelTextClass} mr-1`}
              icon={faInfoCircle}
            />
          </AddToolTip>
          <div className={`${labelTextClass} text-nowrap`}>
            {secondaryLabel}
          </div>
        </Form.Label>
      )}
      {isInvalid && (
        <>
          {customErrorCode && (
            <Form.Control.Feedback className="invalid-feedback">
              {customErrorCode}
            </Form.Control.Feedback>
          )}
          <Form.Control.Feedback className="invalid-feedback">
            <div>{customErrorMessage || suggestionErrorMessage}</div>
          </Form.Control.Feedback>
          {errorMessage && !ignoreError && (
            <Form.Control.Feedback className="invalid-feedback">
              {isCensusPayrollError ? (
                <>
                  {/* ERROR CARD */}
                  {visibleErrorMessages.length > 0 && (
                    <div className="error-msg-payroll-edited">
                      <div
                        className={`grey-upload-text core-body-text-regular-semi-bold ${styles["warning-message-body"]}`}
                      >
                        <div className="warning-card-content">
                          {visibleErrorMessages.map((message, index) => (
                            <div
                              key={`error-${index}`}
                              className={styles["warning-item"]}
                            >
                              <div className={styles["warning-content"]}>
                                <div className="error-msg-text-edited core-heading-6-page-menu">
                                  <i
                                    aria-hidden="true"
                                    className="fa fa-exclamation-triangle mb-2 mr-2 fs-6"
                                  ></i>

                                  {showCodeInMessage && (
                                    <span className="warning-code-badge">
                                      Error Code :{" "}
                                      {message?.messageCode ||
                                        message?.slice?.(
                                          0,
                                          message?.indexOf?.(" -")
                                        )}
                                    </span>
                                  )}
                                </div>

                                <div className="grey-upload-text core-body-text-regular-semi-bold">
                                  {(
                                    message?.messageDescCode ||
                                    (message?.includes?.(" -")
                                      ? message.slice(message.indexOf(" -") + 2)
                                      : message)
                                  )
                                    ?.split(". ")
                                    .map((line, idx, arr) => (
                                      <React.Fragment key={idx}>
                                        {line}
                                        {idx < arr.length - 1 ? "." : ""}
                                        <br />
                                      </React.Fragment>
                                    ))}
                                </div>
                              </div>
                            </div>
                          ))}

                          {errorMessages.length > 2 && (
                            <div
                              className="blue-link ft-12 text-underline"
                              onClick={() => setExpanded(!expanded)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  setExpanded(!expanded);
                                }
                              }}
                            >
                              {expanded ? "View Less" : "View More"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* WARNING CARD */}
                  {visibleWarningMessages.length > 0 && (
                    <div className="warning-msg-payroll-edited">
                      <div
                        className={`grey-upload-text core-body-text-regular-semi-bold ${styles["warning-message-body"]}`}
                      >
                        <div className="warning-card-content">
                          {visibleWarningMessages.map((message, index) => (
                            <div
                              key={`warning-${index}`}
                              className={styles["warning-item"]}
                            >
                              <div className={styles["warning-content"]}>
                                <div className="warning-msg-text-edited core-heading-6-page-menu">
                                  <i
                                    aria-hidden="true"
                                    className={`fa fa-exclamation-triangle mb-2 pb-2 ${styles.warningIcon}`}
                                  ></i>

                                  {showCodeInMessage && (
                                    <span className="warning-code-badge">
                                      Warning Code :{" "}
                                      {message?.messageCode ||
                                        message?.slice?.(
                                          0,
                                          message?.indexOf?.(" -")
                                        )}
                                    </span>
                                  )}
                                </div>

                                <div
                                  className={`grey-upload-text core-body-text-regular-semi-bold ${styles["warning-message-code"]}`}
                                >
                                  {message?.messageDescCode
                                    ?.split(". ")
                                    .map((line, idx, arr) => (
                                      <React.Fragment key={idx}>
                                        {line}
                                        {idx < arr.length - 1 ? "." : ""}
                                        <br />
                                      </React.Fragment>
                                    ))}
                                </div>
                              </div>

                              {/* ACCEPT WARNING */}
                              <div
                                className={`blue-link ft-12 fw-bold text-underline ${styles["warning-space"]}`}
                                onClick={() => setErrorId(errorId)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    setErrorId(errorId);
                                  }
                                }}
                              >
                                Accept Warning
                              </div>
                            </div>
                          ))}

                          {warningMessages.length > 2 && (
                            <div
                              className="blue-link ft-12 text-underline"
                              onClick={() => setExpanded(!expanded)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  setExpanded(!expanded);
                                }
                              }}
                            >
                              {expanded ? "View Less" : "View More"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="d-flex input-critical-tag align-items-start">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="mr-1 input-critical-check-circle-flair icon-align-top"
                  />
                  <div className="input-critical-text-flair">
                    {Array.isArray(errorMessage)
                      ? errorMessage.map(getMessageText).join(", ")
                      : getMessageText(errorMessage)}
                  </div>
                </div>
              )}
            </Form.Control.Feedback>
          )}
        </>
      )}
      {showSuccess && errorMessage == "" && (
        <Form.Control.Feedback className="valid-feedback">
          <div className="d-flex input-success-tag mt-1">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="mr-1 input-success-check-circle-flair"
            />
            <div className="input-success-text-flair">Success</div>
          </div>
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default FormControl;
