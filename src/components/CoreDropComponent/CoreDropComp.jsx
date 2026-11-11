import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./CoreDropPopper.jsx";

import PropTypes from "prop-types";

/** * ==================================   Dont edit this file ====================================================== */
/**
 *
 *
 *  This is new component for popup ,it is warpper component for popup fields
 *
 *  It is the replaced component for dropside . One the most important customised component developed for CSPL, this component is used across many places and is wrapper for
 *  ***SearchableList***, ***EmployeeClassificationTypeDropdown***, ***DatePicker***, ***MultiselectDropdown***, etc.
 *
 *  Documentation is provided cleary .Don`t write scss styles for this components,it will affect the popup component in other places in this project
 *
 */

/**
 * CoreDrop component props.
 * @typedef {Object} CoreDropProps
 * @property {boolean} [hideOnElementHidden] - Determines whether to hide the popup when the element is hidden. Default is false.
 * @property {boolean} [changePositiononSpace] - Determines whether to change the position when there is no space in the viewport. Default is false.
 * @property {('top'|'bottom'|'left'|'right'|'right-end'|'right-start'|'bottom-end'|'bottom-start'|'left-end'|'left-start'|'top-end'|'top-start')} [placement] - Popup positioning.
 * @property {number} [offset] - Set offset, it is the gap between the popup and the Field element.
 * @property {boolean} [dropWidthSameAsFiled] - Determines whether the width of the dropdown is the same as the field element. Default is false.
 * @property {boolean} [hideRightAttachment] - Determines whether to hide the attachment on the right side. Default is false.
 * @property {boolean} [isDateRangePicker] - Determines whether it's a date range picker. Default is false.
 * @property {boolean} [open] - Determines whether the dropdown is open.
 * @property {boolean} [turnonShift] - Determines whether to move the popup when page is scrolling..
 * @property {function} [setOpen] - Function to set the state of the dropdown open.
 * @property {React.ReactNode} field - Field element (triggers the popup).
 * @property {React.ReactNode} [popup] - Popup content.
 * @property {React.ReactNode} rest - Additional props to be passed to the underlying component.
 */

export default function CoreDrop({
  field,
  popup,
  placement,
  offset,
  disabled,
  hideOnElementHidden,
  changePositiononSpace,
  open,
  setOpen,
  dropWidthSameAsFiled = false,
  hideRightAttachment = false,
  isDateRangePicker = false,
  isMultiSelect = false,
  isDatePicker = false,
  turnonShift,
  modalRef,
  clickedOutsideCloseDatepicker,
  cli,
  setcli,
  rightAttachmentTransalateY,
  ref,
  ...rest
}) {
  const dropdownRef = useRef(null);

  const handleClick = (event) => {
    const popupRect = dropdownRef.current.getBoundingClientRect();
    const { clientX, clientY } = event;

    if (
      clientX < popupRect.left ||
      clientX > popupRect.right ||
      clientY < popupRect.top ||
      clientY > popupRect.bottom
    ) {
      if (isDatePicker || isMultiSelect) {
        // clickedOutsideCloseDatepicker(event);
        // event.preventDefault();
        event.stopPropagation();
        if (!modalRef) {
          setOpen(false);
        }

        setcli?.({ event, clicked: !cli?.clicked });
        // setOpen(false);
        // if(modalRef) {
        //   modalRef.current = false;
        // }
      }
    }
  };

  // useDeepEffect(() => {
  //   if(modalRef)
  //   {
  //     setOpen(modalRef?.current)
  //   }
  // }, [modalRef?.current])
  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !isDatePicker &&
        !isMultiSelect &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  const [pos, setPos] = useState();
  const aRef = useRef(null);
  const [fieldHide, setfieldHide] = useState(null);
  return (
    <Popover
      hideOnElementHidden={hideOnElementHidden}
      offset={offset}
      placement={placement}
      open={open}
      onOpenChange={setOpen}
      changePositiononSpace={changePositiononSpace}
      dropWidthSameAsFiled={dropWidthSameAsFiled}
      hideRightAttachment={hideRightAttachment}
      aRef={aRef}
      setPos={setPos}
      ref={ref}
      turnonShift={turnonShift}
      {...rest}
    >
      <PopoverTrigger
        // onClick={() => setOpen((v) => !v)}
        // style={{ width: "fit-content" }}
        props={rest}
        disabled={disabled}
        asChild={true}
        setfieldHide={setfieldHide}
      >
        {field}
      </PopoverTrigger>
      <PopoverContent
        {...rest}
        placement={placement}
        className="Popover"
        hideOnElementHidden={hideOnElementHidden}
        dropWidthSameAsFiled={dropWidthSameAsFiled}
        hideRightAttachment={hideRightAttachment}
        isDateRangePicker={isDateRangePicker}
        pos={pos}
        aRef={aRef}
        nref={dropdownRef}
        rightAttachmentTransalateY={rightAttachmentTransalateY}
        fieldHide={fieldHide}
      >
        {popup}
      </PopoverContent>
    </Popover>
  );
}
CoreDrop.propTypes = {
  /** Determines whether to hide the popup when the element is hidden. */
  hideOnElementHidden: PropTypes.bool,

  /** Determines whether to change the position when there is no space in the viewport. */
  changePositiononSpace: PropTypes.bool,

  /** Popup positioning. */
  placement: PropTypes.oneOf([
    "top",
    "bottom",
    "left",
    "right",
    "right-end",
    "right-start",
    "bottom-end",
    "bottom-start",
    "left-end",
    "left-start",
    "top-end",
    "top-start",
  ]),

  /** Set offset, it is the gap between the popup and the Field element. */
  offset: PropTypes.number,

  /** Field Element (triggers popup). */
  field: PropTypes.element.isRequired,

  /** Determines whether the width of the dropdown is the same as the field element. */
  dropWidthSameAsFiled: PropTypes.bool,

  /** Determines whether to show the attachment on the right side. */
  needRightAttachment: PropTypes.bool,

  /** Determines whether it's a date range picker. */
  isDateRangePicker: PropTypes.bool,

  /** Determines whether the dropdown is open. */
  open: PropTypes.bool,

  /** Function to set the state of the dropdown open. */
  setOpen: PropTypes.func,

  /** Popup content. */
  popup: PropTypes.node,

  /** Determines whether to move the popup when page is scrolling. */
  turnonShift: PropTypes.bool,

  /** Additional props to be passed to the underlying component. */
  rest: PropTypes.object,
};

/**==================================   Dont edit this file ======================================================
 * MIT ©  | Release date: Feb-2024 | Authors: venkatesh mylaram , manish patil | version : 1.0.1 | core-vm-popper
 */
