import styles from "./Dropside.module.scss";
import React, { useState, useRef, useEffect } from "react";
import { FormGroup } from "react-bootstrap";
import { find, findIndex, get, isEmpty, toLower } from "lodash-es";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendarAlt,
  faEllipsisV,
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import { useDeepEffect, useDidClickedOutside } from "@/abstracts/hooks";
import { dropSideContainerStyle, customSelectPopUpState } from "./style";
import Arrow from "./Arrow";
import HiddenSelect from "./HiddenSelect";
import { usDateFormat } from "@/utils/helpers";
import AddToolTip from "../AddToolTip/AddToolTip";
import { useLocation } from "react-router";
import CoreDrop from "../CoreDropComponent/CoreDropComp";
import { getTestId } from "@/SDUI/utils/testIds";

//todo: support merging classname and Style from props
const DropSideList = (props) => {
  const {
    text,
    options,
    modalRef,
    placeholder,
    popupContent,
    nonPayPeriod,
    value,
    disabled,
    dropdownClassName,
    isMultiSelect,
    isDatePicker,
    isDateRangePicker = false,
    // for further dropdowns use placement prop for the fields...
    direction = "right",
    name,
    label,
    communicationElementName,
    onClear,
    showClear = true,
    onDefaultClearDisplay = false,
    forMapper = false,
    forPayroll = false,
    leftOffset,
    showTooltip = true,
    isOtherKeyPress = true,
    widthselectedvalue = 100,
    // new drop down props
    hideOnElementHidden = true,
    changePositiononSpace = true,
    //direction prop is been replaced with placement prop, use placement for further development
    placement = null,
    turnonShift = true,
    rightAttachmentTransalateY = null,
    spaceBetweenFieldAndPopup = 0,
    hideRightAttachment = false,
    dropWidthSameAsFiled = true,
    widthStyle,
    isAdjustment = false,
    isPlanName = false,
    placeholderClassName,
    testId,
  } = props;
  const [showPopUp, setShowPopUp] = useState(modalRef?.current ?? false);
  const [dropdownValue, setDropdownValue] = useState(value);
  const [displayText, setDisplayText] = useState(placeholder || "Select One");
  const [displayImage, setDisplayImage] = useState();
  const dropUpRef = useRef();
  const domRef = useRef(null);
  const popupContentRef = useRef();
  const clickedOutside = useDidClickedOutside(domRef);
  const searchTextTimeout = null;
  const location = useLocation();

  // useDeepEffect(()=>{
  //   if(modalRef){
  //     modalRef.current = showPopUp
  //   }
  // },[showPopUp]);
  // useDeepEffect(()=>{
  //   console.log(showPopUp,modalRef?.current,"588")
  // },[showPopUp,modalRef?.current])
  const getDataByIndex = () => {
    return (
      findIndex(options, {
        value: dropdownValue,
      }) || 0
    );
  };

  const onArrowUp = () => {
    const tiggerOnSelect = get(popupContentRef, "current.tiggerOnSelect");
    const dataIndex = getDataByIndex();
    if (value && tiggerOnSelect && dataIndex > 0) {
      const data = options[dataIndex - 1];
      tiggerOnSelect(data.value, data.label, data.image);
    }
  };

  const onArrowDown = () => {
    const tiggerOnSelect = get(popupContentRef, "current.tiggerOnSelect");
    const dataIndex = getDataByIndex();
    if (tiggerOnSelect && dataIndex < (options || []).length - 1) {
      const data = options[dataIndex + 1];
      tiggerOnSelect(data.value, data.label, data.image);
    }
  };

  const onOtherKeyPress = (char) => {
    const dropdownWrapperDom = domRef.current;
    const currentValue = dropdownWrapperDom.getAttribute("data-attr-label");
    dropdownWrapperDom.setAttribute("data-attr-label", currentValue + char);
    const currentValue1 = dropdownWrapperDom.getAttribute("data-attr-label1");
    dropdownWrapperDom.setAttribute("data-attr-label1", currentValue1 + char);

    const searchableList = dropdownWrapperDom.querySelector(".searchable-list");
    const newValue = dropdownWrapperDom.getAttribute("data-attr-label");
    const newValue1 = dropdownWrapperDom.getAttribute("data-attr-label1");
    const searchedItem = searchableList.querySelector(
      `[data-attr-label^="${toLower(newValue)}"]`
    );
    const searchedItem1 = searchableList.querySelector(
      `[data-attr-label1^="${toLower(newValue1)}"]`
    );
    const searchableInput = dropdownWrapperDom.querySelector(
      ".searchable-list-input-text global-placeholder-color"
    );
    if (!searchableInput && searchedItem && searchedItem1) {
      searchedItem.focus();
      searchedItem1.focus();
    }
    const timeout = searchedItem ? 3000 : 0;
    window.clearTimeout(searchTextTimeout);
    window.setTimeout(() => {
      dropdownWrapperDom.setAttribute("data-attr-label", "");
      dropdownWrapperDom.setAttribute("data-attr-label1", "");
    }, timeout);
  };

  const onDropdownKeyUp = (e) => {
    if (!showPopUp && e.code === "ArrowUp") {
      onArrowUp();
    } else if (!showPopUp && e.code === "ArrowDown") {
      onArrowDown();
    } else if (showPopUp) {
      const keyChar = e.key || "";
      if (keyChar.match(/^[a-zA-Z0-9]{1}$/i) && isOtherKeyPress) {
        onOtherKeyPress(keyChar);
      }
    }
  };

  useEffect(() => {
    const dropdownWrapperDom = domRef.current;
    if (dropdownWrapperDom && !isMultiSelect && !isDatePicker) {
      dropdownWrapperDom.removeEventListener("keyup", onDropdownKeyUp);
      dropdownWrapperDom.addEventListener("keyup", onDropdownKeyUp);
      return () => {
        dropdownWrapperDom.removeEventListener("keyup", onDropdownKeyUp);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownValue, showPopUp]);

  // useEffect(() => {
  //   if (clickedOutside && showPopUp) {
  //     setShowPopUp(false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [clickedOutside]);

  useEffect(() => {
    if (!isMultiSelect) {
      setShowPopUp(false);
      if (modalRef) {
        modalRef.current = false;
      }
    }
    // else if (clickedOutside && showPopUp) {
    //   setShowPopUp(false);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const showDateRangeValue = () => {
    if (value?.fromDate && value?.toDate) {
      const tooltip = `${usDateFormat(value?.fromDate)} to ${usDateFormat(
        value?.toDate
      )}`;
      return (
        <div title={tooltip}>
          {usDateFormat(value?.fromDate)}{" "}
          <FontAwesomeIcon icon={faArrowRight} /> {usDateFormat(value?.toDate)}
        </div>
      );
    } else {
      return (
        <div className="place-holder" title="Select a date range">
          From date <FontAwesomeIcon icon={faArrowRight} /> To date
        </div>
      );
    }
  };

  useDeepEffect(() => {
    if (isEmpty(options)) {
      if (isDateRangePicker) {
        setDisplayText(showDateRangeValue());
      } else if (isDatePicker) {
        if (!value) {
          setDisplayText(placeholder || "MM/DD/YYYY");
        } else {
          setDisplayText(usDateFormat(value));
        }
      } else {
        setDisplayText(value);
      }
      setDropdownValue(value);
    } else {
      const filteredTextObj = find(options, { value });
      let displayText = get(filteredTextObj, "label", value || "");
      if (!displayText) {
        displayText = placeholder ? placeholder : "Select";
      }
      const displayImage = get(filteredTextObj, "image", "");
      setDisplayText(displayText ?? (placeholder || "Select"));
      setDisplayImage(displayImage);
      setDropdownValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, value]);

  function popUpCloseHandler(popUpState) {
    dropUpRef.current = popUpState;
  }

  function handlePopUpToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    if (isMultiSelect || !disabled) {
      setShowPopUp(!showPopUp);
      if (modalRef) {
        modalRef.current = !modalRef.current;
      }
    }
  }

  function clickedOutsideCloseDatepicker(e) {
    // e.stopPropagation();
    // e.preventDefault();
  }
  const [cli, setcli] = useState({
    event: {},
    clicked: true,
  });

  useEffect(() => {
    if (modalRef && cli.event) {
      // cli?.event?.event.stopPropagation();

      setShowPopUp(false);
      if (modalRef) {
        modalRef.current = false;
        setShowPopUp(!showPopUp);
      }
    }
  }, [cli]);

  let selectedValue = (
    <span className={placeholderClassName ? "" : "place-holder"}>
      {placeholder || <span>Select</span>}
    </span>
  );

  const isPlaceholder = !value && displayText === (placeholder || "MM/DD/YYYY");

  if (displayText) {
    selectedValue =
      displayText === placeholder && displayText !== dropdownValue ? (
        <span className="place-holder">{displayText}</span>
      ) : (
        displayText
      );
  }

  if (!displayText && isDatePicker) {
    selectedValue = <span className="place-holder">MM/DD/YYYY</span>;
  }
  if (!displayText && isDateRangePicker) {
    selectedValue = !isAdjustment ? (
      <span className="place-holder">
        From date <FontAwesomeIcon icon={faArrowRight} /> To date
      </span>
    ) : (
      <span className="place-holder">
        mm/dd/yyy <FontAwesomeIcon icon={faArrowRight} /> mm/dd/yyy
      </span>
    );
  }

  // const popUpUI = showPopUp ? (
  //   <Popup
  //     options={options}
  //     renderDown={dropUpRef.current}
  //     onClose={popUpCloseHandler}
  //     dropdownWrapperDom={get(domRef, "current", null)}
  //     setShowPopUp={setShowPopUp}
  //     direction={direction}
  //     showPopUp={showPopUp}
  //     offsetValue={offset}
  //     leftOffset={leftOffset}
  //   >
  //     {popupContent &&
  //       React.cloneElement(popupContent, {
  //         ref: popupContentRef,
  //         defaultLabel: label,
  //         name,
  //       })}
  //   </Popup>
  // ) : (
  //   <div style={{ display: "none" }}>
  //     {popupContent &&
  //       React.cloneElement(popupContent, {
  //         ref: popupContentRef,
  //         defaultLabel: label,
  //         name,
  //       })}
  //   </div>
  // );
  const customSelectStyle = showPopUp ? customSelectPopUpState : null;
  let className = disabled ? "disabled" : "";
  className = showPopUp ? `${className} open` : className;

  const onClearClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClear) {
      try {
        const clearResult = onClear();
        // If the handler explicitly returns false, do not clear internal state.
        if (clearResult === false) return;
      } catch (err) {
        // ignore handler errors and continue to clear
      }
    }
    setDropdownValue(null);
    setDisplayText("");
  };
  const getArrow = () => {
    if (isDatePicker || isDateRangePicker) {
      if (!disabled) {
        return (
          <div className="date-picker-wrapper">
            <div className="date-picker-icon">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
            {((value && showClear) || onDefaultClearDisplay) && (
              <div className="clear-date" onClick={onClearClick}>
                {text ? (
                  <FontAwesomeIcon
                    className="close-sty"
                    icon={faTimes}
                    size="sm"
                  />
                ) : (
                  <FontAwesomeIcon icon={faTimes} size="sm" />
                )}
                <p className="reset-button">{text}</p>
              </div>
            )}
          </div>
        );
      } else {
        return null;
      }
    }

    if (!isMultiSelect || (isMultiSelect && !disabled)) {
      return (
        <Arrow
          disabled={disabled}
          showPopup={showPopUp}
          direction={direction}
        />
      );
    }

    if (isMultiSelect && disabled) {
      return (
        <div
          className="disabled-multiselect-dots"
          // onMouseOver={handlePopUpToggle}
          // onMouseOut={handlePopUpToggle}
        >
          <FontAwesomeIcon
            icon={faEllipsisV}
            size="3x"
            className={`${styles["h-v2"]}`}
          />
        </div>
      );
    }
  };

  return (
    <FormGroup>
      <CoreDrop
        hideOnElementHidden={hideOnElementHidden}
        changePositiononSpace={changePositiononSpace}
        turnonShift={turnonShift}
        cli={cli}
        setcli={setcli}
        rightAttachmentTransalateY={rightAttachmentTransalateY}
        placement={
          placement != null
            ? placement
            : direction.includes("right")
            ? direction
            : direction + "-start"
        }
        offset={spaceBetweenFieldAndPopup}
        hideRightAttachment={hideRightAttachment}
        setOpen={setShowPopUp}
        modalRef={modalRef}
        dropWidthSameAsFiled={dropWidthSameAsFiled}
        disabled={disabled}
        open={modalRef?.current ?? showPopUp}
        isDateRangePicker={isDateRangePicker}
        isMultiSelect={isMultiSelect}
        isDatePicker={isDatePicker}
        clickedOutsideCloseDatepicker={clickedOutsideCloseDatepicker}
        ref={domRef}
        field={
          <button
            // as="button"
            className={`form-control ${
              communicationElementName === "Plan Group Name" ||
              communicationElementName === "Plan Name"
                ? "w-250px"
                : " "
            } dropSide ${className} ${dropdownClassName || ""}`}
            ref={domRef}
            style={{
              ...dropSideContainerStyle,
              ...widthStyle,
              backgroundColor: disabled
                ? "var(--semantics-disabled-background)"
                : "var(--neutral-surface-layer-01)",
            }}
            type="button"
            disabled={disabled}
            onClick={handlePopUpToggle}
            name={name}
            data-testid={getTestId(testId)}
          >
            <HiddenSelect options={options} value={value} />
            <div
              style={{
                ...customSelectStyle,
              }}
              className={`dropSide-custom-select ${
                forPayroll ? "fs-12px" : ""
              } ${isPlanName ? " plan-name-value-style " : ""} ${
                forMapper ? "label-style" : ""
              }`}
              //title={displayText}
            >
              {displayImage ? (
                <img src={displayImage} className={"flag-image"} alt="" />
              ) : (
                ""
              )}{" "}
              {showTooltip ? (
                <AddToolTip
                  name={typeof selectedValue === "string" ? selectedValue : ""}
                  // name={
                  //   displayText && displayText !== placeholder
                  //     ? displayText
                  //     : placeholder
                  // }
                  widthSelectedValue={widthselectedvalue}
                  className={placeholderClassName || ""}
                >
                  {selectedValue}
                </AddToolTip>
              ) : (
                <div
                  className={placeholderClassName ? placeholderClassName : ""}
                >
                  {selectedValue}
                </div>
              )}
            </div>
            {getArrow()}
          </button>
        }
        popup={
          <div
            className={`${
              styles["p-l-0px-m-r-28px-m-b-5px"]
            } ${`form-group dropSide-popup cd-popup-content-font ${
              nonPayPeriod && "mb-1 pl-0"
            }`}`}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {popupContent}
          </div>
        }
      />
    </FormGroup>
  );
};

export default DropSideList;
