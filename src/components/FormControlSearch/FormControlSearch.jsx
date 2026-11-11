import React, { useState, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
import { faTimesCircle } from "@fortawesome/pro-solid-svg-icons";

const FormControlSearch = ({
  size = "md",
  id,
  setIsPopupOpen,
  className,
  placeholder,
  onChange,
  onKeyPress,
  screen,
  onClearText,
  screenName,
  clearSearchValue,
  showCancel = true,
  showIcon = true,
  value,
  asterisk = false,
  label = "\u200B",
  isReset = false,
  isManagePage = false,
  isSearch = false,
  isMultiSelect = false,
  setIsSelectAll,
  isMultiSelectDropDown = false,
  containerClassName = "",
  ...rest
}) => {
  const [showClear, setShowClear] = useState(showCancel);
  const inputElem = useRef(null);
  const onClear = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (screenName === "SearchableList" || screen === "MultiSelectDropDown") {
      let intervalId = setInterval(() => {
        clearInterval(intervalId);
        onChange({
          target: {
            value: "",
            name: rest?.name ?? "",
          },
        });
        inputElem.current.value = "";
        setShowClear(false);
      }, 1);
    } else {
      if (!onClearText) {
        inputElem.current.value = "";
        onChange({
          target: {
            value: "",
            name: rest?.name ?? "",
          },
        });
        setShowClear(false);
        if (screen === "mapper" && setIsPopupOpen) {
          setIsPopupOpen(false);
        }
      } else {
        onClearText();
        inputElem.current.value = "";
        onChange({
          target: {
            value: "",
          },
        });
        setShowClear(false);
      }
    }
    isMultiSelectDropDown && setIsSelectAll(false);
  };
  const onMouseMove = () => {
    if (inputElem.current.value) {
      setShowClear(true);
    }
  };
  const onMouseOutClear = () => {
    inputElem.current.value = "";
    onChange({
      target: {
        value: "",
      },
    });
  };
  const handleChange = (e) => {
    e.preventDefault();
    if (inputElem.current.value) {
      setShowClear(true);
    } else {
      isMultiSelectDropDown && setIsSelectAll(false);
      setShowClear(false);
    }
    onChange(e);
  };
  const keyDown = (e) => {
    if (e.keyCode == 32) {
      e.preventDefault();
      e.target.value += " ";
    }
  };

  if (clearSearchValue) {
    inputElem.current.value = "";
  }
  const Width = screen === "payroll-listing" ? "600px" : "";

  const closeButtonWrapperClass = inputElem?.current?.value ? "active" : "";

  useEffect(() => {
    if (isReset) onClear();
  }, [isReset]);

  return (
    // <div className={`w-fit-content ${isMultiSelect ? "" : ""}`}>
    <div className={`w-fit-content ${containerClassName}`.trim()}>
      {!isMultiSelect && (
        <div className={`core-body-text-regular-medium-sl mb-2`}>
          {asterisk && <span className={`label-asterisk`}>*</span>}
          <span>{label}</span>
        </div>
      )}
      <div className="form-control-search-text d-flex" style={{ width: Width }}>
        <Form.Control
          ref={inputElem}
          {...rest}
          value={value}
          size={size}
          id={id}
          className={`${className} ${
            !value
              ? "p_4_26_4_12"
              : showCancel && showIcon
              ? "p_4_50_4_12"
              : showCancel
              ? "p_4_34_4_12"
              : showIcon
              ? "p_4_34_4_12"
              : "p_4_12_4_12"
          } form-search-api-control global-placeholder-color ${
            screen === "competingfundslider1" || screen === "Addinvestmentlg"
              ? "lg"
              : size
          } fw-600`}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyPress={onKeyPress}
          // onKeyDown={keyDown}
          // onFocus={onMouseOut}
          type="input"
        />
        {showCancel && showClear && (value?.length > 0 || isManagePage) && (
          <>
            {showIcon && <div className="cross-vertical-line"></div>}
            <FontAwesomeIcon
              role="button"
              tabIndex={0}
              className={`${
                showIcon ? "form-search-clear-icon" : "form-nosearch-clear-icon"
              }`}
              onClick={onClear}
              onKeyPress={onClear}
              icon={faTimesCircle}
            />
          </>
        )}
        {showIcon && (
          <FontAwesomeIcon className="form-search-icon-flair" icon={faSearch} />
        )}
      </div>
    </div>
  );
};

export default FormControlSearch;
